import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IChatMessage } from '../../interfaces/chatMessage.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private messages: IChatMessage[] = [];
  private value = 0;
  private testVariable$ = new BehaviorSubject<number>(0);

  private testVariable2$ = new BehaviorSubject<number>(0);

  getMessages(): IChatMessage[] {
    return this.messages;
  }

  sendMessage(userName: string, text: string): void {
    this.messages.push({ userName, text, time: '12:22' });
  }

  emitValues(status: boolean) {
    if (status) {
      return this.value++;
    } else {
      return this.value--;
    }
  }

  testFunction(value: number) {
    this.testVariable2$.next(value);
  }

  returnTestVariable() {
    return this.testVariable2$.asObservable;
  }

  // testFunction(value: number) {
  //   this.testVariable$.next(value);
  // }

  // returnTestVariable() {
  //   return this.testVariable$.asObservable;
  // }
}
