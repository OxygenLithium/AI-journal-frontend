import React, { useCallback, useState, useEffect, useRef } from 'react';
import axios from 'axios';

import { TextField, Typography, Button } from '@mui/material';
import JournalEntryScroll from '../components/JournalEntryScroll';


function QueryPage() {
    const inputElement = useRef();

    const [ loading, setLoading ] = useState(false);
    const [ entries, setEntries ] = useState([]);
    const [ noMoreEntries, setNoMoreEntries ] = useState(false)

    const entriesRef = useRef(entries);
    const newContentLoadingRef = useRef(false);

    useEffect(() => {
        loadMore();
    }, []);

    useEffect(() => {
        entriesRef.current = entries;
    }, [entries]);

    const loadMore = async () => {
        if (newContentLoadingRef.current) { return; }
        newContentLoadingRef.current = true;
        setLoading(true);

        const currentEntries = entriesRef.current;

        const entriesRaw = await axios.get(`http://localhost:3000/journal/loadMore/${currentEntries.length > 0 ? currentEntries[currentEntries.length-1]._id : -1}`);
        const newEntries = entriesRaw.data.journalEntries;
        setEntries((prev) => prev.concat(newEntries));
        if (newEntries.length == 0) { setNoMoreEntries(true); }
        
        newContentLoadingRef.current = false;
        setLoading(false);
    }

    async function sendJournalEntry(entry) {
        if (entry == "") {
            return;
        }
        setLoading(true);
        const insertReturn = await axios.post('http://localhost:3000/journal/write', {
            entry: entry
        }).catch(error => {
            console.error(error);
        });
        setEntries((prev) => [insertReturn.data.insertedEntry].concat(prev))
        setLoading(false);
    };

    async function sendAndClear() {
        sendJournalEntry(inputElement.current.value);
        inputElement.current.value = "";
    }

    async function deleteEntry(id) {
        setLoading(true);
        await axios.delete(`http://localhost:3000/journal/delete/${id}`).catch(error => {
            console.error(error);
        });
        setEntries((prev) => prev.filter((el) => el.id != id));
        setLoading(false);
    };

    const handleKeyDown = (e) => {
        if (e.code == "Enter") {
            console.log(e.shiftKey);
            if (!e.shiftKey && inputElement.current.value != "") {
                sendAndClear();
            }
        }
    };

    return (
        <div className="w-full h-full overflow-scroll px-12 py-30 flex-1 flex flex-col">
            <h1 className="mb-12">Write a Journal Entry</h1>
            <JournalEntryScroll
                className="flex-shrink"
                entries={entries}
                loadMore={loadMore}
                noMore={noMoreEntries}
                deleteEntry={deleteEntry}
            />
            <div className="mt-6 gap-5 flex flex-row w-full">
                <TextField
                    className="mr-5 flex flex-grow"
                    inputRef={inputElement}
                    disabled={loading}
                    multiline
                    onKeyDown={handleKeyDown}
                />
                <Button
                className="flex-none"
                variant="contained"
                onClick={sendAndClear}
                disabled={loading}
                >
                    Save
                </Button>
            </div>
        </div>
    )
}

export default QueryPage
