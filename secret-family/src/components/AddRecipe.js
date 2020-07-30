import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialRecipe = {
    user_id: 1,
    title: "", 
    source: "",
    category: "",
    image: "",
};

const AddRecipe = () => {
//   const params = useParams();
  const { push } = useHistory();
  const [recipe, setRecipe] = useState(initialRecipe);
  

 
  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;

    setRecipe({
      ...recipe,
        [ev.target.name]: value
      }
    );
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(recipe)
    axiosWithAuth()
      .post("https://secret-family-recipes-2-api.herokuapp.com/recipes/addrecipe", recipe)
      .then(() => push("/"))
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Add Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Recipe Name"
          value={recipe.title}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddRecipe;