import {
    SEARCH_RECIPES,
    GET_RECIPE,
    FAVORITE_RECIPE,
    DELETE_RECIPE,
    GET_FAVORITE_RECIPES,
    CLEAR_FAVORITE_RECIPES,
    CLEAR_RECIPES,
    SET_LOADING,
} from '../types';

const recipesReducer = (state, action) => {
    switch (action.type){
        case SEARCH_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                loading: false
            }
        case GET_RECIPE:
            return {
                ...state, 
                recipe: action.payload,
                loading: false
            }
        case FAVORITE_RECIPE:
            return {
                ...state,
                loading: false
            }
        case DELETE_RECIPE:
            return {
                ...state
            }
        case GET_FAVORITE_RECIPES:
            return {
                ...state,
                favoriteRecipes: action.payload,
                loading: false
            }
        case CLEAR_FAVORITE_RECIPES:
            return {
                ...state, 
                favoriteRecipes: [],
                loading: false
            }
        case CLEAR_RECIPES:
            return {
                ...state, 
                recipes: [],
                loading: false
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}

export default recipesReducer