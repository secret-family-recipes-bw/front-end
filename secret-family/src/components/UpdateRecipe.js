import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";
import styled from 'styled-components';


const UpdateRecipeDiv = styled.div `
    background-color: #D4A59A;
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

const UpdateInput = styled.input `
    padding: 0.5em;
    margin: 0.5em;
    background: papayawhip;
    border: none;
    border-radius: 3px;
`;

const Button = styled.button `
    font-size: 0.75em;
    margin: 0.5em;
    padding: 0.5em;
    border: 1px solid black;
    border-radius: 3px;
`;

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
    <UpdateRecipeDiv>
      <h2>Update Recipe</h2>
      <form onSubmit={handleSubmit}>
        <UpdateInput
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
        <Button>Update</Button>
      </form>
    </UpdateRecipeDiv>
  );
};

export default UpdateRecipe;