import instance from '@/utils/request.js'
// 获取手机验证码
function getphonecode(data) {
    return instance({
        url: "/sendsms",
        method: "post",
        data: data,
    })
}
function register(data) {
    return instance({
        url: "/register",
        method: "post",
        data: data,
    })
}
// export default getphonecode
export { getphonecode, register }