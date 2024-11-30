import { useState } from "react";
import { useStore } from "../useStore";

interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string;
}

const RecipeApp = () => {
  const { recipes, addRecipe, removeRecipe } = useStore();
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);

  const handleUpdateRecipe = () => {
    if (
      name.trim() === "" ||
      ingredients.trim() === "" ||
      instructions.trim() === ""
    ) {
      return;
    }

    if (editingRecipe) {
      removeRecipe(editingRecipe.id);
      addRecipe({
        id: Date.now(),
        name,
        ingredients: ingredients
          .split(",")
          .map((ingredient) => ingredient.trim()),
        instructions,
      });
      setEditingRecipe(null);
    }
    setName("");
    setIngredients("");
    setInstructions("");
  };
  const handleEditRecipe = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setName(recipe.name);
    setIngredients(recipe.ingredients.join(", "));
    setInstructions(recipe.instructions);
  };
  const handleCancelEdit = () => {
    setEditingRecipe(null);
    setName("");
    setIngredients("");
    setInstructions("");
  };
  const handleAddRecipe = () => {
    if (
      name.trim() === "" ||
      ingredients.trim() === "" ||
      instructions.trim() === ""
    ) {
      return;
    }

    addRecipe({
      id: Date.now(),
      name,
      ingredients: ingredients
        .split(",")
        .map((ingredient) => ingredient.trim()),
      instructions,
    });
    setName("");
    setIngredients("");
    setInstructions("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-200 ">
      <div className=" p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center  text-blue-800 ">
          Recipe Book
        </h1>
        <div className="space-y-4 mb-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Recipe Name"
            className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 "
          />
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Ingredients"
            className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 "
          />
          <input
            type="text"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Instructions"
            className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 "
          />

          <div className="flex justify-between">
            {editingRecipe ? (
              <>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={handleUpdateRecipe}
                >
                  Update Recipe
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:blue-yellow-500"
                  onClick={handleAddRecipe}
                >
                  Add Recipe
                </button>
              </>
            )}
          </div>
        </div>
        <ul className="space-y-4">
          {recipes.map((recipe) => (
            <li className="p-4 bg-blue-50 rounded-lg shadow-sm" key={recipe.id}>
              <h2 className="text-xl font-semibold text-green-800 mb-2">
                {recipe.name}
              </h2>
              <p className="text-gray-700 mb-2">
                <strong>Ingredients: </strong>
                {recipe.ingredients.join(",")}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Instructions: </strong> {recipe.instructions}
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleEditRecipe(recipe)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => removeRecipe(recipe.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipeApp;
