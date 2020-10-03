import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom"; import axios from "axios";
import UserContext from "./context/UserContext";
import { useHistory } from "react-router-dom";

function PublishMessage(){
    const { poetData, setPoetData } = useContext(UserContext);
    useEffect(() => {
        const penName = poetData.poet.penName;
        const draft_no = window.location.pathname.split('/')[2];
        console.log(draft_no);
        console.log(penName);
        axios.get("http://localhost:5000/publish/" + penName + "/" + draft_no)
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);
    return(
        <h1>Namaste</h1>
    )
}

export default PublishMessage;