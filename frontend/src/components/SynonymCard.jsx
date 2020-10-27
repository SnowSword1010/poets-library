import React, { useState, useContext } from "react";
import RhymeCard from "./RhymeCard";
import Word from "./Word";
import axios from "axios";
import UserContext from "./context/UserContext";
import { useHistory } from "react-router-dom";
import LogInToContinue from "./LogInToContinue";
import SynonymWord from "./SynonymWord";

export default function SynonymCard (props) {
    return(
        <div className = "rhymeCard"><span>{props.synonym}</span></div>
    )
}