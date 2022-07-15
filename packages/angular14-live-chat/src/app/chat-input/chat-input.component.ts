import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-chat-input',
    templateUrl: './chat-input.component.html',
    styleUrls: ['./chat-input.component.scss'],
})
export class ChatInputComponent {

    @Input() placeholder!: string;
    @Input() messageHandler!: (msg: string) => void;
    
    chatInput: string = "";
    isDisabled: boolean = false;

    constructor() { }

    sendMessage = (msg: string) => {
        this.messageHandler(msg);
        this.chatInput = "";
    }
}
