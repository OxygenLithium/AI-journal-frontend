import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import { Input, Typography, Button } from '@mui/material';
import JournalEntryScroll from '../components/JournalEntryScroll';


function QueryPage() {
    const inputElement = useRef();
    const [ loading, setLoading ] = useState(false);
    const [ entries, setEntries ] = useState([]);

    useEffect(() => {
        async function fetchData() {
            await axios.post('http://localhost:3000/journal/instantiateCursor');
            const entriesRaw = await axios.get('http://localhost:3000/journal/loadMore');
            console.log(entriesRaw);
            setEntries((prev) => prev.concat(entriesRaw.data.journalEntries));
        }

        fetchData();
    }, [])

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
                <JournalEntryScroll entries={entries}/>
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
            </div>
        </div>
    )
}

export default QueryPage
