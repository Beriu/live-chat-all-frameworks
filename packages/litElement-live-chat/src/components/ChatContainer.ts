import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import ChatMessage from './ChatMessage';
import { ChatMessage as ChatMessageType } from 'repo-types';


@customElement('chat-container')
export default class ChatContainer extends LitElement {
    
    static styles = css`
        .chat-container {
            display: flex;
            flex-direction: column;
        }

        .chat-messages {
            display: flex;
            flex-direction: column;
            height: 400px;
            width: 600px;
            overflow-y: scroll;
        }
    `;

    @property({ type: Boolean })
    isColorBlind = false;

    @property({ type: Array })
    messages: ChatMessageType[] = [];

    @property()
    chatMessageNode!: ChatMessage

    private instantiateNode = (msg: ChatMessageType, index: number) => {
        const newNode = this.chatMessageNode.cloneNode() as ChatMessage;
        newNode.isColorBlind = this.isColorBlind;
        newNode.message = msg;
        newNode.scrollIntoVue = index === this.messages.length - 1;
        return newNode;
    }

    render() {
        return html`
            <div class="chat-container">
                <slot></slot>

                <div class="chat-messages">
                    ${ this.messages.map(this.instantiateNode) }
                </div>
                
                <slot name="chat-input"></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'chat-container': ChatContainer
    }
}
