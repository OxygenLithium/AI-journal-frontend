import JournalItem from './JournalItem'

function JournalEntryScroll({entries}) {
    return (
        <div className="h-full flex flex-col gap-5 overflow-y-scroll p-4" style={{scrollbarWidth: 'none'}}>
            {entries.map((el, idx) => {
                return <JournalItem item={el} key={idx}/>
            })}
        </div>
    )
}

export default JournalEntryScroll;
