import React, { useState } from "react";
// import ArrowDownwardTwoToneIcon from './@material-ui/icons/ArrowDownwardTwoTone';

// Word is the name of the functional compnent comprising of the input box (in which the user will input his desired word) and the submit button
function Word(props) {
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
        
        fetch("https://wordsapiv1.p.rapidapi.com/words/"+inputWord+"/rhymes", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
                // ENV variable to secure API KEY
                "x-rapidapi-key": process.env.REACT_APP_WORDS_API_KEY
            }
        })
            .then(response => response.json())
            .then(function (data) {
                props.onShowRhymes(data.rhymes.all);
                // console.log(data.rhymes.all);
            })
            .catch(err => {
                console.log(err);
            });
        // **************************************************************************** //
        
        // The default action after submitting a form is to reload the page. The preventDefault method prevents that.
        event.preventDefault();
    }

    return (
        <div>
            <form className = "wordForm" onSubmit={handleSubmit}>
                <input className = "inputWord" name="word" onChange={handleChange} placeholder="I want rhyming words for"></input>
                <button type="submit">{/* <ArrowDownwardTwoToneIcon /> */} Submit</button>
            </form>
        </div>
    )
}
export default Word;