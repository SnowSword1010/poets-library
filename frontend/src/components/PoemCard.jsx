import React, { useState, useContext, useEffect} from "react";
import axios from "axios";
import UserContext from "./context/UserContext";
import { useHistory } from "react-router-dom";

export default function PoemCard(props){
    return (
        <div>
            <h4>{props.title}</h4>
            <p>{props.poem}</p>
        </div>
    )
}