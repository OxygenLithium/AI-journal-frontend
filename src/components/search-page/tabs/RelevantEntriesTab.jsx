import JournalItem from "../../JournalItem";

function RelevantEntriesTab({ journalEntries }) {
    return (
        <div className="flex flex-column items-center justify-center h-full w-full">
            {journalEntries.map(el => <JournalItem item={el.text}/>)}
        </div>
    )
}

export default RelevantEntriesTab;