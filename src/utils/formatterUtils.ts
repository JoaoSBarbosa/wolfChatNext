import {format} from "date-fns";
import {ptBR} from "date-fns/locale";

export const formatDateBR = (dateString: string) => {
    if(!dateString) return "sem data";
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy HH:mm", {locale: ptBR})
}