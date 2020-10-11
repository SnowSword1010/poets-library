import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom"; import axios from "axios";
import UserContext from "./context/UserContext";
import { useHistory } from "react-router-dom";

export default function Comment(props) {
    const { poetData, setPoetData } = useContext(UserContext);
    const [replies, setReplies] = useState([]);
    function handleSubmit(event) {
        event.preventDefault();
        event.persist();
        const data = {
            poetryId: window.location.pathname.split('/')[2],
            commentId: props.commentId,
            penName: poetData.poet.penName,
            reply: event.target.getElementsByClassName('reply-box-pop-up')[0].getElementsByClassName('form-control')[0].value
        }
        console.log(data);
        axios.post("http://localhost:5000/replies", data)
            .then(response => {
                console.log(response);
            })
    }

    function showReplyBox() {
        document.getElementsByClassName("reply-box-pop-up")[props.idx].innerHTML = "<textarea cols = '2' rows = '2' name='text' id='text_id' class='form-control' style='resize:vertical' ></textarea><button>Post</button>";
    }

    function showReplies() {
        if (replies.length == 0) {
            const data = {
                poetryId: window.location.pathname.split('/')[2],
                commentId: props.commentId,
                penName: poetData.poet.penName
            }
            axios.post("http://localhost:5000/showReplies", data)
                .then(response => {
                    setReplies(response.data);
                })
        }
        else {
            setReplies([]);
        }
    }

    return (
        <div>
            <h4>{props.commenter}   <button onClick={showReplyBox}>Reply</button></h4>
            <form onSubmit={handleSubmit}><div id="reply-box-pop-up" className="reply-box-pop-up"></div></form>
            <p>{props.comment}</p>
            <button onClick={showReplies}>View Replies</button>
            {replies.map(element => {
                return <div><h1>{element.replier_penName}</h1><p>{element.reply}</p></div>
            })}
        </div>
    )
}