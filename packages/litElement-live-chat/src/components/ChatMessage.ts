import { html, css, LitElement } from 'lit'
import { customElement, property, queryAsync } from 'lit/decorators.js'
import { ChatMessage as ChatMessageType, Emoji } from 'repo-types';


@customElement('chat-message')
export default class ChatMessage extends LitElement {
    
    static styles = css`
        span {
            line-height: 1.5rem;
        }
    `;

    @queryAsync("span")
    messageContainer!: Promise<HTMLSpanElement>;

    @property({ type: Boolean })
    scrollIntoVue = false;

    @property({ type: Boolean })
    isColorBlind = false;

    @property({ type: Object })
    message!: ChatMessageType;

    private static appendEmojis(msg: string) {
        Object.keys(Emoji).forEach(key => msg = msg.replaceAll(key, Emoji[key]));
        return msg;
    };

    async firstUpdated() {
        if(this.scrollIntoVue) {
            const el = await this.messageContainer;
            el.scrollIntoView({ behavior: 'smooth' });
        }
    }

    render() {
        return html`
            <span>
                <username-label
                    .tier=${this.message.user.tier}
                    .isColorBlind=${this.isColorBlind}
                    .username=${this.message.user.username}>
                </username-label>
                : ${ ChatMessage.appendEmojis(this.message.payload) }
            </span>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'chat-message': ChatMessage
    }
}
