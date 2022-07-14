import { Component, Input, OnInit } from '@angular/core';
import { ChatMessage } from "repo-types/index";

@Component({
    selector: 'app-chat-message',
    templateUrl: './chat-message.component.html',
    styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {

    @Input() isColorBlind!: boolean;
    @Input() message!: ChatMessage;

    constructor() {}

    ngOnInit(): void {

    }

}
