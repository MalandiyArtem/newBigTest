import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MediaControlService {
  private isMouseOnDocument$ = new BehaviorSubject(false);

  setIsMouseOnDocument(isMouseOnDocument: boolean) {
    this.isMouseOnDocument$.next(isMouseOnDocument);
  }

  getIsMouseOnDocument() {
    return this.isMouseOnDocument$ as Observable<boolean>;
  }

  getValueFromMediaControl() {
    return this.isMouseOnDocument$ as Observable<boolean>;
  }
}
