import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  ChangeCommand,
  ChangeFileCommand,
  EndCommand,
  RecordedCodeCommands,
} from '../../../interfaces/Records/recorded-code-commands.interface';
import { MonacoService } from '../Monaco/monaco.service';
import { TempStoreService } from './temp-store.service';
import { GithubService } from '../GitHub/github.service';
import { RecordConfigService } from './record-config.service';
import { FileContentService } from '../file-content.service';
import { ChangeEvent } from '../../../enums/change-event';

@Injectable({
  providedIn: 'root',
})
export class PlaybackService {
  currentOpenedFile$ = new BehaviorSubject<string | undefined>('');
  playAgain$ = new BehaviorSubject<boolean>(false);
  isPlaying$ = new BehaviorSubject<boolean | null>(null);

  private commandsJsn?: RecordedCodeCommands;
  private isPlaybackEnded = false;
  private realTime = 0;
  private isPaused = true;

  private lastProducedCommand: (EndCommand | ChangeFileCommand | ChangeCommand) | null = null;
  private prevCommandPath = '';
  private prevCommandTime = 0;

  constructor(
    private monacoService: MonacoService,
    private tempStoreService: TempStoreService,
    private gitHubService: GithubService,
    private recordConfigService: RecordConfigService,
    private fileContentService: FileContentService,
  ) {
  }

  setCommands(commands: RecordedCodeCommands, relativePath: string) {
    this.commandsJsn = commands;
    this.prevCommandPath = relativePath;
    this.setCurrentOpenedFile(relativePath);
  }

  setCurrentOpenedFile(path: string) {
    this.currentOpenedFile$.next(path);
  }

  playPlayback() {
    this.isPaused = false;
    if (this.isPlaybackEnded) {
      this.isPlaybackEnded = false;
      this.playAgain$.next(true);
    }
    this.playCommands();
  }

  pausePlayback() {
    this.isPaused = true;
  }

  stopPlayback() {
    this.prevCommandTime = 0;
    this.prevCommandPath = '';
    this.lastProducedCommand = null;
    this.isPlaybackEnded = true;
    this.realTime = 0;
  }

  updateRealTime(real: number) {
    this.realTime = real;
    this.playCommands();
  }

  private async playCommands() {
    const commands: (EndCommand | ChangeFileCommand | ChangeCommand)[] | undefined = this.commandsJsn?.commands.filter((cmd) => cmd.changeTime
      && cmd.changeTime <= this.realTime
      && cmd.changeTime > this.prevCommandTime);

    if (commands && commands.length > 0) {
      for (const command of commands) {
        await this.playForward(command, false);
      }
    }
  }

  async rewindForward(endTimeSec: number) {
    this.isPlaying$.next(false);
    const endMilisec = this.secToMilisec(endTimeSec);
    const lastCmd = this.lastProducedCommand;

    const gapLastAndEndCommand = this.commandsJsn?.commands.filter((cmd) => {
      if (lastCmd) {
        return cmd.changeTime
          && cmd.changeTime <= endMilisec
          && cmd.changeTime > lastCmd.changeTime;
      }
      return cmd.changeTime
        && cmd.changeTime <= endMilisec;
    });

    if (gapLastAndEndCommand) {
      for (const command of gapLastAndEndCommand) {
        await this.playForward(command, true);
      }
      setTimeout(() => {
        this.isPlaying$.next(true);
      }, 500);
    }
  }

  async rewindBackward(currentTimeSec: number, rewindEndTimeSec: number) {
    this.isPlaying$.next(false);
    const rewindEndMilisec = this.secToMilisec(rewindEndTimeSec);
    const lastCmd = this.lastProducedCommand;

    const gapLastAndEndCommand = this.commandsJsn?.commands.filter((cmd) => {
      if (lastCmd) {
        return cmd.changeTime
          && cmd.changeTime >= rewindEndMilisec
          && cmd.changeTime <= lastCmd.changeTime;
      }
      return cmd.changeTime && cmd.changeTime <= currentTimeSec;
    });

    if (gapLastAndEndCommand) {
      const startIndex = this.commandsJsn?.commands.indexOf(gapLastAndEndCommand[0]);
      const endIndex = this.commandsJsn?.commands.indexOf(gapLastAndEndCommand[gapLastAndEndCommand.length - 1]);

      if (startIndex !== undefined && endIndex !== undefined) {
        if (startIndex - 1 < 0) {
          const backwardCommandRange = this.commandsJsn?.commands.slice(startIndex, endIndex + 1);
          await this.playBackward(backwardCommandRange, true);
        } else {
          const backwardCommandRange = this.commandsJsn?.commands.slice(startIndex - 1, endIndex + 1);
          await this.playBackward(backwardCommandRange);
        }
      }
    }
    setTimeout(() => {
      this.isPlaying$.next(true);
    }, 500);
  }

