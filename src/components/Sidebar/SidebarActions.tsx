"use client"
import {IconButton} from "@/components/UI/IconButton";
import {HiBars3, HiChatBubbleLeftEllipsis, HiChatBubbleLeftRight} from "react-icons/hi2";
import {useState} from "react";

export const SidebarActions = () =>{
    const [ openGroupModal, setOpenGroupModal ] = useState(false)
    const [ openChatModal, setOpenChatModal ] = useState(false)
    const [ isOpen, setIsOpen ] = useState(false)
    return(
        <div className={`bg-gray-900 text-white ${isOpen ? 'w-64' : 'w-16'} transition-all duration-300`}>
            <div className="flex flex-col items-center py-4 space-y-4">
                <IconButton icon={<HiBars3/>} onClick={() => setIsOpen(!isOpen)}/>
                <IconButton icon={<HiChatBubbleLeftEllipsis/>} onClick={() => setOpenChatModal(true)}/>
                <IconButton icon={<HiChatBubbleLeftRight/>} onClick={() => setOpenGroupModal(true)}/>
                <IconButton icon={<HiChatBubbleLeftRight/>} onClick={() => setOpenGroupModal(true)}/>

                <img id="avatarButton"
                     data-dropdown-toggle="userDropdown"
                     data-dropdown-placement="bottom-start"
                     className="w-10 h-10 rounded-full cursor-pointer"
                     src="/docs/images/people/profile-picture-5.jpg"
                     alt="User dropdown"
                />

                {isOpen && (
                    <div className="mt-8 w-full">
                        {/* Aqui vem o usuário logado */}
                    </div>
                )}

                {/*<CreateChatModal open={openChatModal} onClose={() => setOpenChatModal(false)}/>*/}
                {/*<CreateGroupModal open={openGroupModal} onClose={() => setOpenGroupModal(false)}/>*/}
            </div>
        </div>
    )
}