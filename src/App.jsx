import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import CohereInterface from './CohereInterface'

function App() {
  const [background, setBackground] = useState('rgba(0, 0, 0, 0)');

  return (
    <div className="w-full h-full" style={{backgroundColor:background}}>
      <h1 className="mb-12">AI Journalling Project: Testing</h1>
      <CohereInterface
        setBackground={setBackground}
      />
    </div>
  )
}

export default App
