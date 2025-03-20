import {UserChatType} from "@/types/user/UserChatType";
import {MessageType} from "@/types/message/MessageType";
import {ChatUserType} from "@/types/user/ChatUserType";

export type ChatRequestType = {
    chatId: number;
    isGroup: boolean;
    chatName: string;
    description: string;
    createdAt: string;
    createdBy: number;
    chatUsers: ChatUserType[];
    messages: MessageType[]

}