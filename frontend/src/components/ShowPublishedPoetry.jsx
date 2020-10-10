import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom"; import axios from "axios";
import UserContext from "./context/UserContext";
import { useHistory } from "react-router-dom";
import Comment from "./Comment";

export default function ShowPublishedPoetry() {

    const { poetData, setPoetData } = useContext(UserContext);
    const poetry_id = (window.location.pathname.split('/')[2]);
    const [poemTitle, setPoemTitle] = useState("");
    const [poemContent, setPoemContent] = useState("");
    const [comments, setComments] = useState([]);
    const [poet, setPoet] = useState("");
    useEffect(() => {
        axios.get("http://localhost:5000/show/" + poetry_id)
            .then(response => {
                setPoemTitle(response.data[0].poetry_title);
                setPoemContent(response.data[0].poetry_content);
                setPoet(response.data[0].poet_name);
                console.log("1");
            })
    }, [])

    useEffect(() => {
        axios.get("http://localhost:5000/comments/" + poetry_id)
            .then(response => {
                if(!response.data){
                    setComments([]);
                }
                else
                {
                    setComments(response.data.comments);
                }
            })
    },[])

    function handleSubmit(event) {
        event.preventDefault();
        event.persist();
        const commentData = {
            comment: event.target.getElementsByClassName('form-control')[0].value,
            poetry_id: poetry_id,
            commenterName: poetData.poet.penName
        }
        axios.post("http://localhost:5000/comment/" + poetry_id, commentData)
            .then(response => setComments(response.data.comments));
    }
    console.log(comments);
    return (
        <div>
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Title" value={poemTitle}></input>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="50" placeholder="content" value={poemContent}></textarea>
            <p>-{poet}</p>
            <form onSubmit={handleSubmit}>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" placeholder="Write a comment"></textarea>
                <button type="submit" class="btn btn-dark mb-2">Post</button>
            </form>
            <div>{comments.map((element, idx) => { return (<Comment idx = {idx} commentId={element._id} commenter={element.commenter} comment={element.comment} replies={element.replies}></Comment>) })}</div>
        </div>
    )
}