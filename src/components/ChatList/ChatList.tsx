"use client"
import {ChatListItem} from "@/components/ChatList/ChatListItem";

export const ChatList = () =>{

    const chatList = [
        {
            id: 1,
            photo: "/img/user.jpg",
            alt: "imagem do lucas",
            title: "Lucas",
            lastMessage: "E ai mano, beleza ?",
            quantityMessage: 5,

        },
        {
            id: 2,
            photo: "/img/user.jpg",
            title: "Marcos",
            alt: "imagem do marcos",
            quantityMessage: 3,
            lastMessage: "Não pude comparecer",

        }
    ]
    return(
        <div className={"h-full flex flex-col gap-4 bg-gray-800 text-white p-1 w-[500px]"}>
            { chatList?.map((chat)=>(
                <ChatListItem key={chat?.id} alt={chat?.alt} src={chat?.photo} lastMessage={chat.lastMessage} title={ chat.title} countMessage={chat.quantityMessage}/>
            ))}

        </div>
    )
}