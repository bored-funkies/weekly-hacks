export const setToLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, value);
}

export const getFromLocalStorage = (key: string) => {
    return localStorage.getItem(key);
}