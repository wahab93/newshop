import { apiHelper } from "../helper/apiHelper";


export const accountServices = {
    login: (loginURL, user) => apiHelper.post(loginURL, { ...user }),
    logout: (logoutURL) => apiHelper.post(logoutURL)
};