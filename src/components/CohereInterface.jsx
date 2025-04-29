import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import { Input, Typography, Button } from '@mui/material';

function CohereInterface() {
    const [response, setResponse] = useState("Say something to talk to Cohere");
    const [loading, setLoading] = useState(false);

    const inputElement = useRef();

    document.addEventListener("keydown", (e) => {
        if (e.code == "Enter") {
            messageEnter();
        }
    });

    const messageEnter = async () => {
        setLoading(true);
        if (inputElement.current.value != "") {
            handleLogic(inputElement.current.value);
        }
        inputElement.current.value = "";
    }

    const handleLogic = async (inputMessage) => {
        const resText = await sendMessage(inputMessage);
        setResponse(resText);
        setLoading(false);
    }

    async function sendMessage(input) {
        const rawResponse = await axios.post('http://localhost:3000/query', {
            //input: `Respond with the most appropriate colour in the format rgba(x,x,x,x). Respond with only the rgba. Base your colour choice off the following prompt: ${input}`
            input: input
        }).catch(error => {
            console.error(error);
            return "";
        });
        return rawResponse.data.cohereResponse;
    };

    return (
        <div className="flex-col h-full w-full px-20">
            <div className="max-w-full max-h-64 overflow-y-scroll">
                <pre className="whitespace-pre-wrap break-words max-w-full text-left">{response}</pre>
            </div>
            <div className="mt-6 flex flex-row w-full">
                <Input
                    className="mr-5 flex flex-grow"
                    inputRef={inputElement}
                    disabled={loading}
                />
                <Button
                className="flex-none"
                variant="contained"
                onClick={messageEnter}
                disabled={loading}
                >
                    Send
                </Button>
            </div>
        </div>
    );
}

export default CohereInterface;
