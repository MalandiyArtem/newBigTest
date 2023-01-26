import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FullscreenService {
  private isFullScreen = new BehaviorSubject(false);

  setIsFullScreen(state: boolean) {
    this.isFullScreen.next(state);
  }

  getIsFullScreen() {
    return this.isFullScreen as Observable<boolean>;
  }
}
