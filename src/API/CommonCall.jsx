import { privateApiClient } from "./PrivateClient";

export const APILogin = (url, payload) => {
    return privateApiClient.post(url, payload);
}
export const APIRegister = (url, payload) => {
    return privateApiClient.post(url, payload);
}
export const APIInsertStdInfo = (url, payload) => {
    return privateApiClient.post(url, payload);
}
export const APIQuarySolve = (url, payload) => {
    return privateApiClient.post(url, payload);
}