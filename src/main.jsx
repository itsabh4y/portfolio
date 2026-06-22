import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Sitemap from './Sitemap.jsx'
import '../style.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/sitemap.html" element={<Sitemap />} />
        <Route path="/sitemap" element={<Sitemap />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
