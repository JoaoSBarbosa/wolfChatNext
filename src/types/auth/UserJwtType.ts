export type UserJwtType = {
    firstName: string,
    id: number;
    lastName: string,
    urlImage: string,
    dropboxImg: string,
    roles: string[]
    token: string;
    refreshToken: string;
}