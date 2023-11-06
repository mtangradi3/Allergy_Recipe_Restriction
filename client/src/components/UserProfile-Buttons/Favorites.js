import React, { useState, useRef, useEffect } from "react";
import "../../styles/Buttons.css";
import { getFavorites } from "../../api/userAPI";
import { useLocation } from "react-router-dom";

function Favorites() {
  const [favorites, setFavorites] = useState([]); // State to store the favorites data

  // Getting email from state
  const location = useLocation();
  const { email } = location.state || {};

  useEffect(() => {
    // Fetch favorites data when the component mounts
    getFavorites(email)
      .then((data) => {
        setFavorites(data);
      })
      .catch((error) => {
        console.error("Error fetching favorites:", error);
      });
  }, []);

  return (
    <div>
      <h1>Favorites Page</h1>
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite.id}>{favorite.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Favorites;
