import { Input, Button } from '@mui/material';
import React, { useState, useRef } from 'react';

function Searchbar({ messageEnter, query = ""}) {
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState(query);

    // Update input value when query prop changes
    React.useEffect(() => {
        setInputValue(query);
    }, [query]);

    const handleKeyDown = (e) => {
        if (e.code == "Enter") {
            messageEnterHelper();
        }
    };

    const messageEnterHelper = async () => {
        setLoading(true);
        if (inputValue.trim() !== "") {
            await messageEnter(inputValue);
        }
        setLoading(false);
    }

    return (
        <div className="mt-6 flex flex-row w-full justify-center">
            <div className="flex items-center w-full max-w-2xl bg-white rounded-full border border-gray-300 shadow-sm hover:shadow-md transition-shadow duration-200 px-4 py-2">
                <Input
                    className="flex-grow border-none outline-none shadow-none"
                    disabled={loading}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="I want to recall..."
                    onKeyDown={handleKeyDown}
                    disableUnderline={true}
                    sx={{
                        '& .MuiInputBase-input': {
                            fontSize: '16px',
                            padding: '8px 0',
                            '&::placeholder': {
                                color: '#9CA3AF',
                                opacity: 1
                            }
                        }
                    }}
                />
                <Button
                    className="ml-2 rounded-full"
                    variant="contained"
                    onClick={messageEnterHelper}
                    disabled={loading}
                    sx={{
                        minWidth: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: '#4285F4',
                        '&:hover': {
                            backgroundColor: '#3367D6'
                        }
                    }}
                >
                    →
                </Button>
            </div>
        </div>
    )
}

export default Searchbar;
