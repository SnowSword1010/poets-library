import React, { useState } from "react";
import RhymeCard from "./RhymeCard";
import Word from "./Word";
import ReactDOM from "react-dom";

function RhymingTool() {
    // listOfRhymes is an array of containing the rhyming words of the word inputted by the user. This array has been initialised to an empty array []
    // setRhymes is a function that can be used to modify the array listOfRhymes
    const [listOfRhymes, setRhymes] = useState([]);

    // fetchedRhymes is the array of rhyming words of the inputted word.
    function showRhymes(fetchedRhymes) {
        // Updates the value of the array listOfRhymes to the rhyming words obtained.
        setRhymes(fetchedRhymes);
    }
    return (
        <div>
            <Word onShowRhymes={showRhymes}></Word>
            {/* Creating a RhymeCard for each of the rhyming word */
                //renderWords(listOfRhymes)
            }
            <div className="row">
                {listOfRhymes.map((element) => <div className="col-lg-2"><RhymeCard name={element}></RhymeCard></div>)}
            </div>
        </div>
    )
}

export default RhymingTool;