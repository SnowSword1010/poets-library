import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import UserContext from "./context/UserContext";
import { useHistory } from "react-router-dom";
import LogInToContinue from "./LogInToContinue";
import PoemCard from "./PoemCard";



function MyPoetries() {
    const [listOfDrafts, setListOfDrafts] = useState([]);
    const [arr, setarr] = useState([]);
    const { poetData, setPoetData } = useContext(UserContext);

    useEffect(() => {
        try {
            const obj = poetData;
            if (obj !== undefined) {
                axios('http://localhost:5000/mypoetries', {
                    method: 'post',
                    data: { penName: obj.poet.penName }
                })
                    .then(response => {
                        setListOfDrafts(response.data);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
        catch (err) {
            console.log(err);
            setarr([1]);
        }
    }, [arr]);
    console.log(listOfDrafts);

    function handleClick(e)
    {
        console.log(e);
    }

    return (
        poetData.poet ?
            <div><h2>{listOfDrafts.map(element => <PoemCard penName={poetData.poet.penName} s_no={element.draft_id} title={JSON.stringify(element.draft_title).split('\n').map(i => {return <p>{i}</p>})} poem={JSON.stringify(element.draft_content).split('\n').map(i => {return <p>{i}</p>})}></PoemCard>)}</h2></div>
            :
            <LogInToContinue></LogInToContinue>
    )
}
export default MyPoetries; 