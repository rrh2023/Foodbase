import React, { useContext, useEffect } from 'react';
import FavoriteRecipeItem from '../recipes/FavoriteRecipeItem'
import Spinner from '../layout/Spinner';
import RecipesContext from '../../context/recipes/recipesContext';

const Favorites = () => {
  const recipesContext = useContext(RecipesContext);

  const {loading, getFavoriteRecipes, deleteRecipe, favoriteRecipes, clearFavoriteRecipes} = recipesContext;

  useEffect(() => {
    getFavoriteRecipes()
  }, [])

  const handleDelete = (recipeId) => {
    deleteRecipe(recipeId)
  }

  if (loading){
    return <Spinner />
  }else{
    return (
      <div>
        {
          favoriteRecipes.length > 0 && (
            <button
              className='btn btn-light btn-block'
              onClick={clearFavoriteRecipes}
            >
              Clear
            </button>
          )
        }
        <div style={recipeStyle}>
            {
                favoriteRecipes.map(recipe => (
                    <FavoriteRecipeItem key={recipe.id} recipe={recipe} id={recipe.id} handleDelete={handleDelete}/>
                ))
            }
        </div>
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