  private async playBackward(commands: (EndCommand | ChangeCommand | ChangeFileCommand)[] | undefined, isNotPrevCommand = false) {
    if (!commands) return;

    const reversedCommands = commands.reverse();

    for (const [index, command] of reversedCommands.entries()) {
      if (index === reversedCommands.length - 1 && !isNotPrevCommand) {
        if (this.lastProducedCommand?.event === ChangeEvent.changeFile && 'path' in command) {
          const contentFromTemp = this.tempStoreService.getContentFromTemp(command.path);
          await this.monacoService.setWholeTextInMonaco(contentFromTemp.text || '');
        }
        this.prevCommandTime = command.changeTime;
        this.lastProducedCommand = command;
        if ('path' in command) {
          this.prevCommandPath = command.path;
        }
        break;
      }

      this.prevCommandTime = command.changeTime;
      switch (command.event) {
        case ChangeEvent.end:
          this.stopPlayback();
          return;
        case ChangeEvent.changeFile: {
          if ('path' in command && 'event' in command && 'changeTime' in command) {
            this.currentOpenedFile$.next(command.path);

            if (this.lastProducedCommand === command || this.lastProducedCommand?.event !== ChangeEvent.changeFile) {
              const wholeTextOfOpenedFileMonaco = await this.monacoService.getWholeTextFromMonaco();
              await this.tempStoreService.setTempWholeText(command.path, wholeTextOfOpenedFileMonaco || '');
            } else if (this.lastProducedCommand !== command && this.lastProducedCommand?.event === ChangeEvent.changeFile) {
              const contentFromTemp = this.tempStoreService.getContentFromTemp(command.path);
              await this.monacoService.setWholeTextInMonaco(contentFromTemp.text || '');
              const wholeTextOfOpenedFileMonaco = await this.monacoService.getWholeTextFromMonaco();
              await this.tempStoreService.setTempWholeText(command.path, wholeTextOfOpenedFileMonaco || '');
            }

            if (index === reversedCommands.length - 1 && isNotPrevCommand) {
              this.prevCommandTime = 0;
              this.prevCommandPath = '';
              this.lastProducedCommand = null;
            }

            this.lastProducedCommand = command;
            this.prevCommandPath = command.path;
          }
          break;
        }
        case ChangeEvent.insert: {
          if ('position' in command) {
            if (this.lastProducedCommand?.event === ChangeEvent.changeFile && this.prevCommandPath !== command.path) {
              this.currentOpenedFile$.next(command.path);
              const contentFromTemp = this.tempStoreService.getContentFromTemp(command.path);
              await this.monacoService.setWholeTextInMonaco(contentFromTemp.text || '');
            }

            this.lastProducedCommand = command;
            this.prevCommandPath = command.path;

            if (index === reversedCommands.length - 1 && isNotPrevCommand) {
              this.prevCommandTime = 0;
              this.prevCommandPath = '';
              this.lastProducedCommand = null;
            }

            if (command.text === '\r\n') {
              const newCommand = {
                ...command,
                text: '',
                position: {
                  lineStart: command.position.lineStart,
                  charStart: command.position.charStart,
                  lineEnd: command.position.lineEnd + 1,
                  charEnd: 1,
                },
              };
              await this.monacoService.setPlaybackValueInMonaco(newCommand, true);
              break;
            }

            if (command.text.includes('\r\n')) {
              const splitText = command.text.split('\r\n');
              const newCommand = {
                ...command,
                text: '',
                position: {
                  lineStart: command.position.lineStart,
                  charStart: command.position.charStart,
                  lineEnd: command.position.lineEnd + splitText.length - 1,
                  charEnd: splitText[splitText.length - 1].length + 1,
                },
              };
              await this.monacoService.setPlaybackValueInMonaco(newCommand, true);
              break;
            }

            if (command.text !== '') {
              const newCommand = {
                ...command,
                text: '',
                position: {
                  lineStart: command.position.lineStart,
                  charStart: command.position.charStart,
                  lineEnd: command.position.lineEnd,
                  charEnd: command.position.charEnd + command.text.length,
                },
              };
              await this.monacoService.setPlaybackValueInMonaco(newCommand, true);
              break;
            }
          }
          break;
        }
        case ChangeEvent.remove:
          if ('path' in command && 'position' in command) {
            if (this.lastProducedCommand?.event === ChangeEvent.changeFile && this.prevCommandPath !== command.path) {
              this.currentOpenedFile$.next(command.path);
              const contentFromTemp = this.tempStoreService.getContentFromTemp(command.path);
              await this.monacoService.setWholeTextInMonaco(contentFromTemp.text || '');
            }

            this.prevCommandPath = command.path;
            this.lastProducedCommand = command;

            if (index === reversedCommands.length - 1 && isNotPrevCommand) {
              this.prevCommandTime = 0;
              this.prevCommandPath = '';
              this.lastProducedCommand = null;
            }

            const newCommand = {
              ...command,
              text: command.text,
              position: {
                lineStart: command.position.lineStart,
                charStart: command.position.charStart,
                lineEnd: command.position.lineStart,
                charEnd: command.position.charStart,
              },
            };
            await this.monacoService.setPlaybackValueInMonaco(newCommand, false);
          }
          break;
        default:
          break;
      }
    }
  }

