import instance from '@/utils/request.js'
// 获取手机验证码
function getUseInfo(params) {
    return instance({
        url: "/info",
        method: "get",
        params,
    })
}
function exitLogin() {
    return instance({
        url: "/logout",
        method: "get",
    })
}
export { getUseInfo, exitLogin }