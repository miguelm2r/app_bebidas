import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createRecipesSlice, RecipesSlideType } from "./recipeSlice";
import { FavoritesSliceType, createFavoriteSlice } from "./favoritesSlice";
import {
  createNotificationSlice,
  NotificationSliceType,
} from "./notificationSlice";

// Creamos el store principal
// Le pasamos "a" que son los argumentos set, get y api
// Le decimos que va a ser del type RecipesSlideType
export const useAppStore = create<
  RecipesSlideType & FavoritesSliceType & NotificationSliceType
>()(
  devtools((...a) => ({
    ...createRecipesSlice(...a),
    ...createFavoriteSlice(...a),
    ...createNotificationSlice(...a),
  }))
);
