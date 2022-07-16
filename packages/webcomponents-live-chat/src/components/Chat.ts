import { ChatMessage } from "repo-types";
import CustomElement from "../lib/CustomElement";
import StringToBoolean from "../lib/StringToBoolean";

export default class Chat extends CustomElement {

    protected propsConfig = {
        messages: {
            type: Array,
            default: () => []
        },
        cbm: {
            /** Don't even ask bro */
            type: StringToBoolean,
            required: true
        }
    };

    
    static get observedAttributes() {
        return ["messages", "cbm"];
    }

    constructor() {
        super();
    }

    render() {
        let slotNode = Array.from(this.children).find(c => c.getAttribute('slot') === 'chat-message');
        
        if(!slotNode) {
            slotNode = document.createElement('span');
            slotNode.innerHTML = 'Placeholder Node';
        }

        const createNode = (msg: ChatMessage) => {
            const n = slotNode!.cloneNode(true) as Element;
            n.setAttribute("message", msg.payload);
            n.setAttribute("tier", msg.user.tier.toString());
            n.setAttribute("username", msg.user.username);
            n.setAttribute("cbm", this.props.cbm);
            return n;
        };

        const wrapper = document.createElement("div");
        const style = document.createElement('style');

        style.innerHTML = `
            div {
                display: flex;
                flex-direction: column;
                height: 400px;
                width: 600px;
                line-height: 1.5rem;
                overflow-y: scroll;
            }
        `;


        this.props.messages.forEach(m => {
            wrapper.appendChild(
                createNode(m)
            )
        });

        this.shadowRoot!.innerHTML = `
            ${style.outerHTML}
            ${wrapper.outerHTML}
            <slot name="chat-input"></slot>
        `;
    }
}