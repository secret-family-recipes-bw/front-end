import React, { useState, useEffect } from "react";
import { Route, useHistory, Link } from "react-router-dom";
import SavedList from "./components/SavedList";
import RecipeList from "./components/RecipesList";
import Recipe from "./components/Recipe";
import UpdateRecipe from "./components/UpdateRecipe";
import recipeData from "./FakeData/recipeData";
import Search from "./components/Search";
import axios from 'axios';
import AddRecipe from "./components/AddRecipe";
import Signup from './components/Signup';
import Login from './components/Login';


const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [recipeList, setRecipeList] = useState(recipeData);
  const [searchText, setSearchText] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState(recipeData);
 
 
  const { location } = useHistory();

  const getRecipeList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setRecipeList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = recipe => {
    setSavedList([...savedList, recipe]);
  };

  const removeFromSavedList = recipe => {
    setSavedList(savedList.filter(savedRecipe => savedRecipe.id !== recipe.id));
  }

  const isInSavedList = recipe => {
    return savedList.find(savedRecipe => recipe.id == savedRecipe.id) !== undefined;
  }

  useEffect(() => {
    getRecipeList();
  }, [location]);

  const filterRecipes = (recipes, searchText=searchText) => {
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
      <SavedList list={savedList} />

      <Route exact path="/">
        <Search 
          searchText={searchText} 
          changeSearchText={changeSearchText} 
          clearFilter={clearFilter}  
        />
        <RecipeList recipes={filteredRecipes} />
        <Link to="/add-recipe"><button>Add Recipe</button></Link>
      </Route>

      <Route path="/add-recipe" component={AddRecipe}/> 
      
      <Route
        path="/recipes/:id"
        render={ props => 
          <Recipe {...props} 
            recipes={recipeList} 
            addToSavedList={addToSavedList} 
            isInSavedList={isInSavedList}
            removeFromSavedList={removeFromSavedList} 
          />
        }
      />

      <Route
        path="/update-movie/:id"
        render={props => <UpdateRecipe {...props} />}
      />
    </div>
  );
};

export default App;