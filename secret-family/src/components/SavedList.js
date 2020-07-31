import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { RecipeContext } from "../context/RecipeContext";
import styled from 'styled-components';

const SavedListDiv = styled.div `
    background-color: #fff;
    border: 0;
    box-shadow: 0 -1px 0 #e0e0e0, 0 0 2px rgba(0, 0, 0, 0.12),
        0 2px 4px rgba(0, 0, 0, 0.24);
    padding: 1rem;
    position: relative;
    margin: 1rem auto;
    width: 75%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const StyledLink = styled(Link)`
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    color: #BC4639;
    font-size: 1rem;
    padding: .5rem;
    text-decoration: none;
`;

function SavedList() {
    const {savedList} = useContext(RecipeContext);
  return (
    <SavedListDiv>
      <h3>Saved Recipes:</h3>
      {savedList.map(recipe => {
          console.log("title   ldjafsk ", recipe)
        return (
          <StyledLink
            to={`/recipes/${recipe.recipe.id}`}
            key={recipe.recipe.id}
            activeClassName="saved-active"
          >
            <span className="saved-movie">{recipe.recipe.title}</span>
          </StyledLink>
        );
      })}
      <div className="home-button">
        <StyledLink to="/" style={{color: "black"}}>Home</StyledLink>
      </div>
    </SavedListDiv>
  );
}

export default SavedList;