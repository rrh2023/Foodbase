import React, { useState, useContext } from 'react';
import RecipesContext from '../../context/recipes/recipesContext.jsx';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
  const recipeContext = useContext(RecipesContext);
  const alertContext = useContext(AlertContext);

  const [text, setText] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    if (text === '') {
      alertContext.setAlert('Please enter something', 'light');
    } else {
      recipeContext.searchRecipes(text);
      setText('');
    }
  };

  const onChange = e => setText(e.target.value);

  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input
          type='text'
          name='text'
          placeholder='Search Recipes...'
          value={text}
          onChange={onChange}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {recipeContext.recipes.length > 0 && (
        <button
          className='btn btn-light btn-block'
          onClick={recipeContext.clearRecipes}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;