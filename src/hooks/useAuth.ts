import {useContext} from "react";
import {ChatContext} from "@/context/ChatContext";

export const useAuth = () => {
    const context = useContext(ChatContext);

    if (!context) {
        throw new Error("useAuth precisa estar dentro de AuthProvider");
    }
    return context;
}