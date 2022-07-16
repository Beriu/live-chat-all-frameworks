import CustomElement from "../lib/CustomElement";

export default class ChatInput extends CustomElement {

    protected propsConfig = {
        placeholder: {
            type: String,
            required: true,
        }
    };

    private elements = {
        form: document.createElement('form'),
        input: document.createElement('input'),
        btn: document.createElement('button')
    };

    
    static get observedAttributes() {
        return [""];
    }

    constructor() {
        super();
    }

    render() {
        const {btn, input, form} = this.elements;

        btn.innerText = "Send something nice";
        input.type = "text"
        input.placeholder = this.props.placeholder;

        btn.onclick = (e) => {
            const ev = new CustomEvent("sendMessage", { bubbles: true, detail: { input: () => input.value } })
            this.dispatchEvent(ev);
            input.value = "";
        };

        form.onsubmit = (e) => e.preventDefault();

        form.appendChild(input);
        form.appendChild(btn);
        this.shadowRoot!.appendChild(form);
    }
}