import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const FavoriteRecipeItem = ({recipe, id, handleDelete}) => {
  useEffect(() => {
    }, []);
  
  return (
    <div className='card text-center'>
      <img src={recipe.thumbnailUrl} alt="" className='round-img' style={{width: '60px'}}/>
      <h3>{recipe.label}</h3>

      <div>
        <Link to={`/recipe/${id}`} className='btn btn-dark btn-sm my-1'>
        More
        </Link>
        <button onClick={() => handleDelete(recipe.id)} className='btn btn-dark btn-sm my-1'>Delete</button>
      </div>
    </div>
  );
};

export default FavoriteRecipeItem;