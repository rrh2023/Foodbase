import React, { useContext } from 'react';
import RecipeItem from './RecipeItem';
import Spinner from '../layout/Spinner';
import RecipesContext from '../../context/recipes/recipesContext';

const Recipes = () => {
  const recipesContext = useContext(RecipesContext);

  const { loading, recipes } = recipesContext;

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div style={recipeStyle}>
        {recipes.map(recipe => (
          <RecipeItem key={recipe.recipe.uri.substring(51)} recipe={recipe.recipe} id={recipe.recipe.uri.substring(51)}/>
        ))}
      </div>
    );
  }
};

const recipeStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'
};

export default Recipes;