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

  getActiveFile() {
    return this.activeFilePath$.asObservable();
  }
}
