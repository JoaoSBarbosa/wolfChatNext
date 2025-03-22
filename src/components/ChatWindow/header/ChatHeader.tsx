import {UserChatType} from "@/types/user/UserChatType";
import {ChatRequestType} from "@/types/chat/ChatRequestType";
import { useAuth } from "@/hooks/useAuth";

interface IChatHeader {
    chat: ChatRequestType | null;
    userProps: UserChatType | null;
}
export const ChatHeader = ({ userProps, chat }: IChatHeader) => {
    const { user } = useAuth();
  
    const GRUPO_LOGO =
      "https://img.freepik.com/vetores-gratis/modelo-de-design-de-logotipo-de-comunicacao_23-2149909711.jpg?t=st=1742049778~exp=1742053378~hmac=c3edf4cee6f38182318f24e09e442f4ebcd6bd2c1236bcd762d39877f8addd47&w=740";
  
    const isGroup = chat?.isGroup;
  
    // Safe fallback: só tenta acessar chatUsers se existir e user estiver definido
    const otherUser = !isGroup && user && chat?.chatUsers
      ? chat.chatUsers.find((u) => u.userId !== user.id)
      : null;
  
    const image = isGroup
      ? GRUPO_LOGO
      : otherUser?.imageUri || userProps?.image_uri || "/img/user.jpg";
  
    const name = isGroup
      ? chat?.chatName || "Grupo"
      : otherUser?.firstName || userProps?.first_name || "Usuário";
  
    const description = isGroup
      ? chat?.description || "Grupo sem descrição"
      : "Última vez online há 10 min";
  
    return (
      <header className="flex items-center w-full h-20 bg-gray-300 p-1">
        <div>
          <img
            src={image}
            alt="Foto"
            className="w-12 h-12 rounded-full mr-3"
          />
        </div>
  
        <div>
          <h3 className="font-semibold text-lg text-black">{name}</h3>
          <p className="text-sm text-gray-700">{description}</p>
        </div>
      </header>
    );
  };
  