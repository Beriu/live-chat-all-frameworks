import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-chat-input',
    templateUrl: './chat-input.component.html',
    styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent {

    @Input() placeholder!: string;
    @Input() messageHandler!: (msg: string) => void;

    constructor() { }

    sendMessage(el: HTMLInputElement) {
        this.messageHandler(el.value);
        el.value = "";
    }
}
