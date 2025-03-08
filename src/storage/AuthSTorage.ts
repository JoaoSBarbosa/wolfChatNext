import {userTokenType} from "@/types/auth/userTokenType";
import {showToast, ToastPosition} from "@/components/ToastMensage/ToastMessage";
import {userAuthType, userJwtType} from "@/types/auth/userAuthType";
import {jwtDecode} from "jwt-decode";

export const auth_user = '@wolf_chat:auth_storage';
export const token_user = '@wolf_chat:token_storage';


export const saveTokenSession = (user: userTokenType) => {
    try {
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            localStorage.setItem(token_user, JSON.stringify(user))
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

export const saveUserLoginSession = (user: userTokenType) => {
    try {
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            const decodedToken = jwtDecode(user.token) as userJwtType;

            console.log("DADOS: ", decodedToken)
            const firstName = decodedToken.firstName;
            const lastName = decodedToken.lastName;
            const urlImage = decodedToken.urlImage;
            const dropboxImg = decodedToken.dropboxImg;

            localStorage.setItem(auth_user,JSON.stringify({
                token: user.token,
                refreshToken: user.refreshToken,
                firstName,
                lastName,
                urlImage,
                dropboxImg
            }))

            // localStorage.setItem(auth_user, JSON.stringify(user))
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
    let userSession: userTokenType | null = null;

    try {
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            userSession = JSON.parse(localStorage.getItem(auth_user) as string) as userTokenType;
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