import { useState } from 'react'

import CohereInterface from '../components/CohereInterface'

function QueryPage() {
    return (
        <div className="w-full h-full overflow-scroll">
            <div className="px-5 py-30">
                <h1 className="mb-12">AI Journalling Project: Testing</h1>
                <CohereInterface/>
            </div>
        </div>
    )
}

export default QueryPage
