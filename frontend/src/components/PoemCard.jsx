import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios from "axios";
import UserContext from "./context/UserContext";
import { useHistory } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';

export default function PoemCard(props) {

    const { poetData, setPoetData } = useContext(UserContext);
    let history = useHistory();
    function handleDeleteClick(e) {
        // console.log(props.index)
        // console.log(poetData.poet.penName);
        axios.post("http://localhost:5000/deletedraft", { penName: poetData.poet.penName, idx: props.index })
            .then(res => {
                history.push("/");
            })
            .catch(err => {
                console.log(err);
            })
    }

    const maxTextAreaLength = 100
    const state = props.poem.slice(0, maxTextAreaLength - 3);
    let rowCount = 2;
    for (let i = 0; i < maxTextAreaLength - 3; i++) {
        if (state[i] == "\n") {
            rowCount++;
        }
    }

    return (
        <div className="poem-card">
            <div className="poem-card-title">{props.title}</div>
            <div className="poem-card-textarea-div"><textarea value={state + "..."} rows={rowCount} className="poem-card-textarea" maxLength={maxTextAreaLength} readOnly></textarea></div>
            <div>
                <Link to={"/edit/" + props.s_no}><EditOutlinedIcon className="poem-card-buttons-edit"></EditOutlinedIcon></Link>
                <DeleteIcon className="poem-card-buttons-delete" onClick={handleDeleteClick}></DeleteIcon>
                <Link to={"/publish/" + props.s_no}><ReceiptOutlinedIcon className="poem-card-buttons-publish"></ReceiptOutlinedIcon></Link>
            </div>
            {/* <div className="hey">
                
            </div> */}
        </div>
    )
}