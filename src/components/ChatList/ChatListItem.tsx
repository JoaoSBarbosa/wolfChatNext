interface IChatListItem {
    src: string,
    alt: string,
    title: string
    lastMessage: string;
    countMessage: number
}

export const ChatListItem = ({alt, src, lastMessage, countMessage = 10, title}: IChatListItem) => {
    return (
        <div className={"flex items-center gap-2 border border-red-500 rounded"}>
            <div>
                <img src={src} alt={alt} className={"h-10 w-10 rounded-full"}/>
            </div>
            <div className={"flex flex-col gap-1"}>

                <h2>{title}</h2>
                <div className={"flex items-center gap-1"}>

                    <p>{lastMessage}</p>
                    <span> {countMessage}</span>
                </div>

            </div>
        </div>
    )
}