import { useState } from "react";
import { IconButton } from "@mui/material";
import ThreeDots from "./ThreeDots";

function JournalItem({item, deleteEntry}) {
    const [ isEditing, setIsEditing ] = useState(false);

    return (
        <div className="bg-gray-300 rounded-md py-3 px-6 pt-6 pr-20 w-full relative">
            {!isEditing && <ThreeDots
                options={[{
                    text: "Delete",
                    function: () => { deleteEntry(item.id) }
                }]}
            />}
            {!isEditing && <pre className="mr-20">{item.text}</pre>}
        </div>
    )
}

export default JournalItem;
