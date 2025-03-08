import {userAuthType} from "@/types/auth/userAuthType";
import {showToast, ToastPosition} from "@/components/ToastMensage/ToastMessage";

export const auth_user = '@wolf_chat:auth_storage';


export const saveUserLoginSession = (user: userAuthType) => {
    try {
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            localStorage.setItem(auth_user, JSON.stringify(user))
        }
    } catch (error) {

        showToast({
            message: `Ops! Não foi possível salvar a sessão do usuário no sistema, consulte o suporte. Erro: ${error}`,
            theme: "dark",
            type: "error",
            position: ToastPosition.TOP_LEFT,
            autoClose: 5000
        })

    }
}

export const getUserLoginSession = () => {
    let userSession: userAuthType | null = null;

    try {
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            userSession = JSON.parse(localStorage.getItem(auth_user) as string) as userAuthType;
        }
    } catch (error) {
        showToast({
            message: `Ops! Não foi possível salvar a sessão do usuário no sistema, consulte o suporte. Erro: ${error}`,
            theme: "dark",
            type: "error",
            position: ToastPosition.TOP_LEFT,
            autoClose: 5000
        })
    }

    return userSession;
}