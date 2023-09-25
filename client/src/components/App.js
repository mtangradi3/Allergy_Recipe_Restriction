import logo from '../logo.svg';
import '../App.css';
import {API_TEST} from "../utils/constant";
import axios from 'axios';
function App() {

 const testapi = axios.get(API_TEST)

    console.log(testapi)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
export default App;
