import logo from '../logo.svg';
import '../App.css';
import {API_TEST} from "../utils/constant";
import axios from 'axios';

/* Creates a window */
function Window() {
    return(
        <div className="window">
            <div className="window-header">
            <span className="window-title">Allergy Recipe Portal</span>
            <button className="window-close-button">X</button>
        </div>
        <div className="window-content">
            {/* Your content goes here*/}
            <p>This is the content of the window.</p>
        </div>
        </div>
    );
}

export default Window;