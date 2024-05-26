import { apiHelper } from "../helper/apiHelper";


export const aboutService = {
    about: (aboutURL) => apiHelper.get(aboutURL),
};