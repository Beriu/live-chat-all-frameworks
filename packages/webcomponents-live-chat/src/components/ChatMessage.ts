import { Emoji } from "repo-types";
import CustomElement from "../lib/CustomElement";
import StringToBoolean from "../lib/StringToBoolean";

export default class ChatMessage extends CustomElement {

    protected propsConfig = {
        message: {
            type: String,
            default: () => ''
        },
        tier: {
            type: Number,
            default: () => 0
        },
        username: {
            type: String,
            default: () => 'John Doe'
        },
        cbm: {
            type: StringToBoolean,
            default: () => false
        }
    };

    
    static get observedAttributes() {
        return ["message", "tier", "username", "cbm"];
    }

    constructor() {
        super();
    }

    static bgColor(tier: number) {
        const tierColors = ["purple", "blue", "pink", "green", "orange"];
        return tierColors[tier] ?? "grey";
    };

    static appendEmojis = (msg: string) => {
        Object.keys(Emoji).forEach(key => msg = msg.replaceAll(key, Emoji[key]));
        return msg;
    };

    render() {

        const style = document.createElement('style');
        const bg = this.props.cbm 
            ? "black"
            : ChatMessage.bgColor(this.props.tier)

        style.innerHTML = `
            .username {
                padding: 2.5px 5px;
                border-radius: 5px;
                color: white;
                background-color: ${ bg }
            }
        `;

        return this.shadowRoot!.innerHTML = `
            ${style.outerHTML}
            <span class="username">${ this.props.username }</span>
            <span>${ ChatMessage.appendEmojis(this.props.message) }</span>
        `;
    }
}