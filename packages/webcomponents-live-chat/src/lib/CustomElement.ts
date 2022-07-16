import { deserializeData } from "./dataTransformers";
import StringToBoolean from "./StringToBoolean";

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
        this.attachShadow({mode: 'open'});
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

                if(!value && 'default' in this.propsConfig[propKey]) {
                    const defaultValue = this.propsConfig[propKey].default as () => any;
                    return defaultValue();
                }

                return [String, Number, StringToBoolean].includes(this.propsConfig[propKey].type)
                    ? this.propsConfig[propKey].type(deserializeData(value as any))
                    : deserializeData(value as any);
            }
        });
    }
    
    connectedCallback(): void {
        this.render();
    }

    disconnectedCallback(): void {
        console.info(`${this.constructor.name} disconnected.`);
    }

    adoptedCallback(): void {
        console.info(`${this.constructor.name} adopted.`);
    }

    attributeChangedCallback(propKey: string, oldValue: any, newValue: any) {
        if(oldValue === newValue) return;
        this.render(propKey, newValue);
    }

    render(...args: any[]) {
        throw new Error("No render function is implemented.");
    }
}