import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const RecipeItem = ({recipe, id}) => {
  useEffect(() => {
  }, []);

    const {
      images,
      label
    } = recipe
  
  return (
    <div className='card text-center'>
      <img src={images.THUMBNAIL.url} alt="" className='round-img' style={{width: '60px'}}/>
      <h3>{label}</h3>

      <div>
        <Link to={`/recipe/${id}`} className='btn btn-dark btn-sm my-1'>
        More
        </Link>
      </div>
    </div>
  );
};

export default RecipeItem;