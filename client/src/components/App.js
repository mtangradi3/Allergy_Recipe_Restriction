import logo from "../logo.svg";
import "../App.css";
import { API_TEST } from "../utils/constant";
import axios from "axios";
// Components
import Allergies from "./UserProfile-Buttons/Allergies";
import Groups from "./UserProfile-Buttons/Groups";
import Favorites from "./UserProfile-Buttons/Favorites";
import Meals from "./UserProfile-Buttons/Meals";
import AllMeals from "./UserProfile-Buttons/AllMeals";
import Header from "./Header";
import UserProfile from "./UserProfile";
import CreateMeal from "./UserProfile-Buttons/CreateMeal";
import CreateIngredient from "./UserProfile-Buttons/CreateIngredient";
import CreateReview from "./UserProfile-Buttons/CreateReview";
import MealDetails from "./UserProfile-Buttons/MealDetails";
import CreateMealBasedOnIngredients from "./UserProfile-Buttons/CreateMealBasedOnIngredients";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  // const testapi = axios.get(API_TEST);

  // console.log(testapi);

  /* Routes the webpages from the main registration menu to the user profile */
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/user-profile/allergies" element={<Allergies />} />
        <Route path="/user-profile/groups" element={<Groups />} />
        <Route path="/user-profile/favorites" element={<Favorites />} />
        <Route path="/user-profile/meals" element={<Meals />} />
        <Route path="/user-profile/allmeals" element={<AllMeals />} />
        <Route path="/user-profile/create-review" element={<CreateReview />} />
        <Route path="/user-profile/create-meal-based-on-ingredients" element={<CreateMealBasedOnIngredients/>} />
        <Route path="/create-meal" element={<CreateMeal />} />
        <Route
          path="/create-meal/create-ingredient"
          element={<CreateIngredient />}
        />
        <Route path="/meal-details/:mealName" element={<MealDetails />} />
      </Routes>
    </Router>
  );
}
export default App;
