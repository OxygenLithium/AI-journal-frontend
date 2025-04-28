import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TestComponent() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get('http://localhost:3000/test')
        .then(response => {
            setMessage(response.data.cohereResponse);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

    return (
        <ul>
            {message}
        </ul>
    );
}

export default TestComponent;
