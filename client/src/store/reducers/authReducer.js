import actionTypes from "../actions/actionTypes";

const initState = {
    isLoggedIn: false,
    token: null,
    mes: '',
    update: false
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER:
            return {
                ...state,
                isLoggedIn: action.token ? true : false,
                token: action.token,
                mes: action.mes || '',
                update: !state.update
            }
        case actionTypes.LOGIN:
            return {
                ...state,
                isLoggedIn: action.token ? true : false,
                token: action.token,
                mes: action.mes || '',
                update: !state.update
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                msg: ''
            }

        default:
            return state;
    }
}

export default authReducer