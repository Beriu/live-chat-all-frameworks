import './style.css';
import App from './components/App';
import type CustomElement from './lib/CustomElement';
import ChatInput from './components/ChatInput';
import Chat from './components/Chat';
import type { ChatMessage as ChatMessageType } from 'repo-types/index';
import { serializeData } from './lib/dataTransformers';
import ChatMessage from './components/ChatMessage';
import ColorBlindMode from './components/ColorBlindMode';
import socket from "./socket";

customElements.define('app-component', App);
customElements.define('chat-component', Chat);
customElements.define('chat-input', ChatInput);
customElements.define('chat-message', ChatMessage);
customElements.define('color-blind-mode', ColorBlindMode);

const appContainer = document.querySelector<HTMLDivElement>('#app')!

appContainer.innerHTML = `
    <app-component status='OFFLINE'>
        <color-blind-mode slot="colot-blind-mode"></color-blind-mode>
        <chat-component cbm="false" slot="chat">
            <chat-message message tier username cbm slot="chat-message"></chat-message>
            <chat-input slot="chat-input" placeholder="Send a tweet"></chat-input>
        </chat-component>
    </app-component>
`;

const messages: ChatMessageType[] = [];

const chat = document.querySelector('chat-component') as CustomElement;
const chatInput = document.querySelector('chat-input') as CustomElement;
const colorBlindMode = document.querySelector('color-blind-mode') as CustomElement;

const setMessages = (messages: any[]) => chat.setAttribute('messages', serializeData(messages));

setMessages(messages);

socket.on("chatMessage", (chatMessage) => {
    if(messages.length >= 20) messages.shift();
    messages.push(chatMessage);
    setMessages(messages);
});

const messageHandler = (e: CustomEvent) => socket.emit("sendMessage", e.detail.input());

const cbmHandler = (e: CustomEvent) => chat.setAttribute('cbm', e.detail.checked().toString());

chatInput.addEventListener('sendMessage', messageHandler as any);

colorBlindMode.addEventListener('colorBlindMode:change', cbmHandler as any);





