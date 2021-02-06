import axios from 'axios'
function getphonecode(data) {
    return axios({
        url: process.env.VUE_APP_URL + "/sendsms",
        method: "post",
        data: data,
        withCredentials: true,
    })
}
export default getphonecode