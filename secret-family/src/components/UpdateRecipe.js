import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialRecipe = {
    title: "", 
    ingredients: "",
    instructions: "",
    image: "",
};

const UpdateRecipe = () => {
  const { id } = useParams();
  const { push, location } = useHistory();
  const [recipe, setRecipe] = useState(initialRecipe);


  useEffect(() => {
    if (location.state) {
      setRecipe(location.state);
    } else {
      axios
        .get(`https://secret-family-recipes-2-api.herokuapp.com/recipes/${id}`)
        .then(res => {
            console.log("data", res.data) 
            setRecipe(res.data)
        })
        .catch(err => console.log(err));
    }
  }, []);

  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;

    setRecipe({
      ...recipe,
      [ev.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${recipe.id}`, recipe)
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
          value={recipe.title}
        />
        <textarea
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
        />
        <button>Update</button>
      </form>
    </div>
  );
};

export default UpdateRecipe;