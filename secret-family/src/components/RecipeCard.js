import React from 'react';
import styled from 'styled-components';


const RecipeCardDiv = styled.div `
    background-color: #D4A59A;
    border: 0;
    box-shadow: 0 -1px 0 #e0e0e0, 0 0 2px rgba(0, 0, 0, 0.12),
        0 2px 4px rgba(0, 0, 0, 0.24);
    padding: 1rem;
    position: relative;
    margin: 1rem auto;
    width: 75%;
    text-align: left;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
`;

const RecipeCard = props => {
  const { recipe, instructions } = props.recipe;
  return (
    <RecipeCardDiv>
        <h2>{recipe.title}</h2>
        <div className="recipe-ingredients">
            <h3>Ingredients:</h3> 
            {/* <p>{ingredients}</p> */}
        </div>
        <div className="recipe-instructions">
            <h3>Instructions:</h3> 
            <ol>
                { instructions.map(instruction => {
                    return (
                        <li key={instruction.step_number}>{instruction.step}</li>
                    )
                })}
            </ol>
        </div>
    </RecipeCardDiv>
  );
};

export default RecipeCard;
