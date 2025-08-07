import React, { useState, useEffect, useRef } from 'react';
import Searchbar from '../components/search-page/Searchbar';
import ResponseTabs from '../components/search-page/tabs/ResponseTabs';
import axios from 'axios';

function QueryPage() {
    const [query, setQuery] = useState(null);
    const [response, setResponse] = useState(null);
    const [relevantJournals, setRelevantJournals] = useState(null);

    const messageEnter = async (inputMessage) => {
        setQuery(inputMessage);
        const response = await sendMessage(inputMessage);
        setResponse(response.cohereResponse);
        setRelevantJournals(response.journalEntries);
        console.log(response.journalEntries);
    }

    async function sendMessage(input) {
        const rawResponse = await axios.put('http://localhost:3000/query', {
            input: input
        }).catch(error => {
            console.error(error);
            return "";
        });
        return rawResponse.data;
    };

    return (
        <div className="w-full h-full overflow-scroll">
            {response == null ? (
                <div className="flex flex-col items-center justify-start h-full w-full px-20 pt-40">
                    <h1 className="text-4xl font-bold mb-2">Recollection</h1>
                    <div className="w-full max-w-2xl">
                        <Searchbar messageEnter={messageEnter} query={query} />
                    </div>
                </div>
            ) : (
                <div className="flex flex-col h-full w-full px-20">
                    <div className="pt-6 pb-4">
                        <Searchbar messageEnter={messageEnter} query={query} />
                    </div>
                    <div className="flex-1">
                        <ResponseTabs response={response} query={query} journalEntries={relevantJournals} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default QueryPage;
