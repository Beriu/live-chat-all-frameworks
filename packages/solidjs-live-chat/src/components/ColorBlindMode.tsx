import { Component, createSignal } from "solid-js";

interface Props {
    isColorBlind: boolean;
    setIsColorBlind: (v: boolean) => void
}

const ColorBlindMode: Component<Props> = (props) => {

    const updateColorBlindMode = (e: any) => props.setIsColorBlind(e.target.checked);

    return (
        <form>
            <input 
                class="mr-2 scale-125" 
                id="color-blind-mode" 
                type="checkbox" 
                checked={props.isColorBlind} 
                onChange={updateColorBlindMode}/>
            <label for="color-blind-mode">Color blind mode</label>
        </form>
    );
};

export default ColorBlindMode;