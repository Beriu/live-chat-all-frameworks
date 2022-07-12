import { FunctionComponent, useState } from "react";

interface Props {
    messageHandler: (msg: string) => void;
    placeholder: string,
}

const ChatInput: FunctionComponent<Props> = ({ messageHandler, placeholder }) => {

    const [input, setInput] = useState("");

    const sendMessage = () => {
        if(!input) return;
        messageHandler(input);
        setInput("");
    };

    return (
        <form id="chatInput" onSubmit={(e) => e.preventDefault()}>
            <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder={placeholder} />
            <button disabled={!input} onClick={sendMessage}>SEND</button>
        </form>
    );
};

export default ChatInput;