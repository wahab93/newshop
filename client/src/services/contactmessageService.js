import { apiHelper } from "../helper/apiHelper";

export const contactmessageService = {
    sendMessage: (contactMessageURL,message) => apiHelper.post(contactMessageURL,{ ...message }),
}