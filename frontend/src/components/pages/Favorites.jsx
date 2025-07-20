import React, { useContext, useEffect } from 'react';
import FavoriteRecipeItem from '../recipes/FavoriteRecipeItem'
import Spinner from '../layout/Spinner';
import RecipesContext from '../../context/recipes/recipesContext';

const Favorites = () => {
  const recipesContext = useContext(RecipesContext);

  const {loading, getFavoriteRecipes, deleteRecipe, favoriteRecipes} = recipesContext;

  useEffect(() => {
    getFavoriteRecipes()
  }, [])

  const handleDelete = (recipe) => {
    deleteRecipe(recipe)
  }

  if (loading){
    return <Spinner />
  }else{
    return (
        <div style={recipeStyle}>
            {
                favoriteRecipes.map(recipe => (
                    <FavoriteRecipeItem key={recipe.uri.substring(51)} recipe={recipe} id={recipe.uri.substring(51)} handleDelete={handleDelete}/>
                ))
            }
        </div>
    )
  }
};

const recipeStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
  };

export default Favorites;