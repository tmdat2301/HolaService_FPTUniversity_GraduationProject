import actionTypes from './actionTypes'
import { apiGetCurrent } from '../../apis'


export const getCurrent = () => async (dispatch) => {
    try {
        const response = await apiGetCurrent()
        if (response.success) {
            dispatch({
                type: actionTypes.GET_CURRENT,
                currentData: response.user
            })
        } else {
            dispatch({
                type: actionTypes.GET_CURRENT,
                msg: response.data.msg,
                currentData: null
            })
            dispatch({ type: actionTypes.LOGOUT })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_CURRENT,
            currentData: null,
            msg: error,
        })
        dispatch({ type: actionTypes.LOGOUT })
    }
}