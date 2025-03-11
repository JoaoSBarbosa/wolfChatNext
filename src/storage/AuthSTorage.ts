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
            const tokens = JSON.parse(localStorage.getItem(token_user) as string) as userTokenType;
            userSession = jwtDecode(tokens.token);
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


// export const saveUserLoginSession = (user: userTokenType) => {
//     try {
//         if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
//             const decodedToken = jwtDecode(user.token) as UserJwtType;
//
//             console.log("DADOS: ", decodedToken)
//             const firstName = decodedToken.firstName;
//             const lastName = decodedToken.lastName;
//             const urlImage = decodedToken.urlImage;
//             const dropboxImg = decodedToken.dropboxImg;
//             const roles = decodedToken.roles;
//
//             localStorage.setItem(auth_user,JSON.stringify({
//                 token: user.token,
//                 refreshToken: user.refreshToken,
//                 firstName,
//                 lastName,
//                 urlImage,
//                 dropboxImg,
//                 roles
//             }))
//         }
//     } catch (error) {
//
//         showToast({
//             message: `Ops! Não foi possível salvar a sessão do usuário no sistema, consulte o suporte. Erro: ${error}`,
//             theme: "dark",
//             type: "error",
//             position: ToastPosition.TOP_LEFT,
//             autoClose: 5000
//         })
//
//     }
// }
