import instance from '@/utils/request.js'

function getquestionData(params) {
    return instance({
        url: "/question/list",
        method: "get",
        params,
    })
}
function addquestionData(data) {
    return instance({
        url: "/question/add",
        method: "post",
        data,
    })
}
function setquestionStatus(data) {
    return instance({
        url: "/question/status",
        method: "post",
        data,
    })
}
function delquestionData(data) {
    return instance({
        url: "/question/remove",
        method: "post",
        data,
    })
}
function editquestionData(data) {
    return instance({
        url: "/question/edit",
        method: "post",
        data,
    })
}
export { getquestionData, addquestionData, setquestionStatus, delquestionData, editquestionData }