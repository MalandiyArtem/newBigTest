1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20
1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20
1234512345
1234567890
123456789012345678901234567890
q w e r t y u i o a s d f g h j k l z x c v b n m ,
1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 290
1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 29 130
1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20
1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as monaco from 'monaco-editor';
import { MatSliderDragEvent } from '@angular/material/slider';
import { ActiveStreamService } from '../../../../../shared/shared-module/services/active-stream.service';
import { WebcamComponent } from '../../../../../shared/shared-module/components/webcam/webcam.component';
import { editorOptions } from '../../../../../shared/constants';
import { GithubService } from '../../../../../shared/shared-module/services/GitHub/github.service';
import { MonacoService } from '../../../../../shared/shared-module/services/Monaco/monaco.service';
import { RecordConfigService } from '../../../../../shared/shared-module/services/Record/record-config.service';
import { PlaybackService } from '../../../../../shared/shared-module/services/Record/playback.service';
import { TempStoreService } from '../../../../../shared/shared-module/services/Record/temp-store.service';
import { MediaControlService } from 'src/app/shared/shared-module/services/media-control.service';

// TODO: extract in separate interface
interface TimeMark {
  title: string,
  position: number,
  timeInSec: number,
}

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss'],
})
export class RecordComponent implements OnInit, AfterViewInit {
  @ViewChild(WebcamComponent) webcamComponent: WebcamComponent | undefined;

  recordDurationSec = 0.00;
  recordDurationSecString = '00:00';
  currentTimePositionSec = 0.00;
  currentTimePositionSecString = '00:00';

  isPlaying = false;
  isMuted = false;

  currentFileName = '';

  timeSecToRewindCam = 0;

  webcamElement: ElementRef | undefined = undefined;

  sliderDisabled = false;

  timeMarks: TimeMark[] = [];

  constructor(
    private activeStreamService: ActiveStreamService,
    private gitHubService: GithubService,
    private monacoService: MonacoService,
    private recordConfigService: RecordConfigService,
    private playbackService: PlaybackService,
    private tempStoreService: TempStoreService,
    private mediaControlService: MediaControlService,
  ) { }

  ngOnInit() {

    this.mediaControlService.getValueFromMediaControl().subscribe((value: boolean) => {
      console.log(value);
    });

    // this.gitHubService.getRemoteTextOfFile().subscribe((data) => {
    //   if (data) {
    //     this.tempStoreService.setTempWholeText(data.path.split('/').join('\\'), data.text, true);
    //     this.monacoService.setWholeTextInMonaco(data.text);
    //   }
    // });

    // this.playbackService.currentOpenedFile$.subscribe((path) => {
    //   this.currentFileName = path || '';
    // });

    // this.playbackService.isPlaying$.subscribe((isPlaying) => {
    //   if (isPlaying === null) return;

    //   this.sliderDisabled = !isPlaying;
    //   this.onPlayPauseClick();
    // });

    // this.playbackService.playAgain$.subscribe((playAgain) => {
    //   if (playAgain) {
    //     this.tempStoreService.clearTemp();
    //     this.getConfig();
    //   }
    // });
  }

  initCam(webcamRef: ElementRef | undefined) {
    if (webcamRef) {
      this.webcamElement = webcamRef;
    }
  }

  async dragEnd(event: MatSliderDragEvent | number) {
    let timeToRewind: number;
    if (typeof event === 'number') {
      timeToRewind = event;
    } else {
      timeToRewind = event.value < 0 ? 0 : event.value;
    }

    if (timeToRewind > this.currentTimePositionSec) {
      await this.playbackService.rewindForward(timeToRewind);
    } else if (timeToRewind < this.currentTimePositionSec) {
      await this.playbackService.rewindBackward(this.currentTimePositionSec, timeToRewind);
    }

    if (this.webcamElement) {
      this.webcamElement.nativeElement.currentTime = timeToRewind;
    }
    this.currentTimePositionSec = timeToRewind;
    this.currentTimePositionSecString = this.getFormattedTime(timeToRewind);
  }

  formatLabel = (value: number) => this.getFormattedTime(value || 0);

  ngAfterViewInit(): void {
    const container = document.getElementById('monacoContainer');
    if (container) {
      const editor = monaco.editor.create(container, editorOptions);
      this.monacoService.setEditorInstance(editor, container);
    }

    this.getConfig();
  }

  onTimeSecUpdate(eventData: number) {
    this.playbackService.updateRealTime(Math.trunc(eventData * 1000));
    this.currentTimePositionSecString = this.getFormattedTime(eventData);
    this.currentTimePositionSec = eventData;
  }

  onPlayPauseClick() {
    this.isPlaying = !this.isPlaying;
    this.webcamComponent?.playPauseChange(this.isPlaying);
    if (this.isPlaying) {
      this.playbackService.playPlayback();
    } else {
      this.playbackService.pausePlayback();
    }
  } test test test еуые 2 еуые 2 bla bla bla qwerqwer11112222333

  hello world test yes

  private getFormattedTime(inputValueSeconds: number): string {
    const time = new Date(0);
    time.setSeconds(inputValueSeconds);

    let hours: string | null = null;
    if (inputValueSeconds >= 3600) {
      hours = time.getHours().toString().padStart(2, '0');
    }

    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');

    return `${
      hours ? `${hours}:` : ''
    }${minutes}:${seconds}`;
  }

  onMuteClick() {
    this.isMuted = !this.isMuted;
  }

  onVideoEnded() {
    this.isPlaying = false;
  }

  private getConfig() {
    console.log('GetConfigMethod');
    this.recordConfigService.getRecordConfigData().then((value) => {
      value.timeMarks.forEach((item) => {
        const position = ((item.timePoint.hours * 3600000 + item.timePoint.minutes * 60000 + item.timePoint.seconds * 1000 + item.timePoint.milliseconds) * 100) / (value.duration * 1000);
        const res: TimeMark = {
          title: item.title,
          position,
          timeInSec: item.timePoint.seconds,
        };
        this.timeMarks.push(res);
      });

      this.tempStoreService.setIdToFile(value.relativePath);

      this.recordDurationSecString = this.getFormattedTime(value.duration);
      this.recordDurationSec = value.duration;
      this.playbackService.setCommands(value.commands, value.relativePath);

      this.gitHubService.sendRequestToGetRemoteFileText(
        value.relativePath.split('\\').slice(1).join('\\'),
        value.commitHash,
        value.ownerName,
        value.repoName,
      );
    });
  }
}
