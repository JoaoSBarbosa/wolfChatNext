import {ChatRequestType} from "@/types/chat/ChatRequestType";
import {UserChatType} from "@/types/user/UserChatType";
import {useState} from "react";
import {HiPaperAirplane} from "react-icons/hi2";
import {ApiConnect} from "@/services/ApiConnection";
import {useAuth} from "@/hooks/useAuth";
import {showToast} from "@/components/ToastMensage/ToastMessage";
import {AxiosResponse} from "axios";

interface IChatInput {
    chat: ChatRequestType | null;
    userProps: UserChatType | null;
}

export const ChatInput = ({chat, userProps}: IChatInput) => {

    const [showLOading, setShowLoading] = useState(false)
    const {user, setSelectedChat} = useAuth();
    const [message, setMessage] = useState<string>("")
    const handleSendMessage = async () => {
        if (chat) {
            await sendMessage();
        } else if (userProps) {
            await handleCreationChat().then((data) => {
                if (data !== undefined) setSelectedChat(data)
            })
        }
    }

    async function handleCreationChat() {

        if (!user?.id) {
            showToast({
                type: "warning",
                message: "O ID do usuário logado não foi encontrado"
            })
            return
        }
        setShowLoading(true)
        let returnData = null as ChatRequestType | null;
        try {
            const chatName = `${userProps?.first_name} ${userProps?.last_name}`;

            const axiosResponse: AxiosResponse<ChatRequestType> = await ApiConnect(window.location.href).post(
                "/chats/with_message",
                {
                    chatName,
                    description: "",
                    userIds: [user?.id, userProps?.user_id],
                    adminId: user?.id,
                    isGroup: false,
                    messages: [
                        {
                            content: message,
                            timestamp: new Date().toISOString(),
                            userId: user.id,
                        }
                    ]
                },
                {
                    headers: {
                        "Authorization": `Bearer ${user?.token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            showToast({
                type: "success",
                message: "Chat criado com sucesso"
            });

            returnData = axiosResponse?.data;

        } catch (err) {
            showToast({
                type: "error",
                message: "Erro ao tentar criar o chat [" + err + "]"
            });
        } finally {
            setShowLoading(false)
        }
        return returnData;
    }

    async function sendMessage() {

        try {
            await ApiConnect(window.location.href).post("/message", {
                content: message,
                userId: user?.id,
                chatId: chat?.chatId
            }, {
                headers: {
                    "Authorization": `Bearer ${user?.token}`,
                    "Content-Type": "application/json" // garantir isso é opcional
                }
            })

            showToast({
                type: "success",
                message: "Mensagem enviada com sucesso"
            })
        } catch (error) {
            showToast({
                type: "error",
                message: "Erro ao enviar a mensagem: " + error
            })
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
                <HiPaperAirplane onClick={handleSendMessage} color={"#000"} size={32} className={"cursor-pointer"}/>
            </div>
        </div>
    )
}