import { FunctionComponent, useEffect, useRef } from "react";
import { ChatMessage as ChatMessageType, Emoji } from "repo-types";
import Username from "./Username";

interface Props {
    scrollIntoView: boolean;
    isColorBlind: boolean;
    message: ChatMessageType;
}

const ChatMessage: FunctionComponent<Props> = ({ isColorBlind, message, scrollIntoView }) => {
    
    const elementRef = useRef<HTMLElement | null>(null);

    const appendEmojis = (msg: string) => {
        Object.keys(Emoji).forEach(key => msg = msg.replaceAll(key, Emoji[key]));
        return msg;
    };

    useEffect(() => {
        if(elementRef.current && scrollIntoView) {
            elementRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [elementRef, scrollIntoView]);

    return (
        <span ref={elementRef}>
            <Username
                isColorBlind={isColorBlind}
                username={message.user.username}
                tier={message.user.tier} 
            />
            <span> : </span>
            <span>{ appendEmojis(message.payload) }</span>
        </span>
    );
};

export default ChatMessage;