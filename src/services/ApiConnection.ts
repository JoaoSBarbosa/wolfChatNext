import axios from "axios";

export const getUrlConnection = (currentLocation: string) =>{
    let url = 'http://localhost';
    let port = "8080";
    let context = "/barbosa_chat"
    if( currentLocation.includes('191.252.221.124')) url = 'http://191.252.221.124';

    return `${url}:${port}${context}`
}

export const ApiConnect = (currentLocation: string) =>{

    return axios.create({
        baseURL: getUrlConnection(currentLocation),
        timeout: 30 * 1000,
        timeoutErrorMessage: "Servidor indisponível no momento"
    })
}