import React from 'react';

const RecipeCard = props => {
  const { title, ingredients, instructions, image } = props.recipe;
  return (
    <div className="recipe-card">
        <h2>{title}</h2>
        <div className="recipe-ingredients">
            Ingredients: <p>{ingredients}</p>
        </div>
        <div className="recipe-instructions">
            Instructions: <p>{instructions}</p>
        </div>
        <div>
            <img src=""/>
        </div>
    </div>
  );
};

export default RecipeCard;
