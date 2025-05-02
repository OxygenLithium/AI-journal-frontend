function JournalItem({item}) {
    return (
        <div className="bg-gray-300 rounded-md p-3">
            {item.text}
        </div>
    )
}

export default JournalItem;
