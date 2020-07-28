import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory, Link } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import recipeData from "../FakeData/recipeData";

function Recipe({ addToSavedList, recipes, isInSavedList, removeFromSavedList }) {
  const { push } = useHistory();
  const { id } = useParams();
  const recipe = recipes.find(recipe => recipe.id == id);
  const saved = isInSavedList(recipe);

//   const fetchRecipe = (id) => {
//     axios
//       .get(`http://localhost:5000/api/movies/${id}`)
//       .then((res) => setRecipe(res.data))
//       .catch((err) => console.log(err.response));
//   };

  const toggleSaveRecipe = () => {
    saved ? removeFromSavedList(recipe) : addToSavedList(recipe);
  };

//   useEffect(() => {
//     fetchRecipe(params.id);
//   }, [params.id]);

  if (!recipe) {
    return <div>Loading recipe information...</div>;
  }

  const handleDelete = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${recipe.id}`)
      .then(() => {
        push("/");
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="save-wrapper">
      <RecipeCard recipe={recipe} />

      <button className="save-button" onClick={toggleSaveRecipe}>
        {saved ? "remove from saved" : "Save"}
      </button>
      <button onClick={handleDelete}>
          Delete
      </button>
      <Link to={`/update-movie/${recipe.id}`}>
        <button>Edit</button>
      </Link>
    </div>
  );
}

export default Recipe;
