"use client"
import {useAuth} from "@/hooks/useAuth";
import {ChatHeader} from "@/components/ChatWindow/header/ChatHeader";
import {useEffect, useState} from "react";
import {UserChatType} from "@/types/user/UserChatType";

export const ChatWindow = () =>{

    const { selectedChat, selectedUser } = useAuth();

    const [ user,setUsers]= useState<UserChatType | null>(null)
    // useEffect(() => {
    //     if(selectedUser){
    //         setUsers(selectedUser)
    //     }else if(selectedChat?.chatUsers)
    // }, [selectedChat,selectedUser]);
    return(
        <section className={"h-full bg-gray-500 text-white p-2 w-full"}>
            {/*<ChatHeader user={selectedChat}/>*/}
            <h1> Area do chat</h1>
        </section>
    )
}