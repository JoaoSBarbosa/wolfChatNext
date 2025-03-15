"use client"
import {createContext, ReactNode, useEffect, useState} from "react";
import {UserJwtType} from "@/types/auth/UserJwtType";
import {useRouter} from "next/navigation";
import {getUserLoginSession, logoutUser, saveTokenSession} from "@/storage/AuthSTorage";
import {userTokenType} from "@/types/auth/userTokenType";
import {showToast, ToastPosition} from "@/components/ToastMensage/ToastMessage";
import {ChatRequestType} from "@/types/chat/ChatRequestType";
import {UserChatType} from "@/types/user/UserChatType";

export type ChatContextProps = {
    user: UserJwtType | null;
    isAuthentication: boolean;
    login: (userData: userTokenType) => void;
    logout: () => void;

    selectedChat: ChatRequestType | null;
    setSelectedChat: (chat: ChatRequestType | null) => void;

    selectedUser: UserChatType | null;
    setSelectedUser: (user: UserChatType | null) => void;
}
export const ChatContext = createContext<ChatContextProps | null>(null);

interface IAuthContextProvider {
    children: ReactNode
}

export const AuthContextProvider = ({children}: IAuthContextProvider) => {

    const [ user, setUser ] = useState<UserJwtType | null>(null);
    const [ selectedUser, setSelectedUser ] = useState<UserChatType | null>(null)
    const [ selectedChat, setSelectedChat ] = useState<ChatRequestType | null>(null)
    const router = useRouter();


    useEffect(() => {
        const userSession = getUserLoginSession();
        if(userSession) setUser(userSession);

    }, []);

    const login = ( userData: userTokenType) =>{
        saveTokenSession(userData);
        console.log("DADOS A SEREM SALVOS EM STORAGE: ", userData)
        const userSession = getUserLoginSession();
        if( userSession ) setUser(userSession);
        console.log("DADOS A SEREM SALVOS EM CONTEXT: ", userSession)

        showToast({
            message: `Bem-vindo, ${userSession?.firstName}!`,
            theme: "dark",
            type: "success",
            position: ToastPosition.TOP_RIGHT,
            autoClose: 3000
        });

        router.push("/chat");
    }

    const logout = () =>{
        logoutUser();
        setUser(null);
        router.push("/");
    }

    return (
        <ChatContext.Provider value={{
            user,
            isAuthentication: !!user,
            logout, login,
            selectedChat, setSelectedChat,
            selectedUser, setSelectedUser
        }}>
            {children}
        </ChatContext.Provider>
    )
}