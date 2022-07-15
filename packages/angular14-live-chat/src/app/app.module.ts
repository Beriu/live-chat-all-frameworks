import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { UsernameComponent } from './username/username.component';
import { AppendEmojisPipe } from './append-emojis.pipe';
import { SocketService } from './socket.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ChatInputComponent,
    ChatMessageComponent,
    UsernameComponent,
    AppendEmojisPipe
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
