import {SidebarActions} from "@/components/Sidebar/SidebarActions";

export const SidebarItem = () =>{

    return(
        <aside className={"flex h-full"}>
            <SidebarActions/>
            <article className={"bg-red-50"}>

            </article>
        </aside>
    )
}