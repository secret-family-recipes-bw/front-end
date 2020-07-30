import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialRecipe = {
  recipe: {
    user_id: 1,
    title: "", 
    source: "",
    category: "",
    image: "",
  }
};


const UpdateRecipe = () => {
  const { id } = useParams();
  const { push, location } = useHistory();
  const [recipe, setRecipe] = useState(initialRecipe);


  useEffect(() => {
    if (location.state) {
      setRecipe(location.state);
    } else {
      axiosWithAuth()
        .get(`https://secret-family-recipes-2-api.herokuapp.com/recipes/${id}`)
        .then(res => {
            console.log("data", res.data) 
            setRecipe(res.data)
        })
        .catch(err => console.log(err));
    }
  }, [id, location.state]);

  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;

    setRecipe({
      ...recipe,
      recipe: {
        ...recipe.recipe,
        [ev.target.name]: value
      }
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`https://secret-family-recipes-2-api.herokuapp.com/recipes/updaterecipe/${id}`, recipe.recipe)
      .then(() => push("/"))
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Update Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Recipe Name"
          value={recipe.recipe.title}
        />
        {/* <textarea
          type="text"
          name="ingredients"
          onChange={changeHandler}
          placeholder="Ingredients"
          value={recipe.ingredients}
        />
        <textarea
          type="text"
          name="instructions"
          onChange={changeHandler}
          placeholder="Instructions"
          value={recipe.instructions}
        /> */}
        <button>Update</button>
      </form>
    </div>
  );
};

export default UpdateRecipe;