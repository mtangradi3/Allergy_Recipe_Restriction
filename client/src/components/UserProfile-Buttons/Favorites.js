import React, { useState, useEffect } from "react";
import "../../styles/Buttons.css";
import { getUserFavoritesMeal } from "../../api/userAPI";
import { useLocation } from "react-router-dom";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const location = useLocation();
  const { email } = location.state || {};

  async function fetchUserFavoritesMeal(email) {
    try {
      const data = await getUserFavoritesMeal(email); // Await the Promise

      // Assuming data is an array, you can map over it
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

  return (
    <div>
      <h1>Favorites Page</h1>
      <ul>
        {favorites.length > 0 ? (
          favorites.map((favorite) => (
            <li key={favorite.id}>{favorite.name}</li>
          ))
        ) : (
          <li>No favorites found</li>
        )}
      </ul>
    </div>
  );
}

export default Favorites;
