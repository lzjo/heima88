import instance from '@/utils/request.js'
// 获取手机验证码
function toLogin(data) {
    return instance({
        url: "/login",
        method: "post",
        data: data,
    })
}
export { toLogin }