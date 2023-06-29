import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import { Enum, Message, Register } from "../../ts/config";
import { environment } from "../../../environments/environment";
import { ChatService } from 'src/app/service/chat.service';
import Echo from 'laravel-echo';

@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.css']
})
export class ChatUserComponent implements OnInit {

  @Input() messageUser: any;
  @Output() backEmit = new EventEmitter<boolean>();
  @ViewChild('chatContainer') chatContainer!: ElementRef;

  messages: any[] = [];
  messageForm !: FormGroup;
  data: any;
  user: any;
  image: any;
  file: any;
  isSending: boolean = false;
  url = environment.urlImg;
  show: boolean = false;
  constructor(
    private fb: FormBuilder,
    private chatService: ChatService

  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage['currentUser']);

    this.messageForm = this.fb.group({
      message: [''],
      photo: [''],
    });
    this.getMessage();

    const echo = new Echo({
      broadcaster: 'pusher',
      key: environment.push.key,
      cluster: environment.push.cluster,
      wsHost: window.location.hostname,
      wsPort: 6001,
      forceTLS: false,
      disableStats: true,
    });
    echo.channel('chat')
      .listen('SendMessage', (res: any) => {
        this.messageUser.push(res.message);
        console.log('Chat Event Data : ', this.messageUser);
      });
  }
  ngAfterViewInit() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    if (this.chatContainer) {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    }
  }
  get isButtonDisabled() {
    // @ts-ignore
    if (this.messageForm.get('photo').value) {
      return false;
    }
    if (this.messageForm.invalid) {
      return true;
    }
  }
  noWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  handleMessage() {
    if (this.isSending) {
      return; // Khi tin nhắn đang được gửi, không thực hiện hành động gửi mới
    }
    this.isSending = true; // Đánh dấu tin nhắn đang được gửi

    const messageValue = this.messageForm.value?.message;

    let message: Message = {
      message: messageValue?.trim() !== '' ? messageValue : '' ,
      to_user: Enum.IS_ADMIN,
      photo: this.messageForm.value?.photo
    }

    this.chatService.sendMessage(message).subscribe(res => {
      this.data = res;
      if (this.data?.status == Enum.SUCCESS) {
        this.messageForm.reset({ message: '', photo: '' });
        this.removeImage();
      }
      this.isSending = false; // Đánh dấu tin nhắn đã được gửi

    });

  }
  getMessage() {
    if (this.messageUser == '') {
      this.chatService.readMessage(this.user.id).subscribe(res => {
        this.messageUser = res.message;
      })
    }
  }
  goBack() {
    this.backEmit.emit(this.show);
  }
  sendImage(event: any) {
    this.file = event.target.files ? event.target.files[0] : '';
    this.messageForm.patchValue({
      photo: this.file
    });

    this.messageForm.get('photo')?.updateValueAndValidity();

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.image = reader.result as string;
    }
    reader.readAsDataURL(this.file);

  }
  removeImage() {
    this.file = undefined;
    this.image = undefined;
    this.messageForm.patchValue({
      image: ''
    });
  }
}
