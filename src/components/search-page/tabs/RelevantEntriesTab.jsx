import JournalItem from "../../JournalItem";

function RelevantEntriesTab({ journalEntries }) {
    return (
        <div className="flex flex-col gap-5 overflow-y-scroll p-4 h-full w-full">
            {journalEntries.map(el => <JournalItem item={el}/>)}
        </div>
    )
}

export default RelevantEntriesTab;