import {UserChatType} from "@/types/user/UserChatType";
import {showToast} from "@/components/ToastMensage/ToastMessage";
import {AxiosResponse} from "axios";
import {ApiConnect} from "@/services/ApiConnection";

export const GetUsers = async (token: string) => {

    let responseData = [] as UserChatType[];
    try {
        if (!token) {
            showToast({
                type: "error",
                message: "Usuário não autenticado! Token não encontrado."
            });
            return responseData;
        }
        let responseAxios: AxiosResponse<UserChatType[]> = await ApiConnect(window.location.href).get("/users/chat/init", {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        responseData = responseAxios.data;
    } catch (error) {
        showToast({
            type: "error",
            message: "Oocrreu um erro ao tentar obter os usarios"
        })
    }
    return responseData;


}