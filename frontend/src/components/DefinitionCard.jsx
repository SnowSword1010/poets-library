import React, { useState, useContext } from "react";
import RhymeCard from "./RhymeCard";
import Word from "./Word";
import axios from "axios";
import UserContext from "./context/UserContext";
import { useHistory } from "react-router-dom";
import LogInToContinue from "./LogInToContinue";
import DefinitionWord from "./DefinitionWord";

export default function DefinitionCard (props){
    return(
        <div className="definitionCard">
            <div></div>
            <div><div className="definitionCardNumber">{props.number}</div><div className="definitionCardPartOfSpeech">{props.partOfSpeech}</div></div>
            <div className="definitionCardDefinition">{props.definition}</div>
        </div>
    )
}