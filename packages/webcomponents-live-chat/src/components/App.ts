import CustomElement from "../lib/CustomElement";

export default class App extends CustomElement {

    protected propsConfig = {
        name: {
            type: String,
            required: true
        }
    };

    
    static get observedAttributes() {
        return ["name"];
    }

    constructor() {
        super();
    }

    connectedCallback(): void {
        this.innerHTML = this.props.name;
    }
}