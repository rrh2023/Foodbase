import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Recipe from './components/recipes/Recipe';
import Alert from './components/layout/Alert';
import Home from './components/pages/Home';
import Favorites from './components/pages/Favorites';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';

import RecipesState from './context/recipes/RecipesState';
import AlertState from './context/alert/AlertState';

import './App.css';

const App = () => {
  return (
    <RecipesState>
      <AlertState>
        <Router>
          <div className='App'>
            <Navbar />
            <div className='container'>
              <Alert />
              <Routes>
                <Route exact path='/' element={<Home/>} />
                <Route exact path='/about' element={<About/>} />
                <Route exact path='/favorites' element={<Favorites/>} />
                <Route exact path='/recipe/:id' element={<Recipe/>} />
                <Route path="*" element={<NotFound/>} />
              </Routes>
            </div>
          </div>
        </Router>
      </AlertState>
    </RecipesState>
  );
};

export default App;