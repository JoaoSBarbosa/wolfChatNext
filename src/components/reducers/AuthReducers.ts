import {string} from "postcss-selector-parser";


type loginAction ={
    action: "login",
    payload:{
        token: string,
        refreshToken: string,
    }
}

type logoutAction ={
    action: "logout",
}

type IAuthReducers = loginAction | logoutAction;

export const AuthReducers =() =>{

}