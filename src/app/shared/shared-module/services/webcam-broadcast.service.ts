import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Socket } from 'socket.io-client';
import { Subject } from 'rxjs';
import { CONSTANTS } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class WebcamBroadcastService {
  public readonly socket: Socket;
  public peerConnection!: RTCPeerConnection;
  private videoSrc$ = new Subject<MediaStream>();
  private config = {
    iceServers: [
      {
        urls: CONSTANTS.URLS.BROADCASTING.STUN_SERVER,
      },
    ],
  };

  constructor() {
    this.socket = io.connect(CONSTANTS.TEMP.URLS.BROADCASTING.WEBCAM_DATA);
  }

  initConnection() {
    this.socket.on('offer', (id: string, description: RTCSessionDescription) => {
      this.peerConnection = new RTCPeerConnection(this.config);
      this.peerConnection
        .setRemoteDescription(description)
        .then(() => this.peerConnection.createAnswer())
        .then((sdp: RTCLocalSessionDescriptionInit) => this.peerConnection.setLocalDescription(sdp))
        .then(() => {
          this.socket.emit('answer', id, this.peerConnection.localDescription);
        });
      this.peerConnection.ontrack = (event: RTCTrackEvent) => {
        this.videoSrc$.next(event.streams[0]);
      };
      this.peerConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
        if (event.candidate) {
          this.socket.emit('candidate', id, event.candidate);
        }
      };
    });

    this.socket.on('candidate', (id: string, candidate: RTCIceCandidate) => {
      this.peerConnection
        .addIceCandidate(new RTCIceCandidate(candidate))
        .catch((e: RTCPeerConnectionIceErrorEvent) => console.error(e));
    });

    this.socket.on('connect', () => {
      this.socket.emit('watcher');
    });

    this.socket.on('broadcaster', () => {
      this.socket.emit('watcher');
    });
  }

  getVideoSrc() {
    return this.videoSrc$.asObservable();
  }
}
