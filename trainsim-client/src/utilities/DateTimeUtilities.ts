import dayjs from "dayjs";

export function toDateStr(date: Date): string {
    return dayjs(date).format("ddd MMM D, YYYY")
}

export function toTimeStr(date: Date): string {
    return dayjs(date).format("h:mm a");
}