import logo from "../logo.svg";
import "../App.css";
import { API_TEST } from "../utils/constant";
import axios from "axios";
import Header from "./Header";
import UserProfile from "./UserProfile";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

function App() {
  const testapi = axios.get(API_TEST);

  console.log(testapi);

  /* Routes the webpages from the main registration menu to the user profile */
  return (
    <Router>
      <Routes>
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/" element={<Header />} />
      </Routes>
    </Router>
  );
}
export default App;
