import {
  AfterViewInit,
  Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss'],
})
export class WebcamComponent implements OnChanges, AfterViewInit {
  @Input() source?: string | MediaSource | MediaStream;
  @Input() duration = 0;
  @Input() isMuted = false;
  @Input() isAutoplay = false;

  @Output() timeSecUpdate = new EventEmitter<number>();
  @Output() videoEndedChange = new EventEmitter<void>();
  @Output() videoInit = new EventEmitter<ElementRef | undefined>();

  @ViewChild('webcamVideo') webcamPlayer: ElementRef | undefined;

  intervalInstance: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['source']) {
      this.webcamPlayer?.nativeElement.load();
    }
  }

  playPauseChange(isPlaying: boolean) {
    if (isPlaying) {
      this.webcamPlayer?.nativeElement.play();
      this.intervalInstance = setInterval(() => {
        const currentTime = this.webcamPlayer?.nativeElement.currentTime;
        this.timeSecUpdate.emit(currentTime);
      }, 5);
    } else {
      this.webcamPlayer?.nativeElement.pause();
      clearInterval(this.intervalInstance);
    }
  }

  onVideoEnd() {
    this.videoEndedChange.emit();
  }

  ngAfterViewInit(): void {
    this.videoInit.emit(this.webcamPlayer);
  }
}
