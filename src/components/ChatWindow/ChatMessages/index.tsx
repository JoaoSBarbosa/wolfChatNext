import {ChatRequestType} from "@/types/chat/ChatRequestType";
import {UserChatType} from "@/types/user/UserChatType";
import {useAuth} from "@/hooks/useAuth";
import {MessageType} from "@/types/message/MessageType";
import {formatDateBR} from "@/utils/formatterUtils";

interface IChatMessages {
    chat: ChatRequestType | null;
    chatUser: UserChatType | null;
}

export const ChatMessages = ({chat, chatUser}: IChatMessages) => {
    const {user} = useAuth();

    const container_styles = "flex flex-col space-y-2 p-4 h-full";
    const showTimestamp = (isOwnMessage: boolean, message:  MessageType)=>{
        let msg = isOwnMessage ? "Você" : message?.sender?.firstName;
        let data = formatDateBR(message?.timestamp)
        return `${msg} às ${data}`
    }
    if (chat) {
        return (
            <div className={`${container_styles}`}>

                {chat?.messages?.length === 0 &&
                    (
                        <p className="text-center text-gray-400">Nenhuma mensagem ainda.</p>

                    )}

                {
                    chat?.messages?.map((msg) => {
                        const isOwnMessage = msg.sender?.userId === user?.id;
                        return (
                          <div key={msg.msgId}
                              className={`rounded p-2 self-start ${isOwnMessage ? "self-end" : "self-start"}`}>

                              <p
                                  // key={msg.msgId}
                                  className={` rounded p-2 self-start
                                ${isOwnMessage ? "bg-blue-500 text-white self-end" : "bg-green-500 text-black self-start"}
                                `}>
                                  {msg.content}
                              </p>
                              <span className={"italic text-[12px]"}>{showTimestamp(isOwnMessage, msg)}</span>
                          </div>

                        )
                    })
                }
            </div>
        )
    }

    if (chatUser) {
        return (
            <div className={`${container_styles}`}>
                <p className="text-center text-gray-400">Novo chat com {chatUser.first_name}. Envie a primeira
                    mensagem!</p>
            </div>
        )
    }
    return null;
}