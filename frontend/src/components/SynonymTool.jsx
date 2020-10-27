import React, { useState, useContext } from "react";
import RhymeCard from "./RhymeCard";
import Word from "./Word";
import axios from "axios";
import UserContext from "./context/UserContext";
import { useHistory } from "react-router-dom";
import LogInToContinue from "./LogInToContinue";
import SynonymWord from "./SynonymWord";
import SynonymCard from "./SynonymCard";

export default function SynonymTool(){
    const { poetData } = useContext(UserContext);
    const { history } = useHistory();
    const [listOfSynonyms, setSynonyms] = useState([]);

    // fetchedRhymes is the array of rhyming words of the inputted word.
    function showSynonyms(fetchedSynonyms) {
        // Updates the value of the array listOfRhymes to the rhyming words obtained.
        setSynonyms(fetchedSynonyms);
        console.log(listOfSynonyms);
    }
    function handleClick(e) {
        e.preventDefault();
        console.log(e);
    }
    return (
        poetData.poet ?
            <div>
                <SynonymWord onShowSynonyms={showSynonyms}></SynonymWord>
                {/* Creating a RhymeCard for each of the rhyming word */
                    //renderWords(listOfRhymes)
                }
                <div className="row">
                    {listOfSynonyms.map((element, idx) => <div className="col-lg-2" onClick={handleClick}><SynonymCard synonym={element}></SynonymCard></div>)}
                </div>
            </div>
            :
            <LogInToContinue></LogInToContinue>
    )
}