  private async playForward(command: EndCommand | ChangeCommand | ChangeFileCommand, isRewind?: boolean) {
    switch (command.event) {
      case ChangeEvent.end:
        this.stopPlayback();
        return;
      case ChangeEvent.changeFile: {
        if ('path' in command && 'event' in command && 'changeTime' in command) {
          // This can happen after rewinding
          if (this.lastProducedCommand === command) {
            const wholeTextOfOpenedFileMonaco = await this.monacoService.getWholeTextFromMonaco();
            await this.tempStoreService.setTempWholeText(command.path, wholeTextOfOpenedFileMonaco || '');
            this.lastProducedCommand = command;
            this.prevCommandTime = command.changeTime;
            break;
          }

          this.currentOpenedFile$.next(command.path);
          const wholeTextOfOpenedFileMonaco = await this.monacoService.getWholeTextFromMonaco();
          if (this.lastProducedCommand && 'path' in this.lastProducedCommand) {
            await this.tempStoreService.setTempWholeText(this.lastProducedCommand.path, wholeTextOfOpenedFileMonaco || '');
          }

          const contentFromTemp = this.tempStoreService.getContentFromTemp(command.path);
          if (contentFromTemp.hasTempContent) {
            await this.monacoService.setWholeTextInMonaco(contentFromTemp.text || '');
          } else {
            const pathForGit = contentFromTemp.path.split('\\').slice(1).join('\\');

            if (isRewind) {
              const remote = await this.gitHubService.getTextForRewind(
                pathForGit,
                this.recordConfigService.config.commitHash,
                this.recordConfigService.config.ownerName,
                this.recordConfigService.config.repoName,
              );
              const textOfFile = this.fileContentService.decodeContent(remote?.content, remote?.encoding);
              await this.tempStoreService.setTempWholeText(remote?.path.split('/').join('\\'), textOfFile, true);
              await this.monacoService.setWholeTextInMonaco(textOfFile);
            } else {
              this.gitHubService.sendRequestToGetRemoteFileText(
                pathForGit,
                this.recordConfigService.config.commitHash,
                this.recordConfigService.config.ownerName,
                this.recordConfigService.config.repoName,
              );
            }
          }
        }
        this.lastProducedCommand = command;
        this.prevCommandTime = command.changeTime;
        break;
      }
      case ChangeEvent.insert:
        if ('position' in command) {
          await this.monacoService.setPlaybackValueInMonaco(command);
          this.prevCommandPath = command.path;
          this.lastProducedCommand = command;
          this.prevCommandTime = command.changeTime;
        }
        break;
      case ChangeEvent.remove:
        if ('position' in command) {
          await this.monacoService.setPlaybackValueInMonaco(command, true);
          this.prevCommandPath = command.path;
          this.lastProducedCommand = command;
          this.prevCommandTime = command.changeTime;
        }
        break;
      default:
        break;
    }
  }

  private secToMilisec(sec: number) {
    return sec * 1000;
  }
}
