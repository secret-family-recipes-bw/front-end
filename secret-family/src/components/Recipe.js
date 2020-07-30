import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import { RecipeContext } from "../context/RecipeContext";
import axiosWithAuth from "../utils/axiosWithAuth";


function Recipe() {
    const {addToSavedList, isInSavedList, removeFromSavedList} = useContext(RecipeContext);
  const { push } = useHistory();
  const { id } = useParams();
  const [recipe, setRecipe] = useState();
  const saved = isInSavedList(recipe);


  const toggleSaveRecipe = () => {
    saved ? removeFromSavedList(recipe) : addToSavedList(recipe);
  };

  useEffect(() => {
    axiosWithAuth()
      .get(`https://secret-family-recipes-2-api.herokuapp.com/recipes/${id}`)
      .then((res) => {
          setRecipe(res.data)
          console.log("data", res.data)
        })
      .catch((err) => console.log(err.response));
  }, [id]);

  if (!recipe) {
    return <div>Loading recipe information...</div>;
  }

  const handleDelete = e => {
    e.preventDefault();
    axiosWithAuth()
      .delete(`https://secret-family-recipes-2-api.herokuapp.com/recipes/${id}`)
      .then((res) => {
          console.log("res for delete:", res)
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
      <Link to={`/update-recipe/${recipe.recipe.id}`}>
        <button>Edit</button>
      </Link>
    </div>
  );
}

export default Recipe;
