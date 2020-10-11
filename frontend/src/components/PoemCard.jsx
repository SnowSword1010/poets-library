import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios from "axios";
import UserContext from "./context/UserContext";
import { useHistory } from "react-router-dom";
import Card from 'react-bootstrap/Card'

export default function PoemCard(props) {
    const maxTextAreaLength = 100
    const state = props.poem.slice(0, maxTextAreaLength-3);
    console.log(state);
    return (
        <div className="poem-card">
            <h2 className="poem-card-title">{props.title}</h2>
            <textarea value={state + "..."} rows="5" className="poem-card-textarea" maxLength={maxTextAreaLength} readOnly></textarea>
            <div className="">
                <Link to={"/edit/" + props.s_no}><button type="button" className="btn btn-lg poem-card-buttons-edit">Edit</button></Link>
                <Link to={"/publish/" + props.s_no}><button type="button" className="btn btn-lg poem-card-buttons-publish">Publish</button></Link>
            </div>
        </div>
    )
}