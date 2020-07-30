import React, { useState, useEffect } from "react";
import { Route, useHistory, Link } from "react-router-dom";
import SavedList from "./components/SavedList";
import RecipeList from "./components/RecipesList";
import Recipe from "./components/Recipe";
import UpdateRecipe from "./components/UpdateRecipe";
import Search from "./components/Search";
// import axios from 'axios';
import AddRecipe from "./components/AddRecipe";
import Signup from './components/Signup';
import Login from './components/Login';
import PrivateRoute from "./components/PrivateRoute";
import axiosWithAuth from "./utils/axiosWithAuth";


const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [recipeList, setRecipeList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const { location } = useHistory();

  const getRecipeList = () => {
    axiosWithAuth()
      .get("https://secret-family-recipes-2-api.herokuapp.com/recipes")
      .then(res => {
        console.log(res)
        setRecipeList(res.data)
        const recipes = filterRecipes(res.data, searchText)
        setFilteredRecipes(recipes)
      } )
      .catch(err => console.log(err.response));
  };

  const addToSavedList = recipe => {
    setSavedList([...savedList, recipe]);
  };

  const removeFromSavedList = recipe => {
    setSavedList(savedList.filter(savedRecipe => savedRecipe.id !== recipe.id));
  }

  const isInSavedList = recipe => {
    return recipe && savedList.find(savedRecipe => recipe.recipe.id == savedRecipe.recipe.id) !== undefined;
  }

  useEffect(() => {
    getRecipeList();
  }, [location]);

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
      <Route path='/signup' component={Signup}></Route>
      <Route path='/login' component={Login}></Route>

      <PrivateRoute exact path="/">
        <SavedList list={savedList} />
        <Search 
          searchText={searchText} 
          changeSearchText={changeSearchText} 
          clearFilter={clearFilter}  
        />
        <RecipeList recipes={filteredRecipes} />
        <Link to="/add-recipe"><button>Add Recipe</button></Link>
      </PrivateRoute>

      <Route path="/add-recipe">
        <SavedList list={savedList} />
        <AddRecipe />
      </Route> 
      
      <Route path="/recipes/:id">
        <SavedList list={savedList} />
        <Recipe 
          recipes={recipeList} 
          addToSavedList={addToSavedList} 
          isInSavedList={isInSavedList}
          removeFromSavedList={removeFromSavedList} 
        />
      </Route>

      <Route path="/update-recipe/:id">
        <SavedList list={savedList} />
        <UpdateRecipe />
      </Route> 
    </div>
  );
};

export default App;