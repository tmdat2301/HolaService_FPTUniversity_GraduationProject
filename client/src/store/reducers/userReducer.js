import actionTypes from "../actions/actionTypes";

const initState = {
    currentData: {},
    isAdmin: false
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_CURRENT:
            return {
                ...state,
                currentData: action.currentData || {}
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                currentData: {}
            }
        case actionTypes.IS_ADMIN:
            return {
                ...state,
                isAdmin: action.isAdmin || false
            }


        default:
            return state;
    }
}

export default userReducer