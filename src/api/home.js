import instance from '@/utils/request.js'
// 获取手机验证码
function getUseInfo(params) {
    return instance({
        url: "/info",
        method: "get",
        params,
    })
}
export { getUseInfo }