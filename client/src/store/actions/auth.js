import actionTypes from './actionTypes'
import { apiRegister, apiLogin } from '../../apis'

export const register = (payload) => async (dispatch) => {
    try {
        const response = await apiRegister(payload)
        if (response.success) {
            dispatch({
                type: actionTypes.REGISTER,
                token: response.accessToken
            })
        } else {
            dispatch({
                type: actionTypes.REGISTER,
                token: null,
                mes: response.mes
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.REGISTER,
            token: null,
            mes: 'Something went wrong'
        })
    }
}
export const login = (payload) => async (dispatch) => {
    try {
        const response = await apiLogin(payload)
        if (response.success) {
            dispatch({
                type: actionTypes.LOGIN,
                token: response.accessToken
            })
        } else {
            dispatch({
                type: actionTypes.LOGIN,
                token: null,
                mes: response.mes
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.LOGIN,
            data: null,
            mes: 'Something went wrong'
        })
    }
}

export const logout = () => ({
    type: actionTypes.LOGOUT
})