import instance from '@/utils/request.js'

function getquestionData(params) {
    return instance({
        url: "/question/list",
        method: "get",
        params,
    })
}
export { getquestionData }