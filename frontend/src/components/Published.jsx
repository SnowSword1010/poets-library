import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom"; import axios from "axios";
import UserContext from "./context/UserContext";
import { useHistory } from "react-router-dom";
import PublishedPoemCard from "./PublishedPoemCard";
import LogInToContinue from "./LogInToContinue";

function Published() {
    const { poetData, setPoetData } = useContext(UserContext);
    const [publishedPoetries, setPublishedPoetries] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/published")
            .then(response => {
                setPublishedPoetries(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (poetData.poet ?
        <h1>{publishedPoetries.map(element => { return (<PublishedPoemCard id={element.poetry_id} title={element.poetry_title} poem={element.poetry_content} penName={element.poet_name}></PublishedPoemCard>) })}</h1>
        : <LogInToContinue></LogInToContinue>)
}
export default Published;