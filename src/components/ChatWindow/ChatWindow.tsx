"use client"
import {useAuth} from "@/hooks/useAuth";
import {ChatHeader} from "@/components/ChatWindow/header/ChatHeader";
import {useEffect, useState} from "react";
import {UserChatType} from "@/types/user/UserChatType";
import {ChatMessages} from "@/components/ChatWindow/ChatMessages";
import {ChatInput} from "@/components/ChatWindow/ChatInput";

export const ChatWindow = () => {

    const {selectedChat, selectedUser} = useAuth();
    const [user, setUsers] = useState<UserChatType | null>(null)

    const section_container = "flex flex-col h-full max-h-full bg-gray-500 text-white w-full "
    if (!selectedUser && !selectedChat) {
        return (
            <section className={`${section_container} flex items-center justify-center`}>
            <p>Selecione um chat ou contato para começar</p>
            </section>
        )
    }
    return (
        <section className={`${section_container}`}>
            <ChatHeader userProps={selectedUser} chat={selectedChat}/>
            <ChatMessages chat={selectedChat} chatUser={selectedUser}/>
            <ChatInput chat={selectedChat} userProps={selectedUser}/>
        </section>
    )
}