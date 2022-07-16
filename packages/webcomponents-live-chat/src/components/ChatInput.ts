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
        btn: document.createElement('button'),
        style: document.createElement('style')
    };
    
    static get observedAttributes() {
        return [""];
    }

    constructor() {
        super();
    }

    render() {
        const {btn, input, form, style} = this.elements;

        style.innerHTML = `
            form {
                display: flex;
            }

            input {
                padding: 5px 10px;
                flex-grow: 3;
            }

            button {
                flex-grow: 1;
            }
        `;

        btn.innerText = "Send something nice";
        input.type = "text"
        input.placeholder = this.props.placeholder;

        btn.onclick = () => {
            const ev = new CustomEvent("sendMessage", { bubbles: true, detail: { input: () => input.value } })
            this.dispatchEvent(ev);
            input.value = "";
        };

        form.onsubmit = (e) => e.preventDefault();

        this.shadowRoot!.appendChild(style);
        form.appendChild(input);
        form.appendChild(btn);
        this.shadowRoot!.appendChild(form);
    }
}