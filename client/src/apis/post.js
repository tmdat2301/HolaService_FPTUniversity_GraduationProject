import axios from '../axios'

export const apiCreateNewPost = (data) => axios({
    method: 'post',
    url: '/api/post/',
    data
})
export const apiGetPosts = (params) => axios({
    method: 'get',
    url: '/api/post/user',
    params
})
export const apiGetPostsByAdmin = (params) => axios({
    method: 'get',
    url: '/api/post',
    params
})
export const apiUpdatePost = (pid, data) => axios({
    method: 'put',
    url: '/api/post/' + pid,
    data
})
export const apiUpdatePostByAdmin = (pid, data) => axios({
    method: 'put',
    url: '/api/post/admin/' + pid,
    data
})
export const apiDeletePost = (pid) => axios({
    method: 'delete',
    url: '/api/post/' + pid,
})
export const apiDeletePostByAdmin = (pid) => axios({
    method: 'delete',
    url: '/api/post/admin/' + pid,
})
export const apiGetHome = (pid) => axios({
    method: 'get',
    url: '/api/post/home',
})
export const apiGetPostById = (pid) => axios({
    method: 'get',
    url: '/api/post/' + pid,
})
export const apiRatings = (data) => axios({
    method: 'post',
    url: '/api/post/ratings',
    data
})
export const apiGetDashboard = (params) => axios({
    method: 'get',
    url: '/api/post/dashboard',
    params
})