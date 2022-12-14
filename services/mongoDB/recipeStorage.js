import React from "react";

// recipes context
export const RecipesContext = React.createContext();

//db url
const dbUrl = "https://glacial-refuge-38575.herokuapp.com";

// Store recipes in MongoDB
export const saveRecipe = (recipe) => {
  var formdata = new FormData();
  formdata.append("userId", recipe.userId);
  formdata.append("userName", recipe.userName);
  formdata.append("name", recipe.name);
  formdata.append("calories", recipe.calories);
  formdata.append("totalTime", recipe.totalTime);
  formdata.append("prepTime", recipe.prepTime);
  formdata.append("description", recipe.description);
  formdata.append("ingredients", JSON.stringify(recipe.ingredients));
  formdata.append("servings", recipe.servings);
  formdata.append("directions", JSON.stringify(recipe.directions));
  formdata.append("type", recipe.type);
  formdata.append("category", recipe.category);
  formdata.append("picture", {
    uri: recipe.image.uri,
    name: recipe.image.uri.split("/").pop(),
    type: platform === "android" ? mime.getType(image.uri) : "jpeg",
    filepath: recipe.image.uri,
    originalFilename: recipe.image.uri.split("/").pop(),
  });

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch(`${dbUrl}/saveRecipe`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

// Get recipes from MongoDB
export const getRecipes = (setResults, setRecipesLoading) => {
  var formdata = new FormData();
  formdata.append("servings", "0");

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch("https://glacial-refuge-38575.herokuapp.com/getRecipes", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      setResults(result);
      setRecipesLoading(false);
      return result;
    })
    .catch((error) => console.log("error", error));
};

// Get recipe image from MongoDB
export const getRecipeImage = (recipeId, setImage) => {
  var formdata = new FormData();

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch(
    `https://glacial-refuge-38575.herokuapp.com/getRecipeImage?recipeId=${recipeId}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => setImage((prev) => [...prev, result.image]))
    .catch((error) => console.log("error", error));
};
