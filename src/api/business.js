import instance from '@/utils/request.js'

function getBusinessData(params) {
    return instance({
        url: "/enterprise/list",
        method: "get",
        params,
    })
}
export { getBusinessData }