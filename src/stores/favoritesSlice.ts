import { StateCreator } from "zustand";
import { Recipe } from "../types";
import {
  createNotificationSlice,
  NotificationSliceType,
} from "./notificationSlice";

// Los favoritos seran un arreglo de recetas
export type FavoritesSliceType = {
  favorites: Recipe[];
  handleClickFavorite: (recipe: Recipe) => void;
  favoriteExists: (id: Recipe["idDrink"]) => boolean;
  loadFromStorage: () => void;
};

// Creamos el slice
export const createFavoriteSlice: StateCreator<
  FavoritesSliceType & NotificationSliceType,
  [],
  [],
  FavoritesSliceType
> = (set, get, api) => ({
  favorites: [],
  handleClickFavorite: (recipe) => {
    if (get().favoriteExists(recipe.idDrink)) {
      // Si existe lo eliminamos con filter
      set((state) => ({
        favorites: state.favorites.filter(
          (favorite) => favorite.idDrink !== recipe.idDrink
        ),
      }));
      createNotificationSlice(set, get, api).showNotification({
        text: "Se elimino correctamente",
        error: true,
      });
    } else {
      // No existe y lo agregamos
      set((state) => ({
        favorites: [...state.favorites, recipe],
      }));
      createNotificationSlice(set, get, api).showNotification({
        text: "Se añadio correctamente",
        error: false,
      });
    }
    // Guardamos en localstorage
    localStorage.setItem("favorites", JSON.stringify(get().favorites));
  },
  favoriteExists: (id) => {
    return get().favorites.some((favorite) => favorite.idDrink === id);
  },
  // Obtener desde localstorage
  loadFromStorage: () => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      set({
        favorites: JSON.parse(storedFavorites),
      });
    }
  },
});
