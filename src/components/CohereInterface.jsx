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
        if (loading) { return; }
        const resType = parseInt(await sendMessage(`Judge whether the following message wants you to print to console, display an alert, or just type a normal message. Respond with just a 1 if it is to console, just a 2 if it is an alert, and 3 if it is a normal message. Do not include anything else in your response. The message: ${inputMessage}`));
        const resText = await sendMessage(inputMessage);
        if (resType == 1) {
            console.log(resText);
            setResponse("Printed to Console");
        }
        else if (resType == 2) {
            alert(resText);
            setResponse("Alerted");
        }
        else {
            setResponse(resText);
        }
        setLoading(false);
    }

    async function sendMessage(input) {
        const rawResponse = await axios.post('http://localhost:3000/test', {
            //input: `Respond with the most appropriate colour in the format rgba(x,x,x,x). Respond with only the rgba. Base your colour choice off the following prompt: ${input}`
            input: input
        }).catch(error => {
            console.error(error);
            return "";
        });
        return rawResponse.data.cohereResponse;
    };

    return (
        <div className="flex-col h-full w-full">
            <div className="overflow-y-scroll">
                <pre>{response}</pre>
            </div>
            <div className="mt-6 flex flex-row w-full px-20">
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
