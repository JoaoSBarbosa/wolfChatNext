import {userTokenType} from "@/types/auth/userTokenType";

export type userAuthType ={
    token: string;
    refreshToken: string;
    firstName: string,
    lastName: string,
    urlImage: string,
    dropboxImg: string,
}
