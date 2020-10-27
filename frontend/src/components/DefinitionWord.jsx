import React, { useState, useContext } from "react";
import axios from "axios";
import UserContext from "./context/UserContext";
import { useHistory } from "react-router-dom";
import { FaLightbulb } from "react-icons/fa";

// import ArrowDownwardTwoToneIcon from './@material-ui/icons/ArrowDownwardTwoTone';

// Word is the name of the functional compnent comprising of the input box (in which the user will input his desired word) and the submit button
function DefintionWord(props) {
    // word represents the state of value of the input box
    // setWord is used to change the state of word
    const [word, setWord] = useState({
        // the object word constains a property called value which is intialised to an empty string
        value: ""
    });

    // The function handleChange takes care of change of values in the input field and updates it accordingly
    function handleChange(event) {
        // sets the value of word to what's typed in the input field
        setWord(event.target.value);
    }

    function handleSubmit(event) {

        // The constant inputWord stores the word inputted by the user in the textbox
        const inputWord = event.target.getElementsByClassName('inputWord').word.value;

        // The variable rhymingWords stores the 
        // let rhymingWords = [];
        // *********************** API REQUEST TO RAPID API **************************** //
        axios({
            "method": "GET",
            "url": "https://wordsapiv1.p.rapidapi.com/words/"+inputWord+"/definitions",
            "headers": {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
                "x-rapidapi-key": process.env.REACT_APP_WORDS_API_KEY,
                "useQueryString": true
            }
        })
            .then((response) => {
                // console.log(response.data)
                props.onShowDefinitions(response.data.definitions);
            })
            .catch((error) => {
                console.log(error)
            })

        // **************************************************************************** //

        // The default action after submitting a form is to reload the page. The preventDefault method prevents that.
        event.preventDefault();
    }

    return (
        <div>
            <form className="wordForm" onSubmit={handleSubmit}>
                <input className="inputWord" name="word" onChange={handleChange} placeholder="I want the definition of"></input>
                <button type="submit" className="bulb-icon">{/* <ArrowDownwardTwoToneIcon /> */} <FaLightbulb className="bulb-icon"></FaLightbulb></button>
            </form>
        </div>
    )
}
export default DefintionWord;