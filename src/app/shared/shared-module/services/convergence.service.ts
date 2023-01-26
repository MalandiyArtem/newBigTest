import { Injectable } from '@angular/core';
import { Convergence, ConvergenceDomain, RealTimeModel } from '@convergence/convergence';
import { Observable, Subject } from 'rxjs';
import { FAKE_HOST_FILE_PATH, CONSTANTS } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class ConvergenceService {
  private childModel$ = new Subject();
  private userName: string | undefined;
  private sessionId: string | undefined;
  private activeHostStreamPath$ = new Subject();

  joinStream(streamId: string, userName: string) {
    this.joinMainStream(streamId, userName);
  }

  joinMainStream(streamId: string, userName: string) {
    Convergence.connectAnonymously(CONSTANTS.URLS.CONVERGENCE_URL, userName)
      .then((domain: ConvergenceDomain) => {
        const modelService = domain.models();
        modelService.open(streamId)
          .then((model: RealTimeModel) => {
            const activeHostStreamId = model.elementAt('ActiveHostsStreamId').value();
            // TODO: get real path from convergence field
            this.activeHostStreamPath$.next(FAKE_HOST_FILE_PATH);
            this.joinChildStream(activeHostStreamId, userName);
          })
          .catch((e: Error) => {
            console.log(e);
          });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  joinChildStream(streamId: string, userName: string) {
    Convergence.connectAnonymously(CONSTANTS.URLS.CONVERGENCE_URL, userName)
      .then((domain: ConvergenceDomain) => {
        const modelService = domain.models();
        modelService.open(streamId)
          .then((model: RealTimeModel) => {
            this.childModel$.next(model);
            const realTimeText = model.elementAt('Text');
            console.log(realTimeText.value());
          })
          .catch((e: Error) => {
            console.log(e);
          });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  getChildModel() {
    return this.childModel$ as Observable<RealTimeModel>;
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
