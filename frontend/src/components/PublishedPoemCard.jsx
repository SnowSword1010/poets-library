import React, { useState, useContext, useEffect} from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios from "axios";
import UserContext from "./context/UserContext";
import { useHistory } from "react-router-dom";

export default function PublishedPoemCard(props){
    return (
        <div>
            <Link to={"/show/"+props.s_no}>Show</Link>
            <h4>{props.title}</h4>
            <p>{props.poem}</p>
            <p>-{props.penName}</p>
        </div>
    )
}