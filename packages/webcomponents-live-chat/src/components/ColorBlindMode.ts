import CustomElement from "../lib/CustomElement";

export default class ColorBlindMode extends CustomElement {

    protected propsConfig = {};

    constructor() {
        super();
    }

    private createCheckbox(checked: boolean = false) {
        const id = "checkbox-el"
        
        const label = document.createElement('label');
        label.setAttribute('for', id);
        label.innerHTML = "Color blind mode"
        
        const checkbox = document.createElement('input');
        checkbox.id = id;
        checkbox.type = "checkbox"
        checkbox.checked = checked;
        checkbox.onchange = () => this.dispatchEvent(
            new CustomEvent(
                'colorBlindMode:change', 
                { bubbles: true, detail: { checked: () => checkbox.checked }}
            )
        );

        const form = document.createElement('form');
        form.onsubmit = (e) => e.preventDefault();

        form.appendChild(checkbox);
        form.appendChild(label);
        
        return form;
    }

    render() {
        return this.shadowRoot!.appendChild(
            this.createCheckbox()
        );
    }
}