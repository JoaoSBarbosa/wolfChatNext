// components/ChatList/CreateChatModal.tsx
"use client";

import {UserChatType} from "@/types/user/UserChatType";
import {SystemModal} from "@/components/Modals/SystemModal";
import {useEffect, useState} from "react";
import {GetUsers} from "@/api/GetUsers";
import {useAuth} from "@/hooks/useAuth";

type CreateChatModalProps = {
    open: boolean;
    onClose: () => void;
};

export const CreateChatModal = ({open, onClose}: CreateChatModalProps) => {
    const {user, setSelectedUser, setSelectedChat, chatList } = useAuth();
    const [users, setUsers] = useState<UserChatType[]>([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            if (user && user.token) {
                setLoading(true);
                const data = await GetUsers(user.token);
                setUsers(data);
                setLoading(false)
            }
        }
        if (open) {
            fetchUsers();
        }
    }, [open, user]);

    const handleClick = () =>{

    }

    const existingChat = () =>{
        return chatList?.find(chat=> chat?.chatUsers?.some(participant => participant?.userId === user?.id))
    }
    return (
        <SystemModal open={open} onClose={onClose}>
            <h2 className="text-xl font-semibold mb-4">Iniciar novo chat</h2>
            {loading ? (
                <p className="text-gray-600">Carregando usuários...</p>

            ) : (
                <ul className="space-y-2">
                    {users.length > 0 ? (
                        users.map((user) => (
                            <li
                                key={user.user_id}
                                // onClick={() => {
                                //     setSelectedUser(user);
                                //     setSelectedChat(null);
                                //     onClose();
                                // }}
                                onClick={() => {
                                    const existingChat = chatList.find(chat =>
                                        chat.chatUsers.some(participant => participant.userId === user.user_id)
                                    );

                                    if (existingChat) {
                                        setSelectedChat(existingChat); // Se já houver chat, abre ele
                                    } else {
                                        setSelectedUser(user); // Se não houver, define o usuário para criar um novo chat
                                        setSelectedChat(null);
                                    }
                                    onClose();
                                }}

                                className="flex items-center p-2 rounded hover:bg-gray-100 cursor-pointer"
                            >
                                <img
                                    src={user.image_uri || "/img/users.jpg"}
                                    alt={`Imagem de ${user.first_name}`}
                                    className="w-8 h-8 rounded-full mr-3"
                                />
                                <span className="text-gray-800">{user.first_name}</span>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-600">Nenhum usuário encontrado.</p>
                    )}
                </ul>

            )}
        </SystemModal>
    );
};
