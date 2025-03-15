import {ChatRequestType} from "@/types/chat/ChatRequestType";
import {UserChatType} from "@/types/user/UserChatType";
import {useState} from "react";
import {HiPaperAirplane} from "react-icons/hi2";

interface IChatInput {
    chat: ChatRequestType | null;
    user: UserChatType | null;
}

export const ChatInput = ({chat, user}: IChatInput) => {

    const [message, setMessage] = useState<string>("")
    const handleSendMessage = () => {
        if (chat) {
            // envia a mensagem
        } else if (user) {
            // cria um chat
        }
    }

    async function handleCreationChat() {

        try {

        }catch (err){

        }
    }

    return (
        <div className={"bg-white flex rounded"}>
            <textarea
                cols={50}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 px-2 py-4 rounded-l text-black resize-none focus:outline-none"
            />
            <div className={"flex items-end p-2"}>
                <HiPaperAirplane onClick={handleSendMessage} color={"#000"} size={32}/>
            </div>
        </div>
    )
}