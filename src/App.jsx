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
        {/* Root ahora abre el modo Tablet directamente; Home sigue disponible en /home */}
        <Route path="/" element={
          <TabletShowcase
            products={products}
            brand="Molto"
            whatsapp="321 225 4230"
            instagram="@molto_co"
            qrSrc="https://i.ibb.co/gphnJKq/molto-co-qr-1.png"
            autoSlideMs={6000}
            primaryColor="#f6e8d6"
          />
        } />
        <Route path="/home" element={<Home />} />
        
        {/* Modo TV - Para televisores y pantallas grandes */}
        <Route 
          path="/tv" 
          element={
            <TVShowcase
              products={products}
              brand="Molto"
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
              brand="Molto"
              whatsapp="321 225 4230"
              instagram="@molto_co"
              qrSrc="https://i.ibb.co/gphnJKq/molto-co-qr-1.png"
              autoSlideMs={6000}
              primaryColor="#f6e8d6"
            />
          } 
        />
      </Routes>
    </Router>
  )
}
