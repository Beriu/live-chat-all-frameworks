export interface ICustomElement {
    connectedCallback(): void;
    disconnectedCallback(): void;
    adoptedCallback(): void;
    attributeChangedCallback(propKey: string, oldValue: any, newValue: any): void;
    render(propKey: string, propValue: any): void;
}

interface PropConfig {
    type: any;
    required?: boolean;
    default?: () => any
};

type PropsDeclaration = Record<string, PropConfig>;

type Props = Record<keyof PropsDeclaration, any>;

export default class CustomElement extends HTMLElement implements ICustomElement {
    
    protected propsConfig: PropsDeclaration = {};

    constructor() {
        super();
    }

    get props(): Props {
        return new Proxy(this.propsConfig, {
            get: (target, propKey: string, receiver) => {
                if(!Object.keys(this.propsConfig).includes(propKey)) {
                    throw new Error(`You did not set ${propKey} as a prop.`);
                }
                const value = this.getAttribute(propKey);

                if(!value && this.propsConfig[propKey].required) {
                    throw new Error(`Prop ${propKey} is required.`);
                }

                return value;
            }
        });
    }
    
    connectedCallback(): void {
        throw new Error("Method not implemented.");
    }
    
    disconnectedCallback(): void {
        throw new Error("Method not implemented.");
    }

    adoptedCallback(): void {
        throw new Error("Method not implemented.");
    }

    attributeChangedCallback(propKey: string, oldValue: any, newValue: any) {
        if(oldValue === newValue) return;
        this.render(propKey, newValue);
    }

    render(propKey: string, propValue: any) {
        this.innerHTML = propValue;
    }
}