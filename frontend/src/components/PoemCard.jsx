import React, { useState, useContext, useEffect} from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios from "axios";
import UserContext from "./context/UserContext";
import { useHistory } from "react-router-dom";

export default function PoemCard(props){
    return (
        <div>
            <Link to={"/edit/"+props.s_no}>Edit</Link>
            <h4>{props.title}</h4>
            <p>{props.poem}</p>
        </div>
    )
}