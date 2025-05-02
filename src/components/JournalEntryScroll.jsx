import { useEffect, useRef } from 'react';
import JournalItem from './JournalItem';

function JournalEntryScroll({entries, loadMore}) {
    const scrollRef = useRef(null);

    useEffect(() => {
        const scroll = scrollRef.current;
        scroll.addEventListener('scroll',() => {
            if (scroll.scrollHeight - scroll.scrollTop - scroll.clientHeight < 32) {
                loadMore();
            }
        })
    }, []);

    return (
        <div ref={scrollRef} className="h-full flex flex-col gap-5 overflow-y-scroll p-4" style={{scrollbarWidth: 'none'}}>
            {entries.map((el, idx) => {
                return <JournalItem item={el} key={idx}/>
            })}
            <div className="h-32"/>
        </div>
    )
}

export default JournalEntryScroll;
