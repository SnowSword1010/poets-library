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

    return (
        poetData.poet ?
            <div><h2>{listOfDrafts.map((element, idx) => <PoemCard penName={poetData.poet.penName} index={idx} s_no={element.draft_id} title={element.draft_title} poem={element.draft_content}></PoemCard>)}</h2></div>
            :
            <LogInToContinue></LogInToContinue>
    )
}
export default MyPoetries; 