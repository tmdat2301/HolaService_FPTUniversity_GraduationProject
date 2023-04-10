import actionTypes from "../actions/actionTypes";
const initState = {
    categories: null,
    isLoading: false,
    modal: null,
    foodtypes: null
}

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_CATEGORIES:
            return {
                ...state,
                categories: action.categories,
            }
        case actionTypes.LOADING:
            return {
                ...state,
                isLoading: action.flag,
            }
        case actionTypes.MODAL:
            return {
                ...state,
                modal: action.modal || null,
            }
        case actionTypes.GET_FOODTYPES:
            return {
                ...state,
                foodtypes: action.foodtypes || null,
            }
        default:
            return state;
    }

}

export default appReducer