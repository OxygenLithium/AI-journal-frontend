import JournalItem from './JournalItem'

function JournalEntryScroll({entries}) {
    return (
        <div className="flex flex-col gap-5">
            {entries.map((el, idx) => {
                return <JournalItem item={el} key={idx}/>
            })}
        </div>
    )
}

export default JournalEntryScroll;
