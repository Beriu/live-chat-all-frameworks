import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { UsernameComponent } from './username/username.component';
import { AppendEmojisPipe } from './append-emojis.pipe';

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
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
