import React, { useState, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import SavedList from "./components/SavedList";
import RecipeList from "./components/RecipesList";
import Recipe from "./components/Recipe";
import UpdateRecipe from "./components/UpdateRecipe";
import recipeData from "./FakeData/recipeData";
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [recipeList, setRecipeList] = useState(recipeData);

  const { location } = useHistory();

  const getRecipeList = () => {
    // axios
    //   .get("http://localhost:5000/api/movies")
    //   .then(res => setRecipeList(res.data))
    //   .catch(err => console.log(err.response));
  };

  const addToSavedList = recipe => {
    setSavedList([...savedList, recipe]);
  };

  useEffect(() => {
    getRecipeList();
  }, [location]);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <RecipeList recipes={recipeList} />
      </Route>

      <Route
        path="/movies/:id"
        render={props => <Recipe {...props} addToSavedList={addToSavedList} />}
      />

      <Route
        path="/update-movie/:id"
        render={props => <UpdateRecipe {...props} />}
      />
    </>
  );
};

export default App;