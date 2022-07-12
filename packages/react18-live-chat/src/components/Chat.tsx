import { FunctionComponent } from "react";
import { ChatMessage as ChatMessageType } from "repo-types";
import ChatMessage from "./ChatMessage";
import React from "react";
import ChatInput from "./ChatInput";
import "./ChatInput.css";

interface Props {
    isColorBlind: boolean;
    messages: ChatMessageType[];
    messageHandler: (msg: string) => void;
}

const Chat: FunctionComponent<Props> = ({ isColorBlind, messageHandler, messages }) => {

    const style: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        padding: "1rem 0 1rem 1rem",
        gap: ".5rem",
        overflowY: "scroll",
        width: "600px",
        height: "400px"
    };

    const isLastElement = (index: number) => index === messages.length - 1;

    return (
        <>
            <div style={style}>
                {
                    messages.map((m, index) => <ChatMessage
                        key={m.id}
                        isColorBlind={isColorBlind}
                        message={m}
                        scrollIntoView={isLastElement(index)} />)
                }
            </div>
            <div style={{ padding: "0 0 0 1rem" }}>
                <ChatInput
                    messageHandler={messageHandler}
                    placeholder="Send your regards" />
            </div>
        </>
    );
}

export default Chat;
