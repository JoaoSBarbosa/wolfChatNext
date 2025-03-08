import { toast } from "react-toastify";

export enum ToastPosition {
    BOTTOM_LEFT = "bottom-left",
    BOTTOM_RIGHT = "bottom-right",
    BOTTOM_CENTER = "bottom-center",
    TOP_RIGHT = "top-right",
    TOP_LEFT = "top-left",
    TOP_CENTER = "top-center",
}

type ToastType = "info" | "success" | "warning" | "error"; // Removido "default"
type ToastTheme = "light" | "dark" | "colored";

interface IToastMessage {
    message: string;
    position?: ToastPosition;
    type?: ToastType;
    theme?: ToastTheme;
    autoClose?: number;
}

// Função para exibir toast
export const showToast = ({
                              message,
                              position = ToastPosition.TOP_RIGHT,
                              type = "info",
                              theme = "dark",
                              autoClose = 5000,
                          }: IToastMessage) => {
    // Verifica se o tipo é válido, caso contrário, usa "info" como padrão
    const toastType = type in toast ? type : "info";

    toast[toastType](message, {
        position,
        theme,
        autoClose,
    });
};