"use client"
import {createContext, ReactNode, useEffect, useState} from "react";
import {UserJwtType} from "@/types/auth/UserJwtType";
import {useRouter} from "next/navigation";
import {getUserLoginSession, logoutUser, saveTokenSession} from "@/storage/AuthSTorage";
import {userTokenType} from "@/types/auth/userTokenType";
import {showToast, ToastPosition} from "@/components/ToastMensage/ToastMessage";
import {ChatRequestType} from "@/types/chat/ChatRequestType";
import {UserChatType} from "@/types/user/UserChatType";
import {ApiConnect} from "@/services/ApiConnection";
import {AxiosResponse} from "axios";
import {AxiosType} from "@/types/axios/AxiosType";

export type ChatContextProps = {
    user: UserJwtType | null;
    isAuthentication: boolean;
    login: (userData: userTokenType) => void;
    logout: () => void;

    getChatById: (id: number) => void

    selectedChat: ChatRequestType | null;
    setSelectedChat: (chat: ChatRequestType | null) => void;

    selectedUser: UserChatType | null;
    setSelectedUser: (user: UserChatType | null) => void;

    chatList: ChatRequestType[];
    setChatList: (chatList: ChatRequestType[])=> void;
    users: UserChatType[];
    setUsers: (users: UserChatType[]) => void
}
export const ChatContext = createContext<ChatContextProps | null>(null);

interface IAuthContextProvider {
    children: ReactNode
}

export const AuthContextProvider = ({children}: IAuthContextProvider) => {

    const [user, setUser] = useState<UserJwtType | null>(null);
    const [selectedUser, setSelectedUser] = useState<UserChatType | null>(null)
    const [selectedChat, setSelectedChat] = useState<ChatRequestType | null>(null);
    const [ chatList, setChatList ]= useState<ChatRequestType[]>([]);
    const [ users, setUsers ] = useState<UserChatType[]>([]);

    const router = useRouter();


    useEffect(() => {
        const userSession = getUserLoginSession();
        if (userSession) setUser(userSession);

    }, []);

    const login = (userData: userTokenType) => {
        saveTokenSession(userData);
        const userSession = getUserLoginSession();
        if (userSession) setUser(userSession);
        showToast({
            message: `Bem-vindo, ${userSession?.firstName}!`,
            theme: "dark",
            type: "success",
            position: ToastPosition.TOP_RIGHT,
            autoClose: 3000
        });

        router.push("/chat");
    }

    const logout = () => {
        logoutUser();
        setUser(null);
        router.push("/");
    }

    async function getChatById(id: number) {
        if (!id) {
            showToast(
                {
                    type: "warning",
                    message: "O ID do chat esta ausente"
                }
            )
            return;
        }

        try {
            const axiosResponse = await ApiConnect(window.location.href).get(`/chats/${id}`, {
                    timeout: 5 * 60 * 1000,
                    headers: {
                        "Authorization": `Bearer ${user?.token}`,
                        "Content-Type": "application/json"
                    }
                }
            )

            setSelectedChat(axiosResponse?.data)
        } catch (err) {
            showToast(
                {
                    type: "error",
                    message: "Erro ao buscar chat por id: " + err
                }
            )
        }
    }

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

        let responseData = [] as UserChatType[];
        try {
            if (!token) {
                showToast({
                    type: "error",
                    message: "Usuário não autenticado! Token não encontrado."
                });
                return responseData;
            }
            let responseAxios:AxiosResponse<UserChatType[]> = await ApiConnect(window.location.href).get("/users/chat/init",{
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json" // garantir isso é opcional
                }
            });
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
    return (
        <ChatContext.Provider value={{
            user,
            getChatById,
            isAuthentication: !!user,
            logout, login,
            selectedChat, setSelectedChat,
            selectedUser, setSelectedUser,
            setChatList,chatList,
            users, setUsers
        }}>
            {children}
        </ChatContext.Provider>
    )
}