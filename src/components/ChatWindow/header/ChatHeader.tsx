import {UserChatType} from "@/types/user/UserChatType";
import {ChatRequestType} from "@/types/chat/ChatRequestType";

interface IChatHeader {
    user?: UserChatType,
}
export const ChatHeader = ({ user}:IChatHeader) =>{
    return(
        <header className={"w-full h-40 bg-gray-300 p-1"}>

        </header>
    )
}