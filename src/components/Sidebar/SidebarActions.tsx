"use client"
import {IconButton} from "@/components/UI/IconButton";
import {HiBars3, HiChatBubbleLeftEllipsis, HiChatBubbleLeftRight} from "react-icons/hi2";
import {useState} from "react";
import {CreateChatModal} from "@/components/CreateChat/CreateChatModal";
import {useAuth} from "@/hooks/useAuth";

export const SidebarActions = () =>{
    const [ openGroupModal, setOpenGroupModal ] = useState(false)
    const [ openChatModal, setOpenChatModal ] = useState(false)
    const [ isOpen, setIsOpen ] = useState(false);
    const { user } = useAuth();
    return(
        <div className={`bg-gray-900 text-white ${isOpen ? 'w-64' : 'w-16'} transition-all duration-300`}>
            <div className="flex flex-col items-center py-4 space-y-4">
                <IconButton icon={<HiBars3 size={32}/>} onClick={() => setIsOpen(!isOpen)}/>
                <img id="avatarButton"
                     data-dropdown-toggle="userDropdown"
                     data-dropdown-placement="bottom-start"
                     className="w-10 h-10 rounded-full cursor-pointer"
                     src={user?.urlImage}
                     alt="User dropdown"
                />
                <IconButton icon={<HiChatBubbleLeftEllipsis size={32}/>} onClick={() => setOpenChatModal(true)}/>


                <CreateChatModal open={openChatModal} onClose={() => setOpenChatModal(false)} />
                {isOpen && (
                    <div className="mt-8 w-full">
                        {/* Aqui vem o usuário logado */}
                    </div>
                )}
            </div>
        </div>
    )
}