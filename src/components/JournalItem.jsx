import { useState } from "react";
import { IconButton } from "@mui/material";
import ThreeDots from "./ThreeDots";

function JournalItem({item, deleteEntry}) {
    return (
        <div className="bg-gray-300 rounded-md py-3 px-6 pt-6 pr-20 w-full relative">
            <ThreeDots
                options={[{
                    text: "Delete",
                    function: () => { deleteEntry(item.id) }
                }]}
            />
            <pre className="mr-20">{item.text}</pre>
        </div>
    )
}

export default JournalItem;
