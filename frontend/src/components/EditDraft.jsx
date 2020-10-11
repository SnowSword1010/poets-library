import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom"; import axios from "axios";
import UserContext from "./context/UserContext";
import { useHistory } from "react-router-dom";
import Typist from 'react-typist';

function EditDraft() {
    const { poetData, setPoetData } = useContext(UserContext);
    const [title, setTitle] = useState("");
    const [poem, setPoem] = useState("");
    useEffect(() => {
        const penName = poetData.poet.penName;
        const draft_no = window.location.pathname.split('/')[2];
        axios.get("http://localhost:5000/edit/" + penName + "/" + draft_no)
            .then(response => {

                setTitle(response.data.draft_title);
                setPoem(response.data.draft_content);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    function handleTitleChange(e) {
        setTitle(e.target.value);
    }

    function handlePoemChange(e) {
        setPoem(e.target.value);
    }

    function handleSubmitClick(event) {
        event.preventDefault();
        event.persist();
        const poetry = {
            title: event.target.getElementsByClassName('form-group')[0].getElementsByClassName('form-control')[0].value,
            poem: event.target.getElementsByClassName('form-group')[0].getElementsByClassName('form-control')[1].value,
            penName: poetData.poet.penName
        }
        const penName = poetData.poet.penName;
        const draft_no = window.location.pathname.split('/')[2];
        axios.post("http://localhost:5000/update/" + penName + "/" + draft_no, poetry)
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            })
    }

    function TypwriterHeading() {
        return (
            <Typist>
                Type Your Poetry Here
            </Typist>
        );
    }
    return (
        <div>
            <h1 className="new-poetry-heading"><TypwriterHeading></TypwriterHeading></h1>
            <form method="post" action="/newpoetry" onSubmit={handleSubmitClick} className="new-poetry-form">
                <div className="form-group">
                    <input type="text" className="form-control new-poetry-form-title" id="exampleFormControlInput1" placeholder="Title" value={title} onChange={handleTitleChange} required></input>
                    <textarea className="form-control new-poetry-form-content" id="exampleFormControlTextarea1" rows="50" placeholder="content" value={poem} onChange={handlePoemChange} required></textarea>
                    <button type="submit" class="btn btn-dark mb-2">Edit Draft</button>
                </div>
            </form>
        </div>
    )
}

export default EditDraft;