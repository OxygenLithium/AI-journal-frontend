function JournalItem({item}) {
    return (
        <div className="bg-gray-300 rounded-md py-3 px-6 w-full">
            {item.text}
        </div>
    )
}

export default JournalItem;
