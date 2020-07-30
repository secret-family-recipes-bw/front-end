import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const defaultIngredients = [{
  name: "",
  quantity: ""
}]

const AddIngredients = () => {
  const { id } = useParams();
  const { push, location } = useHistory();
  const [ingredients, setIngredients] = useState(defaultIngredients);

  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;

  };

  const handleSubmit = e => {
    e.preventDefault();
    // axios
    //   .put(`http://localhost:5000/api/movies/${recipe.id}`, recipe)
    //   .then(() => push("/"))
    //   .catch(err => console.log(err));
  };

  const updateIngredient = index => {
    
  }

  return (
    <div>
      <h2>Update Recipe</h2>
      <form onSubmit={handleSubmit}>
        { ingredients.map((ingredient, index) => {
          return (
            <input type="text" name="name" value={ingredient.name} onChange={() => updateIngredient(index)} />
          )
        }) }
        <button>Update</button>
      </form>
    </div>
  );
};

export default UpdateRecipe;