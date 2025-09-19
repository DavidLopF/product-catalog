import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TVShowcase from './components/TVShowcase'
import TabletShowcase from './components/TabletShowcase'
import Home from './components/Home'
import products from './data/products.json'

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Página de inicio con selección de modo */}
        <Route path="/" element={<Home />} />
        
        {/* Modo TV - Para televisores y pantallas grandes */}
        <Route 
          path="/tv" 
          element={
            <TVShowcase
              products={products}
              brand="Mi Emprendimiento"
              whatsapp="573001112233"
              instagram="@mi_marca"
              qrSrc="/qr-placeholder.svg"
              slideMs={7000}
            />
          } 
        />
        
        {/* Modo Tablet - Para ferias y eventos */}
        <Route 
          path="/tablet" 
          element={
            <TabletShowcase
              products={products}
              brand="Mi Emprendimiento"
              whatsapp="573001112233"
              instagram="@mi_marca"
              qrSrc="/qr-placeholder.svg"
              autoSlideMs={10000}
              primaryColor="#6c5dd3"
            />
          } 
        />
      </Routes>
    </Router>
  )
}
