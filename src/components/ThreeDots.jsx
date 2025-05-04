import { Button, IconButton } from "@mui/material";
import { useState } from "react";

function ThreeDots({ options }) {
    const [ optionsOpen, setOptionsOpen ] = useState(false);

    return (
        <div className="absolute -top-1 right-2">
            <IconButton
            onClick={() => setOptionsOpen(!optionsOpen)}
            >:</IconButton>
            {optionsOpen && <div className="absolute rounded-md p-1.5 top-3 right-5 bg-white">
                {options.map((el, idx) => (
                    <Button
                        key={idx}
                        onClick={el.function}
                    >
                        {el.text}
                    </Button>
                ))}
            </div>}
        </div>
    )
}

export default ThreeDots;
