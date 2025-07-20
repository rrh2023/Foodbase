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

    const appId = import.meta.env.VITE_APP_ID
    const appKey = import.meta.env.VITE_APP_KEY

    const [state, dispatch] = useReducer(RecipesReducer, initialState);

    // Search Recipes
    const searchRecipes = async text => {
        setLoading();

        // API CALL
        const url = `https://api.edamam.com/api/recipes/v2?q=${text}&type=public&app_id=${appId}&app_key=${appKey}`
        const res = await axios.get(url); 

        dispatch({
            type: SEARCH_RECIPES,
            payload: res.data.hits
        })
    }

    // Get Recipe
    const getRecipe = async recipeId => {
        setLoading()

        // API CALL
        const url = `https://api.edamam.com/api/recipes/v2/${recipeId}?app_id=${appId}&app_key=82b15839172e88a1d2ffd5c56edbba5c`
        const res = await axios.get(url)

        console.log(res.data.recipe)

        dispatch({
            type: GET_RECIPE,
            payload: res.data.recipe
        })
    }

    // Favorite Recipe
    const favoriteRecipe = async recipe => {
        const alreadyFavorited = state.favoriteRecipes.some(favRecipe => favRecipe.uri === recipe.uri)

        if (alreadyFavorited == false) state.favoriteRecipes.push(recipe)
    
        dispatch({
            type: FAVORITE_RECIPE
        })
    }

    // Delete Recipe
    const deleteRecipe = recipe => {
        state.favoriteRecipes = state.favoriteRecipes.filter(favRecipe => favRecipe.uri != recipe.uri)

        dispatch({
            type: DELETE_RECIPE
        })
    }

    // Get Favorite Recipes
    const getFavoriteRecipes = () => {
        setLoading()

        dispatch({
            type: GET_FAVORITE_RECIPES,
            payload: state.favoriteRecipes
        })
    }

    // Clear Favorite Recipes
    const clearFavoriteRecipes = () => dispatch({ type: CLEAR_FAVORITE_RECIPES});

    // Clear Recipes
    const clearRecipes = () => dispatch({ type: CLEAR_RECIPES});

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
