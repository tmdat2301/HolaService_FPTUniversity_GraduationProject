import axios from '../axios'

export const apiRegister = (data) => axios({
    method: 'post',
    url: '/api/user/register',
    data
})
export const apiLogin = (data) => axios({
    method: 'post',
    url: '/api/user/login',
    data
})
export const apiAdmin = () => axios({
    method: 'get',
    url: '/api/user/role',
})
export const apiGetUsers = (params) => axios({
    method: 'get',
    url: '/api/user/',
    params
})
export const apiGetCurrent = () => axios({
    method: 'get',
    url: '/api/user/current',
})
export const apiUpdateProfile = (uid, data) => axios({
    method: 'put',
    url: '/api/user/' + uid,
    data
})
export const apiCreateComment = (data) => axios({
    method: 'post',
    url: '/api/comment/',
    data
})
export const apiGetRoles = () => axios({
    method: 'get',
    url: '/api/user/roles',
})
export const apiUpdateUserByAdmin = (uid, data) => axios({
    method: 'put',
    url: '/api/user/admin/' + uid,
    data
})
export const apiDeleteUser = (uid) => axios({
    method: 'delete',
    url: '/api/user/admin/' + uid,
})
