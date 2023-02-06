import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from 'src/app/shared/shared-module/services/chat.service';
import { IframeService } from 'src/app/shared/shared-module/services/iframe.service';
import { ConvergenceService } from '../../../../../shared/shared-module/services/convergence.service';
import { WebcamBroadcastService } from '../../../../../shared/shared-module/services/webcam-broadcast.service';

@Component({
  selector: 'app-live-stream',
  templateUrl: './live-stream.component.html',
  styleUrls: ['./live-stream.component.scss'],
})
export class LiveStreamComponent implements OnInit, OnDestroy {
  videoSource?: MediaStream;
  testVar = 0;

  constructor(
    private convergenceService: ConvergenceService,
    private webcamBroadcast: WebcamBroadcastService,
    private chatservice: ChatService,
    private iframeService: IframeService,
  ) {
  }

  ngOnInit(): void {
    // this.chatservice.testFunction(1);
    // this.chatservice.returnTestVariable().subscribe(value => {
    //   this.testVar = value;
    // });

    this.iframeService.getIframeMethod().subscribe((value: boolean) => {
      console.log(value);
    });

    const sessionID = this.convergenceService.getSessionId();
    const username = this.convergenceService.getUserName();
    if (sessionID && username) {
      this.convergenceService.joinStream(sessionID, username);
      this.webcamBroadcast.initConnection();
      this.webcamBroadcast.getVideoSrc().subscribe((src: MediaStream) => {
        this.videoSource = src;
      });
    }

    window.onbeforeunload = () => {
      this.closeWSConnection();
    };
  }

  showMessage() {
    console.log('This is the message emmitted by clicking on the button');
    this.iframeService.iframeMethod();
  }

  ngOnDestroy(): void {
    this.closeWSConnection();
  }

  private closeWSConnection() {
    this.webcamBroadcast.socket.close();
    this.webcamBroadcast.peerConnection.close();
  }
}
