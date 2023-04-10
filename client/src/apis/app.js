import axios from '../axios'
import axiosRaw from 'axios'

export const apiGetCategory = (uid) => axios({
    method: 'get',
    url: '/api/category/',
    data: { uid }
})
export const apiGetProvinces = () => axiosRaw({
    method: 'get',
    url: 'https://vapi.vnappmob.com/api/province/'
})
export const apiGetDistrict = (provinceId) => axiosRaw({
    method: 'get',
    url: `https://vapi.vnappmob.com/api/province/district/${provinceId}`
})
export const apiGetFoodTypes = () => axios({
    method: 'get',
    url: '/api/foodtype/'
})