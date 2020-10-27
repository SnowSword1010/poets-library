import React, { useState, useContext } from "react";
import RhymeCard from "./RhymeCard";
import Word from "./Word";
import axios from "axios";
import UserContext from "./context/UserContext";
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

export default function LiteraryToolbox() {
    return (
        <div className="row">
            <div className="col-lg-4"><Link to="/rhymingtool"><button className="btn btn-lg btn-dark literaryToolboxButtons literaryToolboxButtons1">Rhyming Tool</button></Link></div>
            <div className="col-lg-4"><Link to="/definitiontool"><button className="btn btn-dark btn-lg literaryToolboxButtons literaryToolboxButtons2">Definition Tool</button></Link></div>
            <div className="col-lg-4"><Link to="/synonymtool"><button className="btn btn-lg btn-dark literaryToolboxButtons literaryToolboxButtons3">Synonym Tool</button></Link></div>
        </div>
    )
}