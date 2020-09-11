import React, { useState, useContext } from "react";
import axios from "axios";
import UserContext from "./context/UserContext";
import { useHistory } from "react-router-dom";

function RhymeCard(props) {
    return (
        <div className = "rhymeCard"><span>{props.name}</span></div>
    );
}

export default RhymeCard;