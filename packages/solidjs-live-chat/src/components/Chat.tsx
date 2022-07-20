import { Component, createSignal, createMemo, For, Accessor } from 'solid-js';
import type { ChatMessage as ChatMessageType } from 'repo-types/index';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import ColorBlindMode from './ColorBlindMode';

interface Props {
    chatMessageComponent: typeof ChatMessage,
    chatInputComponent: typeof ChatInput,
    colorBlindModeComponent: typeof ColorBlindMode,
    messageHandler: (msg: string) => void,
    messages: ChatMessageType[],
    isColorBlind: boolean
}

const Chat: Component<Props> = (props) => {
        
    const [isColorBlindMutable, setIsColorBlind] = createSignal(props.isColorBlind);

    const createMessageMemo = (message: ChatMessageType, index: Accessor<number>) => (
        createMemo(() => props.chatMessageComponent(
            { 
                message, 
                isColorBlind: isColorBlindMutable(), 
                scrollIntoView: index() === props.messages.length -1
            }
        ))
    );

    return (
        <div class="flex flex-col gap-4">
            { 
                props.colorBlindModeComponent({ isColorBlind: isColorBlindMutable(), setIsColorBlind }) 
            }
            <div style={{ height: "400px", width: "600px" }} class="flex flex-col overflow-y-scroll">
                <For each={props.messages}>
                    { createMessageMemo }
                </For>
            </div>
            { 
                props.chatInputComponent(
                    { 
                        buttonText: "Send Nudes", 
                        placeholder: "Send a tweet", 
                        messageHandler: props.messageHandler
                    }
                ) 
            }
        </div>
    );
};

export default Chat;