import React, { useState, useContext } from "react";
import axios from "axios";
import UserContext from "./context/UserContext";
import { useHistory } from "react-router-dom";
import Continue from "./LogInToContinue";

function Quote() {

    const { poetData } = useContext(UserContext);
    const history = useHistory();

    return (
        poetData.poet ?
        <div>
            <h1>Quote code here!</h1>
        </div>
        :
        <Continue></Continue>
    );
}

export default Quote; 