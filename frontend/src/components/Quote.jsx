import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import UserContext from "./context/UserContext";
import { useHistory } from "react-router-dom";
import Continue from "./LogInToContinue";

function Quote() {

    const { poetData } = useContext(UserContext);
    const history = useHistory();
    const [quoteObj, setQuoteObj] = useState({
        _id: undefined,
        author: undefined,
        quote: undefined
    });

    useEffect(() => {

        const abortController = new AbortController();
        const signal = abortController.signal

        axios.get("http://localhost:5000/quote", {signal: signal}).then(response => {
            setQuoteObj({
                _id: response.data._id,
                author: response.data.author,
                quote: response.data.quote
            })
        });

        return function cleanup() {
            abortController.abort();
        }

    }, [])

    return (
        poetData.poet ?
            <div>
                <h1>{quoteObj.quote}</h1>
                <em>- {quoteObj.author}</em>
            </div>
            :
            <Continue></Continue>
    );
}

export default Quote; 