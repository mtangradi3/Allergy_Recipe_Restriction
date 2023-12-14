import React, { useState, useEffect } from "react";
import "../../styles/Buttons.css";
import { getUserFavoritesMeal } from "../../api/userAPI";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllMeals, getMealIngredients } from "../../api/mealAPI";
import allMeals from "./AllMeals"; // Import the function to fetch meal details

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [mealImages, setMealImages] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { email, firstName, lastName } = location.state || {};

  async function fetchUserFavoritesMeal(email) {
    try {
      const data = await getUserFavoritesMeal(email);
      const allMealWImages = await getAllMeals(email);
      const images = allMealWImages.map((meal) => ({
        mealImage: meal.meal_image,
        mealName: meal.meal_name,
      }));
      setMealImages(images);

      const favoritesWithIds = data.map((favorite, index) => ({
        id: index + 1,
        name: favorite,
      }));
      return favoritesWithIds;
    } catch (error) {
      console.error("Error fetching favorites:", error);
      return [];
    }
  }

  useEffect(() => {
    fetchUserFavoritesMeal(email)
        .then((data) => {
          setFavorites(data);
        })
        .catch((error) => {
          console.error("Error fetching favorites:", error);
        });
  }, [email]);

  const handleFavoriteClick = async (favorite) => {
    try {
      // Fetch detailed meal information based on the favorite name
      const detailedMeal = await getMealIngredients(favorite.name);

      if (detailedMeal) {
        const mealData = {
          meal_name: favorite.name,
          ingredients: detailedMeal,
          // Other necessary fields...
        };

        navigate(`/meal-details/${favorite.name}`, {
          state: { email, meal: mealData, favorites, firstName, lastName },
        });
      } else {
        console.error("Meal details not found");
      }
    } catch (error) {
      console.error("Error fetching meal details:", error);
    }
  };

  return (
      <div>
        <h1>Favorites Page</h1>
        <ul>
          {favorites.length > 0 ? (
              favorites.map((favorite) => {
                const imageObj = mealImages.find(
                    (image) => image.mealName === favorite.name
                );
                return (
                    <li
                        key={favorite.id}
                        onClick={() => handleFavoriteClick(favorite)}
                        className="favorite-item"
                    >
                      <img
                          src={`data:image/jpeg;base64, ${imageObj ? imageObj.mealImage : ""}`}
                          alt={favorite.name}
                          width="100"
                          height="100"
                      />
                      {favorite.name}
                    </li>
                );
              })
          ) : (
              <li>No favorites found</li>
          )}
        </ul>
      </div>
  );
}

export default Favorites;
