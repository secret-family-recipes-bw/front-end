import React, { useState } from "react";
import { Route } from "react-router-dom";

import SavedList from "./components/SavedList";
import Recipe from "./components/Recipe";
import UpdateRecipe from "./components/UpdateRecipe";
// import axios from 'axios';
import AddRecipe from "./components/AddRecipe";
import Signup from './components/Signup';
import Login from './components/Login';
import Nav from './components/Nav'

import PrivateRoute from "./components/PrivateRoute";
import { RecipeContext } from "./context/RecipeContext"
import Home from "./components/Home";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [recipeList, setRecipeList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const addToSavedList = recipe => {
    setSavedList([...savedList, recipe]);
  };

  const removeFromSavedList = recipe => {
    setSavedList(savedList.filter(savedRecipe => savedRecipe.id !== recipe.id));
  }

  const isInSavedList = recipe => {
    return recipe && savedList.find(savedRecipe => recipe.recipe.id === savedRecipe.recipe.id) !== undefined;
  }

  const updateRecipes = newRecipes => {
    setRecipeList(newRecipes)
    const recipes = filterRecipes(newRecipes, searchText)
    setFilteredRecipes(recipes)
  }

  const filterRecipes = (recipes, searchText) => {
    console.log("search text kldsjlkfajdkljfsalk", searchText)
    return recipes.filter(recipe => recipe.title.includes(searchText));
  }

  const changeSearchText = e => {
    setSearchText(e.target.value);
    setFilteredRecipes(filterRecipes(recipeList, e.target.value));
  }

  const clearFilter = () => {
      setFilteredRecipes(recipeList);
      setSearchText("");
  }

  return (
    <div className="App">
      <RecipeContext.Provider value={{filteredRecipes, searchText, savedList, changeSearchText, clearFilter, recipeList, addToSavedList, isInSavedList, removeFromSavedList, updateRecipes}}>
        <Nav />
        <Route path='/signup' component={Signup}></Route>
        <Route path='/login' component={Login}></Route>

        <PrivateRoute exact path="/" component={Home} />

        <Route path="/add-recipe">
          <SavedList />
          <AddRecipe />
        </Route> 
        
        <Route path="/recipes/:id">
          <SavedList />
          <Recipe />
        </Route>

        <Route path="/update-recipe/:id">
          <SavedList list={savedList} />
          <UpdateRecipe />
        </Route> 
      </RecipeContext.Provider>
    </div>
  );
};

export default App;