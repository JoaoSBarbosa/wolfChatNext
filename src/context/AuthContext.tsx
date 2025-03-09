"use client"
import {createContext, ReactNode, useEffect, useState} from "react";
import {UserJwtType} from "@/types/auth/UserJwtType";
import {useRouter} from "next/navigation";
import {getUserLoginSession, logoutUser, saveTokenSession} from "@/storage/AuthSTorage";
import {userTokenType} from "@/types/auth/userTokenType";
import {showToast, ToastPosition} from "@/components/ToastMensage/ToastMessage";

export type AuthContextProps = {
    user: UserJwtType | null;
    isAuthentication: boolean;
    login: (userData: userTokenType) => void;
    logout: () => void
}
export const AuthContext = createContext<AuthContextProps | null>(null);

interface IAuthContextProvider {
    children: ReactNode
}

export const AuthContextProvider = ({children}: IAuthContextProvider) => {

    const [ user, setUser ] = useState<UserJwtType | null>(null);
    const router = useRouter();


    useEffect(() => {
        const userSession = getUserLoginSession();
        if(userSession) setUser(userSession);

    }, []);

    const login = ( userData: userTokenType) =>{
        saveTokenSession(userData);
        const userSession = getUserLoginSession();
        if(userSession) setUser(userSession);

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
        <AuthContext.Provider value={{user, isAuthentication: !!user, logout, login}}>
            {children}
        </AuthContext.Provider>
    )
}