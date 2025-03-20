import {UserSend} from "@/types/user/UserSend";

export type MessageType = {
    msgId: number;
    content: string;
    timestamp: string;
    sender: UserSend;

}