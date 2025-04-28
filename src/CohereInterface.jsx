import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Input, Typography, Button } from '@mui/material';

function CohereInterface({setBackground}) {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState("Say something to talk to Cohere");

    const inputElement = document.getElementById('messageInput');

    const sendMessage = (input) => {
        console.log(input);
        axios.post('http://localhost:3000/test', {
            //input: `Respond with the most appropriate colour in the format rgba(x,x,x,x). Respond with only the rgba. Base your colour choice off the following prompt: ${input}`
            input: input
        })
        .then(response => {
            setResponse(response.data.cohereResponse);
            //setBackground(response.data.cohereResponse);
        })
        .catch(error => {
            console.error(error);
        });
    };

    return (
        <div className="flex-col w-full">
            <Typography>{response}</Typography>
            <div className="mt-6 flex-row">
                <Input
                    className="mr-5 w-256"
                    id="messageInput"
                    onChange={() => setInput(inputElement.value)}
                />
                <Button
                variant="contained"
                onClick={() => {
                    sendMessage(inputElement.value);
                    inputElement.value = "";
                }}
                >
                    Send
                </Button>
            </div>
        </div>
    );
}

export default CohereInterface;
