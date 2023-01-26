import {
  AfterViewChecked, Component, ElementRef, OnInit, ViewChild,
} from '@angular/core';
import { IChatMessage } from '../../../interfaces/chatMessage.interface';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [ChatService],
})
export class ChatComponent implements OnInit, AfterViewChecked {
  messages: IChatMessage[] = [];
  message = '';
  @ViewChild('chatBody') private chatBody: ElementRef | undefined;

  constructor(private chatService: ChatService) {
  }

  ngOnInit(): void {
    this.messages = this.chatService.getMessages();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    if (this.chatBody) {
      this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
    }
  }

  submit(event: Event): void {
    event.preventDefault();
    if (this.message.trim() !== '') {
      this.chatService.sendMessage('Artem Malandiy', this.message);
    }
    this.message = '';
  }
}
