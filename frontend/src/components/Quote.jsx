import React, { useState, useContext, useEffect } from "react";
import { render } from 'react-dom'
import { useSpring, animated as a } from 'react-spring'

import axios from "axios";
import UserContext from "./context/UserContext";
import { useHistory } from "react-router-dom";
import Continue from "./LogInToContinue";
import LogInToContinue from "./LogInToContinue";

function Quote(props) {

  const { poetData, setPoetData } = useContext(UserContext);
  const history = useHistory();
  const [quoteObj, setQuoteObj] = useState({
    _id: undefined,
    author: undefined,
    quote: undefined
  });

  useEffect(() => {

    const abortController = new AbortController();
    const signal = abortController.signal;
    console.log("Hello");
    console.log(props.pData);
    axios.get("http://localhost:5000/quote", { signal: signal }).then(response => {
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

  function Card() {
    const [flipped, set] = useState(false)


    const { transform, opacity } = useSpring({
      opacity: flipped ? 1 : 0,
      transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
      config: { mass: 5, tension: 500, friction: 80 }
    })
    console.log(quoteObj.author);
      return (
        <div className="quoteCard" onClick={() => set(state => !state)}>
          <a.div class="c back" style={{ opacity: opacity.interpolate(o => 1 - o), transform }}><h1 class="quote">{quoteObj.quote}</h1></a.div>
          <a.div class="c front" style={{ opacity, transform: transform.interpolate(t => `${t} rotateX(180deg)`) }}>
          <div class="quoteAuthor">- {quoteObj.author}</div>
          <img className="quoteAuthorImage" src={require("./quoteImages/" + quoteObj.author + ".gif")}></img>
          </a.div>
        </div>
      )
  }

  return (
    poetData.poet ?
      <div className="quoteCardParent">
        <Card></Card>
      </div>
      :
      <LogInToContinue></LogInToContinue>
  );
}

export default Quote; 