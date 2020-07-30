import React, { useContext } from "react";
import { RecipeContext } from "../context/RecipeContext";
import { Link } from "react-router-dom";




function RecipeList() {
  const {filteredRecipes} = useContext(RecipeContext);
  return (
    <div className="recipe-list">
      {
        filteredRecipes.map(recipe => (
          <Link key={recipe.id} to={`/recipes/${recipe.id}`}>
            <h2>{recipe.title}</h2>
          </Link>
        ))
      }
    </div>
  );
}

export default RecipeList;