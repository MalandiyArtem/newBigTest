import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TreeService } from './tree.service';

@Injectable({
  providedIn: 'root',
});

export class ConvergenceService {
  private childModel$ = new Subject();
  private userName: string | undefined;
  private sessionId: string | undefined;
  private activeHostStreamPath$ = new Subject();

  constructor(private treeService: TreeService) {}

  joinStream(streamId: string, userName: string) {
    this.joinMainStream(streamId);
  }

  joinMainStream(value: string | undefined) {
    const answer = this.treeService.testMethodOfTreeService(value);
    return answer;
  }

  joinChildStream(streamId: string, userName: string) {
    return '{Child stream}';
  }

  getChildModel() {
    return '[Child model]';
  }

  setUserName(name: string) {
    this.userName = name;
  }

  getUserName() {
    return this.userName;
  }

  setSessionId(sessionId: string) {
    this.sessionId = sessionId;
  }

  getSessionId() {
    return this.sessionId;
  }

  getActiveHostStreamPath() {
    return this.activeHostStreamPath$ as Observable<string>;
  }
}
