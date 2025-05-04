import { useEffect, useState, useRef } from 'react';
import JournalItem from './JournalItem';
import axios from 'axios';

function JournalEntryScroll({entries, loadMore, noMore, deleteEntry}) {
    const scrollRef = useRef(null);
    const noMoreRef = useRef(noMore);

    useEffect(() => {
        noMoreRef.current = noMore;
    }, [noMore])

    useEffect(() => {
        const scroll = scrollRef.current;
        scroll.addEventListener('scroll',() => {
            if (noMoreRef.current) { return; }
            if (scroll.scrollHeight - scroll.scrollTop - scroll.clientHeight < 32) {
                loadMore();
            }
        })
    }, []);

    return (
        <div ref={scrollRef} className="h-full flex flex-col gap-5 overflow-y-scroll p-4" style={{scrollbarWidth: 'none'}}>
            {entries.map((el, idx) => {
                return <JournalItem item={el} key={idx} deleteEntry={deleteEntry}/>
            })}
            <div className="h-32">{noMore ? "You have reached the bottom" : ""}</div>
        </div>
    )
}

export default JournalEntryScroll;
