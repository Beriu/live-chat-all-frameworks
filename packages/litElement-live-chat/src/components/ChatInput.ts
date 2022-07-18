import { html, css, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'


@customElement('chat-input')
export default class ChatInput extends LitElement {
    
    static styles = css`
        form {
            display: flex
        }

        form input {
            flex-grow: 3;
        }

        form input,button {
            padding: 2.5px 5px;
        }
    `;

    @property({ type: String })
    placeholder = "Send a tweet";

    @state()
    chatInputValue = "";

    private onClickHandler() {
        this.dispatchEvent(
            new CustomEvent('submitMessage', { detail: { text: () => this.chatInputValue } })
        );
        this.chatInputValue = "";
    }

    render() {
        return html`
            <form @submit=${(e: Event) => e.preventDefault()}>
                <label hidden></label>
                <input 
                    .value=${this.chatInputValue}
                    @input=${(e: Event) => this.chatInputValue = e.target.value} 
                    type="text" 
                    placeholder=${this.placeholder}>
                <button @click=${this.onClickHandler}>Press F</button>
            </form>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'chat-input': ChatInput
    }
}
