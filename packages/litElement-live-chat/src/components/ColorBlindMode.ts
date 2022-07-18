import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'


@customElement('color-blind-mode')
export default class ColorBlindMode extends LitElement {
    
    static styles = css``;

    @property({ type: Boolean })
    isColorBlind = false;

    private onChangeHandler() {
        this.dispatchEvent(
            new CustomEvent("change", { detail: !this.isColorBlind })
        );
    }

    render() {
        return html`
            <form @submit=${(e: Event) => e.preventDefault()}>
                <input @change=${this.onChangeHandler} id="color-blind-mode" type="checkbox"/>
                <label for="color-blind-mode">Color blind mode</label>
            </form>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'color-blind-mode': ColorBlindMode
    }
}
