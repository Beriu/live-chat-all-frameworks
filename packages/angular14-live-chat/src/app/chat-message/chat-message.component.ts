import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ChatMessage } from "repo-types/index";

@Component({
    selector: 'app-chat-message',
    templateUrl: './chat-message.component.html',
    styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements AfterViewInit {

    @Input() scrollIntoView: boolean = false;
    @Input() isColorBlind!: boolean;
    @Input() message!: ChatMessage;

    @ViewChild("messageParent") el!: ElementRef<HTMLSpanElement>;

    constructor() {}

    ngAfterViewInit(): void {
        if(this.scrollIntoView) {
            this.el.nativeElement.scrollIntoView({
                behavior: "smooth"
            });
        }
    }
}
