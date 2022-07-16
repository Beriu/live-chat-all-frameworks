import CustomElement from "../lib/CustomElement";

export default class App extends CustomElement {

    protected propsConfig = {
        status: {
            type: String,
            required: true,
            default: () => "OFFLINE"
        }
    };

    
    static get observedAttributes() {
        return ["status"];
    }

    constructor() {
        super();
    }

    render() {
        return this.shadowRoot!.innerHTML = `
            <slot name="colot-blind-mode"></slot>
            <slot name="chat"></slot>
        `;
    }
}