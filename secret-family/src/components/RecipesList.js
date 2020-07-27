import React from "react";
import { Link } from "react-router-dom";
import RecipeCard from "./RecipeCard";



function RecipeList({ recipes }) {
  return (
    <div className="recipe-list">
      {
        recipes.map(recipe => (
          <Link key={recipe.id} to={`/recipes/${recipe.id}`}>
            <RecipeCard recipe={recipe} />
          </Link>
        ))
      }
    </div>
  );
}

export default RecipeList;