import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function SavedList({ list }) {
  return (
    <div className="saved-list">
      <h3>Saved Recipes:</h3>
      {list.map(recipe => {
        return (
          <NavLink
            to={`/movies/${recipe.id}`}
            key={recipe.id}
            activeClassName="saved-active"
          >
            <span className="saved-movie">{recipe.title}</span>
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