import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import { Input, Typography, Button } from '@mui/material';


function QueryPage() {
    const inputElement = useRef();
    const [ loading, setLoading ] = useState(false);
    const [ entries, setEntries ] = useState([]);

    async function sendJournalEntry(entry) {
        if (entry == "") {
            return;
        }
        setLoading(true);
        await axios.post('http://localhost:3000/journal/write', {
            entry: entry
        }).catch(error => {
            console.error(error);
        });
        setLoading(false);
    };

    async function getJournalEntries() {
        const rawResponse = await axios.get('http://localhost:3000/journal/query').catch(error => {
            console.error(error);
        });
        console.log(rawResponse);
        setEntries(rawResponse.data.journalEntries);
    };

    document.addEventListener("keydown", (e) => {
        if (e.code == "Enter") {
            sendJournalEntry(inputElement.current.value);
            inputElement.current.value = "";
        }
    });

    return (
        <div className="w-full h-full overflow-scroll">
            <div className="px-12 py-30">
                <h1 className="mb-12">Write a Journal Entry</h1>
                <div className="flex flex-col gap-5">
                    { entries.map((el) => {
                        return(<div>{el}</div>)
                    })}
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
                    onClick={() => {
                        sendJournalEntry(inputElement.current.value);
                        inputElement.current.value = "";
                    }}
                    disabled={loading}
                    >
                        Save
                    </Button>
                </div>
                <Button
                className="flex-none"
                variant="contained"
                onClick={getJournalEntries}
                >
                    Get Journal Entries
                </Button>
            </div>
        </div>
    )
}

export default QueryPage
