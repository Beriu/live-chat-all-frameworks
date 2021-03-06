import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatMessage } from 'repo-types';
import { SocketService } from './socket.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

    private maxMessagesNumber = 20;
    isColorBlind = false;
    messages: ChatMessage[] = [];

    constructor(private socketService: SocketService) {
        console.log('service', this.socketService);
    }

    sendMessage = (msg: string) => {
        this.socketService.emit("sendMessage", msg);
    }

    isLastMessage = (index: number) => {
        return index === this.messages.length - 1;
    }

    trackByMessages(index: number, msg: ChatMessage) { 
        return index; 
    }

    ngOnInit(): void {
        const chatMessage = (msg: ChatMessage) => {
            if(this.messages.length >= this.maxMessagesNumber) this.messages.shift();
            this.messages = [...this.messages, msg];
        };
        this.socketService.setHandlers({ chatMessage });
        this.socketService.connect();
    }

    ngOnDestroy(): void {
        this.socketService.disconnect();
    }
}
