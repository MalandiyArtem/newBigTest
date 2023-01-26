import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FullscreenService } from '../../services/fullscreen.service';

@Component({
  selector: 'app-fullscreen',
  templateUrl: './fullscreen.component.html',
  styleUrls: ['./fullscreen.component.scss'],
})
export class FullscreenComponent implements OnInit, OnDestroy {
  isFullScreen = false;
  private subscription: Subscription | undefined;

  constructor(private fullscreenService: FullscreenService) {
  }

  fullscreenToggle() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        this.fullscreenService.setIsFullScreen(true);
        this.isFullScreen = true;
      });
    } else if (document.exitFullscreen) {
      document.exitFullscreen().then(() => {
        this.fullscreenService.setIsFullScreen(false);
        this.isFullScreen = false;
      });
    }
  }

  ngOnInit(): void {
    this.subscription = this.fullscreenService.getIsFullScreen().subscribe((state) => {
      this.isFullScreen = state;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
