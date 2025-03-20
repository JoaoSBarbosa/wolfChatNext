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
import {ChatRequestType} from "@/types/chat/ChatRequestType";
import {AxiosType} from "@/types/axios/AxiosType";

export const ChatList = () => {

    const { user } = useAuth();
    const [ selectedChat, setSelectedChat ] = useState<UserChatType | null>(null)
    const [ users, setUsers ] = useState<UserChatType[]>([]);
    const [ chatList, setChatList ]= useState<ChatRequestType[]>([]);
    useEffect(() => {
        if(user && user.token){
            getAllUser(user.token).then(setUsers);
            getAllChat(user.token).then(setChatList)
        }
    }, [user]);


    async function getAllChat(token: string){
        verifyToken(token);
        let responseData = [] as ChatRequestType[];

        try {
            let responseAxios: AxiosResponse<AxiosType<ChatRequestType>> = await ApiConnect(window.location.href).get("/chats",{
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            responseData = responseAxios?.data?.content;

        }catch (error){
            responseData = [];
            showToast({
                type: "warning",
                message: "Erro ao buscar dados de chat: "+error
            })
        }
        return responseData;
    }
    async function getAllUser(token: string) {
        console.log("Token enviado para API:", token);

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

            let responseAxios:AxiosResponse<UserChatType[]> = await ApiConnect(window.location.href).get("/users/chat/init",{
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json" // garantir isso é opcional
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

    const verifyToken = (token: string) =>{
        if (!token) {
            showToast({
                type: "error",
                message: "Usuário não autenticado! Token não encontrado."
            });
            return [];
        }
    }
    // const chatList = [
    //     {
    //         id: 1,
    //         photo: "/img/user.jpg",
    //         alt: "imagem do lucas",
    //         title: "Lucas",
    //         lastMessage: "E ai mano, beleza ?",
    //         quantityMessage: 5,
    //
    //     },
    //     {
    //         id: 2,
    //         photo: "/img/user.jpg",
    //         title: "Marcos",
    //         alt: "imagem do marcos",
    //         quantityMessage: 3,
    //         lastMessage: "Não pude comparecer",
    //
    //     }
    // ]
    return (
        <div className={"h-full flex flex-col gap-4 bg-gray-800 text-white p-1 w-[500px]"}>
            {
                chatList?.map((chat)=>{
                    const isGoup = chat?.isGroup;

                    const chatTitle = isGoup ? chat?.chatName : chat?.chatUsers.find(u => u?.userId !== user?.id)?.firstName || "usuario";
                    const chatImage = isGoup ? "https://cdn.pixabay.com/photo/2023/06/26/21/22/shack-8090832_1280.jpg" : chat?.chatUsers.find(u=> u?.userId !== user?.id)?.imageUri || "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?t=st=1742429503~exp=1742433103~hmac=f455021ac537f0366bdd06aa046f236ea399a43ee3351425eaeb48481699d8a8&w=740";
                    const lastMessage = chat?.messages?.length > 0
                        ? chat.messages[chat.messages.length - 1].content
                        : "Nenhuma mensagem ainda";

                    const countMessage = chat.messages.length;

                    return(
                        <ChatListItem
                            onSelected={(data) => setSelectedChat(data)}
                            key={chat?.chatId}
                            alt={`Foto de ${chatTitle}`}
                            src={chatImage}
                            lastMessage={lastMessage}
                            title={chatTitle}
                            countMessage={countMessage}
                        />
                    )
                })
            }

        </div>
    )
}