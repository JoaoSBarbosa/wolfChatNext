import {SidebarActions} from "@/components/Sidebar/SidebarActions";
import {ChatList} from "@/components/ChatList/ChatList";
import {ChatWindow} from "@/components/ChatWindow/ChatWindow";

export default function Chat() {
    return (
        <section className={"h-screen w-screen flex"}>

            <SidebarActions/>
            <ChatList/>
            <ChatWindow/>
        </section>
    )
}