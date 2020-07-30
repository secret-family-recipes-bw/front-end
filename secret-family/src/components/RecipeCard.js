import React from 'react';

const RecipeCard = props => {
  const { recipe, ingredients, instructions } = props.recipe;
  return (
    <div className="recipe-card">
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
    </div>
  );
};

export default RecipeCard;
