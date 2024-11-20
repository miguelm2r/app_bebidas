import { StateCreator } from "zustand";
import {
  getCategories,
  getRecipeById,
  getRecipes,
} from "../services/RecipeService";
import type { Categories, Drink, Drinks, Recipe } from "../types";
import { SearchFilter } from "../types/index";

// Asignamos el type
export type RecipesSlideType = {
  categories: Categories;
  drinks: Drinks;
  selectedRecipe: Recipe;
  modal: boolean;
  fetchCategories: () => Promise<void>;
  searchRecipes: (searchFilter: SearchFilter) => Promise<void>;
  selectRecipe: (id: Drink["idDrink"]) => Promise<void>;
  closeModal: () => void;
};

// Con state creator creamos el state y le decimos el type que va a tener
export const createRecipesSlice: StateCreator<RecipesSlideType> = (set) => ({
  categories: {
    drinks: [],
  },
  drinks: {
    drinks: [],
  },
  selectedRecipe: {} as Recipe,
  modal: false,
  fetchCategories: async () => {
    // Funcion para llamar a la API que obtiene las categorias
    const categories = await getCategories();
    //console.log(categories);
    // Escribimos en el state con set
    set({
      categories,
    });
  },
  // Buscar recetas
  searchRecipes: async (filters) => {
    const drinks = await getRecipes(filters);
    set({
      drinks,
    });
  },
  // Seleccionar una receta y llamar a la API
  selectRecipe: async (id) => {
    //console.log("desde select");
    const selectedRecipe = await getRecipeById(id);
    //console.log(selectedRecipe);
    set({
      selectedRecipe,
      modal: true,
    });
  },
  // Cerrar el modal
  closeModal: () => {
    set({
      modal: false,
    });
    setTimeout(() => {
      set({
        selectedRecipe: {} as Recipe,
      });
    }, 300);
  },
});
