import React, { useState, useContext } from "react";
import RhymeCard from "./RhymeCard";
import Word from "./Word";
import axios from "axios";
import UserContext from "./context/UserContext";
import { useHistory } from "react-router-dom";
import LogInToContinue from "./LogInToContinue";

function RhymingTool() {

    const { poetData } = useContext(UserContext);
    const { history } = useHistory();

    // listOfRhymes is an array of containing the rhyming words of the word inputted by the user. This array has been initialised to an empty array []
    // setRhymes is a function that can be used to modify the array listOfRhymes
    const [listOfRhymes, setRhymes] = useState([]);

    // fetchedRhymes is the array of rhyming words of the inputted word.
    function showRhymes(fetchedRhymes) {
        // Updates the value of the array listOfRhymes to the rhyming words obtained.
        setRhymes(fetchedRhymes);
    }
    function handleClick(e){
        e.preventDefault();
        console.log(e);
    }
    return (
        poetData.poet ?
        <div>
            <Word onShowRhymes={showRhymes}></Word>
            {/* Creating a RhymeCard for each of the rhyming word */
                //renderWords(listOfRhymes)
            }
            <div className="row">
                {listOfRhymes.map((element) => <div className="col-lg-2"><div onClick={handleClick}><RhymeCard name={element}></RhymeCard></div></div>)}
            </div>
        </div>
        :
        <LogInToContinue></LogInToContinue>
    )
}


export default RhymingTool;