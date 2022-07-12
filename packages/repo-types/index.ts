export interface User {
    id: string;
    username: string;
    email: string;
    tier: number;
}

export interface ChatMessage {
    id: string;
    user: User;
    payload: string;
    timestamp: number;
}

export interface ServerToClientEvents {
    userConnected: () => void;
    chatMessage: (msg: ChatMessage) => void;
}
  
export interface ClientToServerEvents {
    sendMessage: (msg: string) => void;
}
  
export interface InterServerEvents {}
  
export interface SocketData {}

export const Emoji: Record<string, string> = {
    '[*topkek*]': "🤣",
    '[*lul*]':    "😂",
    '[*zeama*]':  "😎"
}