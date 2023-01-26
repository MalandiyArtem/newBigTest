import { Component, OnInit } from '@angular/core';
import { FullscreenService } from './shared/shared-module/services/fullscreen.service';
import { MediaControlService } from './shared/shared-module/services/media-control.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  constructor(
    private fullscreenService: FullscreenService,
    private mediaControlService: MediaControlService,
  ) {
  }

  ngOnInit(): void {
    document.addEventListener('fullscreenchange', () => {
      if (document.fullscreenElement) {
        this.fullscreenService.setIsFullScreen(true);
      } else {
        this.fullscreenService.setIsFullScreen(false);
      }
    });
  }

  mouseEnterHandle() {
    this.mediaControlService.setIsMouseOnDocument(true);
  }

  mouseLeaveHandle() {
    this.mediaControlService.setIsMouseOnDocument(false);
  }
}
