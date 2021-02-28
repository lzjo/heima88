import instance from '@/utils/request.js'

function getsubjectdata(params) {
    return instance({
        url: "/subject/list",
        method: "get",
        params,
    })
}
function setsubjecystatus(data) {
    return instance({
        url: "/subject/status",
        method: "post",
        data,
    })
}
function delsubjectdata(data) {
    return instance({
        url: "/subject/remove",
        method: "post",
        data,
    })
}
function addsubjectdata(data) {
    return instance({
        url: "/subject/add",
        method: "post",
        data,
    })
}
function editsubjectdata(data) {
    return instance({
        url: "/subject/edit",
        method: "post",
        data,
    })
}
export { getsubjectdata, setsubjecystatus, delsubjectdata, addsubjectdata, editsubjectdata }