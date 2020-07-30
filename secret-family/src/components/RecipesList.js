import React, { useContext } from "react";
import { RecipeContext } from "../context/RecipeContext";
import { Link } from "react-router-dom";
import styled from 'styled-components';


const RecipeListDiv = styled.div `
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
    flex-direction: column;
    justify-content: space-between;
`;


function RecipeList() {
  const {filteredRecipes} = useContext(RecipeContext);
  return (
    <RecipeListDiv>
      {
        filteredRecipes.map(recipe => (
          <Link key={recipe.id} to={`/recipes/${recipe.id}`}>
            <h2>{recipe.title}</h2>
          </Link>
        ))
      }
    </RecipeListDiv>
  );
}

export default RecipeList;