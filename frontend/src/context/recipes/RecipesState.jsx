import React, {useReducer} from 'react';
import axios from 'axios'
import RecipesContext from './recipesContext';
import RecipesReducer from './recipesReducer';
import {
    SEARCH_RECIPES,
    GET_RECIPE,
    FAVORITE_RECIPE,
    DELETE_RECIPE,
    GET_FAVORITE_RECIPES,
    CLEAR_FAVORITE_RECIPES,
    CLEAR_RECIPES,
    SET_LOADING
} from '../types'

const RecipesState = props => {
    const initialState = {
        recipes: [],
        favoriteRecipes: [],
        recipe: {},
        loading: false,
        isFavorited: false
    };

    const server = 'http://127.0.0.1:5000'

    const appId = import.meta.env.VITE_APP_ID
    const appKey = import.meta.env.VITE_APP_KEY

    const [state, dispatch] = useReducer(RecipesReducer, initialState);

    // Search Recipes
    const searchRecipes = async text => {
        setLoading();

        // API CALL
        const recipes = await axios.get(`${server}/search_recipes/${text}`)

        dispatch({
            type: SEARCH_RECIPES,
            payload: recipes.data
        })
    }

    // Get Recipe
    const getRecipe = async recipeId => {
        setLoading()

        // API CALL
        const recipe = await axios.get(`${server}/get_recipe/${recipeId}`)

        dispatch({
            type: GET_RECIPE,
            payload: recipe.data
        })
    }

    // Favorite Recipe
    const favoriteRecipe = async recipe => {
        try {
            await axios.post(`${server}/favorite_recipe/${recipe.uri.substring(51)}`)
            const favRecipes = await axios.get(`${server}/get_favorite_recipes`)

            dispatch({
                type: FAVORITE_RECIPE,
                payload: favRecipes.data
            })
        } catch (error) {
            if(error.response){
                console.error("Server Error:", error.response.data)
                console.error("Server Code:", error.response.status)
            }else if (error.request){
                console.error("Request Setup Error:", error.request)
            }else{
                console.error("Request Setup Error:", error.message)
            }
        }
    }

    // Delete Recipe
    const deleteRecipe = async id => {
        try {
            await axios.delete(`${server}/delete_recipe/${id}`)
            const favRecipes = await axios.get(`${server}/get_favorite_recipes`)

            dispatch({
                type: DELETE_RECIPE,
                payload: favRecipes.data
            })
        } catch (error) {
            if(error.response){
                console.error("Server Error:", error.response.data)
                console.error("Server Code:", error.response.status)
            }else if (error.request){
                console.error("Request Setup Error:", error.request)
            }else{
                console.error("Request Setup Error:", error.message)
            }
        }        
    }

    // Get Favorite Recipes
    const getFavoriteRecipes = async () => {
        setLoading()
        const favRecipes = await axios.get(`${server}/get_favorite_recipes`)
        dispatch({
            type: GET_FAVORITE_RECIPES,
            payload: favRecipes.data
        })
    }

    // Clear Favorite Recipes
    const clearFavoriteRecipes = async () => {
        setLoading()
        await axios.delete(`${server}/clear_recipes`)
        dispatch({type: CLEAR_FAVORITE_RECIPES});
    }

    // Clear Recipes
    const clearRecipes = () => dispatch({type: CLEAR_RECIPES});

    // Set Loading
    const setLoading = () => dispatch({type: SET_LOADING});

    return (
        <RecipesContext.Provider
        value={{
            recipes: state.recipes, 
            recipe: state.recipe,
            loading: state.loading, 
            favoriteRecipes: state.favoriteRecipes,
            isFavorited: state.isFavorited,
            searchRecipes,
            getRecipe,
            favoriteRecipe,
            deleteRecipe,
            getFavoriteRecipes,
            clearFavoriteRecipes,
            clearRecipes,
            setLoading
        }}>
        {props.children}
        </RecipesContext.Provider>
    )
}

export default RecipesState;
