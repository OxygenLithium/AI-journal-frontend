import React, { useState } from 'react';
import AIResponseTab from './AIResponseTab';
import RelevantEntriesTab from './RelevantEntriesTab';

function ResponseTabs({ response, query, journalEntries }) {
    const [activeTab, setActiveTab] = useState('response');

    const tabs = [
        { id: 'response', label: 'AI Response', icon: '🤖' },
        { id: 'placeholder', label: 'Relevant Entries', icon: '📝' }
    ];

    return (
        <div className="flex flex-col h-full">
            <div className="flex border-b border-gray-200 mb-4">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                            activeTab === tab.id
                                ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        <span className="mr-2">{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="flex-1 overflow-y-auto">
                {activeTab === 'response' && (
                    <AIResponseTab response={response} query={query} />
                )}

                {activeTab === 'placeholder' && (
                    <RelevantEntriesTab journalEntries={journalEntries} />
                )}
            </div>
        </div>
    );
}

export default ResponseTabs;
