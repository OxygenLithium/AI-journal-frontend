import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import { Input, Typography, Button } from '@mui/material';


function QueryPage() {
    const inputElement = useRef();
    const [ loading, setLoading ] = useState(false);

    return (
        <div className="w-full h-full overflow-scroll">
            <div className="px-12 py-30">
                <h1 className="mb-12">Write a Journal Entry (Currently Nonfunctional)</h1>
                <div className="mt-6 flex flex-row w-full">
                    <Input
                        className="mr-5 flex flex-grow"
                        inputRef={inputElement}
                        disabled={loading}
                    />
                    <Button
                    className="flex-none"
                    variant="contained"
                    onClick={() => alert("Currently nonfunctional")}
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
