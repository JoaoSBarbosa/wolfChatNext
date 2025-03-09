import {ReactNode} from "react";

interface IconButtonProps {
    icon: ReactNode,
    onClick: ()=> void
}
export const IconButton = ({ icon, onClick }: IconButtonProps) =>{
    return(

        <button onClick={onClick}>
            { icon }
        </button>
    )
}