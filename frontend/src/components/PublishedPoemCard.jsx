import React, { useState, useContext, useEffect} from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios from "axios";
import UserContext from "./context/UserContext";
import { useHistory } from "react-router-dom";

export default function PublishedPoemCard(props){
    return (
        <div className = "publishedPoemCard">
            <div className="publishedPoemCardTitle">{props.title}</div>
            <div className="publishedPoemCardPoem">{props.poem}</div>
            <div className="publishedPoemCardPenName">-{props.penName}</div>
            <Link className="publishedPoemCardShow" to={"/show/"+props.id}><div>Show</div></Link>
        </div>
    )
}