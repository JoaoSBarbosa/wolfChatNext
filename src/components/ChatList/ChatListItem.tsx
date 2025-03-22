import { UserChatType } from "@/types/user/UserChatType";

interface IChatListItem {
    src: string,
    alt: string,
    title: string
    lastMessage: string;
    countMessage: number;
    onSelectedChat: ()=> void;
    onSelected?: (row: UserChatType)=> void
}

export const ChatListItem = ({alt, src, lastMessage, countMessage = 10, title, onSelected, onSelectedChat}: IChatListItem) => {

    const teste = () =>{
        console.log("Clicou");
    }
    
    return (
        <div className={"flex items-center gap-2 rounded-md  p-2 cursor-pointer shadow-2xl hover:bg-gray-700"} onClick={onSelectedChat}>
            <div>
                <img src={src} alt={alt} className={"h-10 w-10 rounded-full"}/>
            </div>
            <div className={"flex flex-col gap-1 w-full"}>

                <h2>{title}</h2>
                <div className={"flex items-center gap-1 w-full justify-between "}>

                    <p>{lastMessage}</p>
                    <span className={"bg-blue-500 p-1 rounded-full h-8 w-8 text-center"}> {countMessage}</span>
                </div>

            </div>
        </div>
    )
}