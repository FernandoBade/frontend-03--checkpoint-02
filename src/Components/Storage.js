export const getToken = () => {
    const localData = localStorage.getItem("token");
    return localData ? localData : null;
}

export const setToken = (token) => {
    localStorage.setItem("token", token);
}

export const removeToken = () => {
    localStorage.removeItem("token");
}