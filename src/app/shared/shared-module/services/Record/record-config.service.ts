import { Injectable } from '@angular/core';
import { commandsFile, configFile } from '../../../temp-constants';
import { RecordedCodeCommands } from '../../../interfaces/Records/recorded-code-commands.interface';

// TODO: extract in separate interface
interface TimeMark {
  title: string,
  timePoint: {
    hours: number,
    minutes: number,
    seconds: number,
    milliseconds: number,
  },
}

interface RecordConfig {
  duration: number,
  repoName: string,
  ownerName: string,
  fileName: string,
  commitHash: string,
  relativePath: string,
  commands: RecordedCodeCommands,
  rootFolder: string,
  timeMarks: TimeMark[]
}

@Injectable({
  providedIn: 'root',
})
export class RecordConfigService {
  config!: RecordConfig;

  getRecordConfigData() {
    return new Promise<RecordConfig>((resolve) => {
      const linkToRepoArray = configFile.linkToRepo.split('/');
      const repoName = linkToRepoArray[linkToRepoArray.length - 1];
      const ownerName = linkToRepoArray[linkToRepoArray.length - 2];

      const pathArray = configFile.entryFileRelativePath.split('\\');
      const fileName = pathArray[pathArray.length - 1];

      const response = {
        duration: configFile.duration,
        repoName,
        ownerName,
        fileName,
        commitHash: configFile.commitHash,
        relativePath: configFile.entryFileRelativePath,
        commands: commandsFile,
        rootFolder: configFile.rootFolder,
        timeMarks: configFile.timestamps,
      };

      this.config = response;
      resolve(response);
    });
  }
}
