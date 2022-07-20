import { Component, onMount, Ref } from 'solid-js';
import { ChatMessage as ChatMessageType, Emoji } from 'repo-types/index';
import Username from './Username';

interface Props {
    scrollIntoView: boolean;
    message: ChatMessageType;
    isColorBlind: boolean;
}

const ChatMessage: Component<Props> = (props) => {

    const appendEmojis = (msg: string) => {
        Object.keys(Emoji).forEach(key => msg = msg.replaceAll(key, Emoji[key]));
        return msg;
    };

    let messageRef: HTMLSpanElement | undefined;

    onMount(() => {
        if(props.scrollIntoView) {
            messageRef?.scrollIntoView({ behavior: "smooth" });
        }
    });

    return (
        <span ref={messageRef}>
            <Username
                tier={props.message.user.tier}
                username={props.message.user.username}
                isColorBlind={props.isColorBlind} /> :
            { appendEmojis(props.message.payload) }
        </span>
    );
};

export default ChatMessage;