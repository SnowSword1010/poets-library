import React, { useState, useContext } from "react";
import axios from "axios";
import UserContext from "./context/UserContext";
import { useHistory } from "react-router-dom";
import LogInToContinue from "./LogInToContinue";

export default function MyPoetries(){
    const {poetData} = useContext(UserContext);
    
    return (
        poetData.poet ?
        <div><h1>Draft code here</h1></div>
        :
        <LogInToContinue></LogInToContinue>
    )
}