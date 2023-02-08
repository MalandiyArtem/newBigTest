import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from 'src/app/shared/shared-module/services/chat.service';
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
  ) {
  }

  showMessage() {
    console.log('This is a message from button');
    const result = this.nextMethod(4, 6);
    this.chatservice.testFunction_2(result);
    console.log('[{ended result}]: ', result);
  }

  nextMethod(arg1: number, arg2: number) {
    if (arg1 > arg2) {
      return arg1 - arg2;
    } else {
      return arg1 - arg2;
    }

    // Unreachable code
    return 0;
  }

  ngOnInit(): void {
    this.chatservice.testFunction(1);
    this.chatservice.returnTestVariable().subscribe(value => {
      this.testVar = value;
    });

    this.chatservice.returnTestVariable().subscribe((value: number) => {
      this.testVar = value;
    })


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

  ngOnDestroy(): void {
    this.closeWSConnection();
  }

  private closeWSConnection() {
    this.webcamBroadcast.socket.close();
    this.webcamBroadcast.peerConnection.close();
  }
}
