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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  //const testapi = axios.get(API_TEST);

  //console.log(testapi);

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
      </Routes>
    </Router>
  );
}
export default App;
