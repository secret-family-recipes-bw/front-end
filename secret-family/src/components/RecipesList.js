import React from "react";
import { Link } from "react-router-dom";




function RecipeList({ recipes }) {
  return (
    <div className="recipe-list">
      {
        recipes.map(recipe => (
          <Link key={recipe.id} to={`/recipes/${recipe.id}`}>
            <h2>{recipe.title}</h2>
          </Link>
        ))
      }
    </div>
  );
}

export default RecipeList;