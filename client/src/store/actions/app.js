import actionTypes from './actionTypes'
import * as apis from '../../apis'

export const getCategories = (uid) => async (dispatch) => {
    try {
        const response = await apis.apiGetCategory(uid)
        if (response.success) {
            dispatch({
                type: actionTypes.GET_CATEGORIES,
                categories: response.categories
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_CATEGORIES,
            categories: null
        })
    }
}
export const getFoodtypes = () => async (dispatch) => {
    try {
        const response = await apis.apiGetFoodTypes()
        if (response.success) {
            dispatch({
                type: actionTypes.GET_FOODTYPES,
                foodtypes: response.foodtypes
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_FOODTYPES,
            foodtypes: null
        })
    }
}
