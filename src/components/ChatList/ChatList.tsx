"use client"
import { ChatListItem } from "@/components/ChatList/ChatListItem";
import { showToast } from "@/components/ToastMensage/ToastMessage";
import { useAuth } from "@/hooks/useAuth";


export const ChatList = () => {

    const { user, setSelectedChat, chatList, users } = useAuth();

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
                            onSelectedChat={()=>setSelectedChat(chat)}
                            // onSelected={(data) => setSelectedChat(data)}

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