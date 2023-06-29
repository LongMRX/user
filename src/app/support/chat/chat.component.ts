import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {Enum, Message, Register} from "../../ts/config";
import {environment} from "../../../environments/environment";
import {ChatService} from 'src/app/service/chat.service';
import Echo from 'laravel-echo';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('chatContainer') chatContainer!: ElementRef;
  @ViewChild('modalZoomImage') modalZoomImage: any;

  @Input() messageUser: any;
  @Input() user: any;
  @Input() userId: number = 0;
  @Output() backEmit = new EventEmitter<boolean>();
  messages: any[] = [];
  errors: any;
  messageForm !: FormGroup;
  data: any;
  image: any;
  file: any;
  show: boolean = false;
  isSending: boolean = false;
  url = environment.urlImg;
  showDeleteTooltip: boolean = false;
  zoomed: boolean = false;
  zoomedImage: string = '';
  constructor(
    private fb: FormBuilder,
    private chatService: ChatService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.messageForm = this.fb.group({
      message: ['', this.noWhitespaceValidator],
      photo: [''],
    });
    this.getMessage();
    this.getEventSendMessage();
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  getEventSendMessage() {
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
    return isValid ? null : {'whitespace': true};
  }

  handleMessage() {
    if (this.isSending) {
      return; // Khi tin nhắn đang được gửi, không thực hiện hành động gửi mới
    }
    this.isSending = true; // Đánh dấu tin nhắn đang được gửi

    const messageValue = this.messageForm.value?.message;

    let message: Message = {
      message: messageValue?.trim() !== '' ? messageValue : '',
      to_user: this.user.id,
      photo: this.messageForm.value?.photo
    }

    this.chatService.sendMessage(message).subscribe(res => {
      this.data = res;
      if (this.data?.status == Enum.SUCCESS) {
        this.messageForm.reset({message: '', photo: ''});
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

  showTooltip(msgId: any) {
    // Duyệt qua danh sách tin nhắn và cập nhật trạng thái tooltip xóa cho tin nhắn tương ứng
    this.messageUser.forEach((msg: any) => {
      if (msg.id === msgId) {
        msg.showDeleteTooltip = true; // Add a new property to the message object
        console.log(msg.showDeleteTooltip);
      } else {
        msg.showDeleteTooltip = false; // Set showD
      }
    });
  }

  deleteMessage(id: any) {
    this.chatService.delete(id).subscribe(res => {
      this.messageUser = this.messageUser.filter((msg: any) => msg.id !== id);
    })
  }
  zoomImage(imageUrl: string): void {
    this.modalService.open(this.modalZoomImage);
    this.zoomed = true;
    this.zoomedImage = imageUrl;
  }
}
