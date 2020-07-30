import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function SavedList({ list }) {
  return (
    <div className="saved-list">
      <h3>Saved Recipes:</h3>
      {list.map(recipe => {
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