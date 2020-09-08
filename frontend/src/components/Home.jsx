import React, { useState, useContext } from "react";
import axios from "axios";
import UserContext from "./context/UserContext";
import { useHistory } from "react-router-dom";

function Home() {
    return(
    <div><h1>This is the landing workspace</h1></div>
    )
}

export default Home;