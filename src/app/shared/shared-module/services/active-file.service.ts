import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActiveFileService {
  private activeFilePath$ = new BehaviorSubject('');

  setActiveFile(path: string) {
    this.activeFilePath$.next(path);
  }

  testActiveFile(path: string) {
    return this.activeFilePath$.asObservable();
  }
}
