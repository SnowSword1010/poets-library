import React, { useState, useContext } from "react";
import RhymeCard from "./RhymeCard";
import Word from "./Word";
import axios from "axios";
import UserContext from "./context/UserContext";
import { useHistory } from "react-router-dom";
import LogInToContinue from "./LogInToContinue";
import DefinitionWord from "./DefinitionWord";
import DefinitionCard from "./DefinitionCard";

export default function DefinitionTool() {
    const { poetData } = useContext(UserContext);
    const { history } = useHistory();
    const [listOfDefinitions, setDefinitions] = useState([]);

    // fetchedRhymes is the array of rhyming words of the inputted word.
    function showDefinitions(fetchedDefinitions) {
        // Updates the value of the array listOfRhymes to the rhyming words obtained.
        setDefinitions(fetchedDefinitions);
        console.log(listOfDefinitions);
    }
    function handleClick(e) {
        e.preventDefault();
        console.log(e);
    }
    console.log("Defintion: "+listOfDefinitions);
    return (
        poetData.poet ?
            <div>
                <DefinitionWord onShowDefinitions={showDefinitions}></DefinitionWord>
                {/* Creating a RhymeCard for each of the rhyming word */
                    //renderWords(listOfRhymes)
                }
                <div className="">
                    {listOfDefinitions.map((element, idx) => <div onClick={handleClick}><DefinitionCard number={idx+1} definition={element.definition} partOfSpeech={element.partOfSpeech}></DefinitionCard></div>)}
                </div>
            </div>
            :
            <LogInToContinue></LogInToContinue>
    )
}