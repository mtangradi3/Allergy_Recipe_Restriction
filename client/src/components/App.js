import logo from '../logo.svg';
import '../App.css';
import {API_TEST} from "../utils/constant";
import axios from 'axios';
import Header from './Header'
import Footer from './Footer'

function App() {

 const testapi = axios.get(API_TEST)

    console.log(testapi)

  return (
    <div className="App">
        <Header />
        {/*
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
        */}
    </div>
  );
}
export default App;
