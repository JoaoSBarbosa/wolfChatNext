"use client"
import {ChatListItem} from "@/components/ChatList/ChatListItem";
import {useEffect, useState} from "react";
import {ApiConnect} from "@/services/ApiConnection";
import {showToast} from "@/components/ToastMensage/ToastMessage";
import {UserChatType} from "@/types/user/UserChatType";
import {AxiosResponse} from "axios";
import {getTokenSession} from "@/storage/AuthSTorage";
import {useAuth} from "@/hooks/useAuth";
import {UserJwtType} from "@/types/auth/UserJwtType";

export const ChatList = () => {

    const { user } = useAuth();
    const [ selectedChat, setSelectedChat ] = useState<UserChatType | null>(null)
    const [ users, setUsers ] = useState<UserChatType[]>([]);
    useEffect(() => {
        if(user && user.token){
            getAllUser(user.token).then(setUsers);
        }
    }, [user]);


    async function getAllUser(token: string) {

        let responseData = [] as UserChatType[];
        try {
            if (!token) {
                showToast({
                    type: "error",
                    message: "Usuário não autenticado! Token não encontrado."
                });
                return responseData;
            }
            console.log("Token enviado:", token);

            let responseAxios:AxiosResponse<UserChatType[]> = await ApiConnect(window.location.href).get("/barbosa_chat/users/chat/init",{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("DADOS: ", responseAxios.data)
            responseData = responseAxios.data;
        } catch (error) {
            showToast({
                type: "error",
                message: "Oocrreu um erro ao tentar obter os usarios"
            })
        }
        return responseData;
    }

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
    return (
        <div className={"h-full flex flex-col gap-4 bg-gray-800 text-white p-1 w-[500px]"}>
            {chatList?.map((chat) => (
                <ChatListItem
                    onSelected={(data)=>setSelectedChat(data)}
                    key={chat?.id}
                    alt={chat?.alt}
                    src={chat?.photo}
                    lastMessage={chat.lastMessage}
                    title={chat.title} countMessage={chat.quantityMessage}/>
            ))}

        </div>
    )
}