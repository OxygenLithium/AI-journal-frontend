import React, { useCallback, useState, useEffect, useRef } from 'react';
import axios from 'axios';

import { Input, Typography, Button } from '@mui/material';
import JournalEntryScroll from '../components/JournalEntryScroll';


function QueryPage() {
    const inputElement = useRef();
    const [ loading, setLoading ] = useState(false);
    const [ entries, setEntries ] = useState([]);
    const [ lastSeen, setLastSeen ] = useState(-1);

    useEffect(() => {
        loadMore();
    }, []);

    useEffect(() => {
        if (entries.length > 0) {
            setLastSeen(entries[entries.length-1]._id);
        }
    }, [entries]);

    const loadMore = async () => {
        const entriesRaw = await axios.get(`http://localhost:3000/journal/loadMore/${lastSeen}`);
        setEntries((prev) => prev.concat(entriesRaw.data.journalEntries));
    }

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
        <div className="w-full h-full overflow-scroll px-12 py-30 flex-1 flex flex-col">
            <Button onClick={loadMore}>test</Button>
            <h1 className="mb-12">Write a Journal Entry</h1>
            <JournalEntryScroll
                className="flex-shrink"
                entries={entries}
                loadMore={loadMore}
            />
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
    )
}

export default QueryPage
