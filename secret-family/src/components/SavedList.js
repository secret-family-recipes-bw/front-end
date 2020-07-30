import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { RecipeContext } from "../context/RecipeContext";

function SavedList() {
    const {savedList} = useContext(RecipeContext);
  return (
    <div className="saved-list">
      <h3>Saved Recipes:</h3>
      {savedList.map(recipe => {
          console.log("title   ldjafsk ", recipe)
        return (
          <NavLink
            to={`/recipes/${recipe.recipe.id}`}
            key={recipe.recipe.id}
            activeClassName="saved-active"
          >
            <span className="saved-movie">{recipe.recipe.title}</span>
          </NavLink>
        );
      })}
      <div className="home-button">
        <Link to="/">Home</Link>
      </div>
    </div>
  );
}

export default SavedList;