import { useState, useRef } from "react";
import { TextField, Button } from "@mui/material";
import ThreeDots from "./ThreeDots";
import axios from "axios";

function JournalItem({item, deleteEntry}) {
    const [ isEditing, setIsEditing ] = useState(false);
    const editRef = useRef(null);

    const saveEdit = async () => {
        item.text = editRef.current.value;

        const rawResponse = await axios.put(`http://localhost:3000/journal/edit/${item._id}`, {
            update: editRef.current.value
        }).catch(error => {
            console.error(error);
            return "";
        });

        setIsEditing(false);
    }

    

    return (
        <div className="bg-gray-300 rounded-md py-3 px-6 pt-6 pr-20 w-full relative flex flex-col">
            {!isEditing && <ThreeDots
                options={[
                    {
                        text: "Edit",
                        function: () => {
                            setIsEditing(true);
                        }
                    },
                    {
                        text: "Delete",
                        function: () => { deleteEntry(item._id) }
                    }
                ]}
            />}
            {!isEditing && <pre className="mr-20 whitespace-pre-wrap break-words">{item.text}</pre>}
            {isEditing &&
            <>
                <TextField
                    className="w-full mb-3"
                    inputRef={editRef}
                    placeholder="Edit entry..."
                    defaultValue={item.text}
                />
                <div className="mt-3 flex flex-row gap-1 ml-auto right-3">
                    <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={saveEdit}
                    >
                        Save
                    </Button>
                </div>
            </>}
        </div>
    )
}

export default JournalItem;
