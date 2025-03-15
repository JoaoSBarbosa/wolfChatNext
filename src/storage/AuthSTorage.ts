import {userTokenType} from "@/types/auth/userTokenType";
import {showToast, ToastPosition} from "@/components/ToastMensage/ToastMessage";
import {jwtDecode} from "jwt-decode";
import {UserJwtType} from "@/types/auth/UserJwtType";

// export const auth_user = '@wolf_chat:auth_storage';
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


export const getUserLoginSession = () => {
    let userSession: UserJwtType | null = null;

    try {
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            const teste = JSON.parse(localStorage.getItem(token_user) as string) as userTokenType;

            // userSession = jwtDecode(tokens.token);
            // userSession = userSession?.token = tokens.token;
            // userSession = userSession?.refreshToken = tokens.refreshToken;
            const tokens = localStorage.getItem(token_user);

            if(tokens){
                const parsedTokens = JSON.parse(tokens) as userTokenType;
                const decodedToken = jwtDecode(parsedTokens.token) as UserJwtType;

                userSession = {
                    id: decodedToken.id,
                    firstName: decodedToken.firstName,
                    lastName: decodedToken.lastName,
                    urlImage: decodedToken.urlImage,
                    dropboxImg: decodedToken.dropboxImg,
                    roles: decodedToken.roles,
                    token: parsedTokens.token,
                    refreshToken: parsedTokens.refreshToken
                }
            }

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

export const getTokenSession = () => {
    let tokensSession: userTokenType | null = null;

    try {
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            tokensSession = JSON.parse(localStorage.getItem(token_user) as string) as userTokenType;
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

    return tokensSession;
}

export const logoutUser = () =>{
    try {
        if(typeof window !== 'undefined' && typeof localStorage !== 'undefined'){
            localStorage.removeItem(token_user);

            showToast({
                message: "Sessão finalizada com sucesso!",
                theme: "dark",
                type: "info",
                position: ToastPosition.TOP_RIGHT,
                autoClose: 3000
            });
        }
    }catch (err){
        showToast({
            message: `Ops! Não foi possível remover a sessão do usuário no sistema, consulte o suporte. Erro: ${err}`,
            theme: "dark",
            type: "error",
            position: ToastPosition.TOP_LEFT,
            autoClose: 5000
        })
    }
}

