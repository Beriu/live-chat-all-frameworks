import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'


@customElement('username-label')
export default class UsernameLabel extends LitElement {
    
    static styles = css`
        span {
            padding: 0 5px;
            color: white;
            border-radius: 2.5px
        }
    `;

    @property({ type: String })
    username = "N/A";

    @property({ type: Number })
    tier = -1;

    @property({ type: Boolean })
    isColorBlind = false;

    private static setBackgroundColor(tier: number) {
        const tierColors = ["purple", "blue", "pink", "green", "orange"];
        return tierColors[tier] ?? "grey";
    }

    render() {
        const bgColor = this.isColorBlind ? "black" : UsernameLabel.setBackgroundColor(this.tier);
        return html`
            <span style="background-color: ${bgColor}">
                ${ this.username }
            </span>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'username-label': UsernameLabel
    }
}
