export type ChatRequestType = {
    chatId: number;
    isGroup: boolean;
    chatName: string;
    description: string;
    createdAt: string;
    createdBy: number;
    chatUsers: ChatRequestType[]

}