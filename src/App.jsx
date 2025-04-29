import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

import Layout from './pages/Layout'
import QueryPage from './pages/QueryPage'
import JournalPage from  './pages/JournalPage'
import NoPage from './pages/NoPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<QueryPage />} />
          <Route path="journal" element={<JournalPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
