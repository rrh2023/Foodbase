import React, { Fragment, useEffect, useContext } from 'react';
import {useParams} from "react-router-dom"
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import RecipesContext from '../../context/recipes/recipesContext';

const Recipe = () => {
  const recipesContext = useContext(RecipesContext);

  const { getRecipe, favoriteRecipe, loading, recipe} = recipesContext;

  const params = useParams()

  useEffect(() => {
    getRecipe(params.id)
  }, []);

//   const {} = recipe; // fields in recipe

  if (loading) return <Spinner />;

  return (
    <Fragment>
      <Link to='/' className='btn btn-light'>
        Back To Search
      </Link>
      <div className='card grid-2'>
        <div className='all-center'>
          <img
            src={recipe.image}
            className='round-img'
            alt=''
            style={{ width: '150px' }}
          />
          <h1>{recipe.label}</h1>
          <p>Cuisine Type: {recipe.cuisineType}</p>
        </div>
        <div>
          {recipe.source && (
            <Fragment>
              <h3>Recipe Source</h3>
              <u><p><a href={recipe.url} target="_blank">{recipe.source}</a></p></u>
            </Fragment>
          )}
          <a href={recipe.shareAs} className='btn btn-dark my-1' target="_blank">
            View Recipe
          </a>
          <button onClick={() => favoriteRecipe(recipe)}className='btn btn-dark my-1'>
            Favorite Recipe
          </button>
          <ul>
            <li>
                <Fragment>
                  <strong>Yield: </strong> {recipe.yield}
                </Fragment>
            </li>

            <li>
                <Fragment>
                  <strong>Meal Type: </strong> {recipe.mealType}
                </Fragment>
            </li>

            <li>
                <Fragment>
                  <strong>Dish Type: </strong> {recipe.dishType}
                </Fragment>
            </li>
          </ul>
        </div>
      </div>
      <div className='card text-center'>
        {
          recipe.digest && <>
                  <div className='badge badge-dark'>Calories: {Math.round(100 * recipe.calories)/100}</div>
                  <div className='badge badge-primary'>Fat: {Math.round(100 * recipe.digest[0].total)/100} grams</div>
                  <div className='badge badge-success'>Protein: {Math.round(100 * recipe.digest[2].total)/100} grams</div>
                  <div className='badge badge-light'>Carbohydrates: {Math.round(100 * recipe.digest[1].total)/100} grams</div>
          </>
        }
      </div>
    </Fragment>
  );
};

export default Recipe;