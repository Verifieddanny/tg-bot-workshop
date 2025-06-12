const axios = require("axios")
const TG_BOT_TOKEN = "Your Bot key goes here";
const TG_API_URL = `https://api.telegram.org/bot${TG_BOT_TOKEN}`;


function getAxiosInstance() {
    return {
        get(method, params){
            return axios.get(`/${method}`, {
                baseURL: TG_API_URL,
                params: params
            })
            //https://api.telegram.org/bot${TG_BOT_TOKEN}/${method}
        },
        post(method, data) {
            return axios.post(`/${method}`, data, {
                baseURL: TG_API_URL
            })
        }

    }
}
module.exports = { axiosInstance: getAxiosInstance() };