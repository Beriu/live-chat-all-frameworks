import { Component, createSignal } from 'solid-js';

interface Props {
    placeholder: string;
    buttonText: string;
    messageHandler: (msg: string) => void;
}

const ChatInput: Component<Props> = (props) => {

    const [textInputValue, setTextInputValue] = createSignal("");

    const sendMessage = () => {
        props.messageHandler(textInputValue());
        setTextInputValue("");
    };

    return (
        <form class="flex flex-row" onSubmit={(e) => e.preventDefault()}>
            <input
                class="grow-[3] border-slate-600 border rounded rounded-r-none px-2 py-1"
                onChange={(e) => setTextInputValue(e.target.value)}
                value={textInputValue()} 
                type="text" 
                placeholder={ props.placeholder }/>
            <button class="grow-[1] border-slate-800 border rounded rounded-l-none bg-slate-600 text-white px-2 py-1" onClick={sendMessage}>{ props.buttonText }</button>
        </form>
    );
};

export default ChatInput;