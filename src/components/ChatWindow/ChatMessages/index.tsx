import {ChatRequestType} from "@/types/chat/ChatRequestType";
import {UserChatType} from "@/types/user/UserChatType";

interface IChatMessages {
    chat: ChatRequestType | null;
    user: UserChatType | null;
}

export const ChatMessages = ({chat, user}: IChatMessages) => {

    const container_styles = "flex flex-col space-y-2 p-4 h-full";
    if (chat) {
        return (
            <div className={`${container_styles}`}>
                <p className={"bg-white text-black rounded p-2 self-start"}>Mensagem do outro</p>
                <p className={"bg-blue-500 text-white rounded p-2 self-end"}>Minha mensagem</p>
            </div>
        )
    }

    if (user) {
        return (
            <div className={`${container_styles}`}>
                <p className="text-center text-gray-400">Novo chat com {user.first_name}. Envie a primeira mensagem!</p>
            </div>
        )
    }
    return null;
}