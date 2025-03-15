import {UserChatType} from "@/types/user/UserChatType";
import {ChatRequestType} from "@/types/chat/ChatRequestType";

interface IChatHeader {
    chat: ChatRequestType | null;
    user: UserChatType | null;
}
export const ChatHeader = ({ user, chat}:IChatHeader) =>{


    const GRUPO_LOGO = 'https://img.freepik.com/vetores-gratis/modelo-de-design-de-logotipo-de-comunicacao_23-2149909711.jpg?t=st=1742049778~exp=1742053378~hmac=c3edf4cee6f38182318f24e09e442f4ebcd6bd2c1236bcd762d39877f8addd47&w=740';

    const isGroup = chat?.isGroup;
    const image = isGroup ? GRUPO_LOGO : user?.image_uri || chat?.chatUsers[0]?.image_uri || "/img/user.jpg";
    const name = isGroup ? chat?.chatName : user?.first_name || chat?.chatUsers[0]?.first_name;
    const description = isGroup ? chat?.description : "Última vez online há 10 min";
    return(
        <header className={"flex items-center w-full h-20 bg-gray-300 p-1"}>
            <div>
                <img
                src={image}
                alt={"Foto"}
                className={"w-12 h-12 rounded-full mr-3"}
                />
            </div>

            <div>
                <h3 className="font-semibold text-lg text-black">{name}</h3>
                <p className="text-sm text-gray-700">{description}</p>
            </div>
        </header>
    )
}