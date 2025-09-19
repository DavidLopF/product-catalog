import React from 'react'
import TabletShowcase from './components/TabletShowcase'
import products from './data/products.json'

export default function App() {
  return (
    <TabletShowcase
      products={products}
      brand="Mi Emprendimiento"              // Cambia por el nombre de tu marca
      whatsapp="573001112233"               // Tu número de WhatsApp (sin +)
      instagram="@mi_marca"                 // Tu usuario de Instagram
      qrSrc="/qr-placeholder.svg"          // Ruta a tu código QR
      autoSlideMs={10000}                   // Tiempo de auto-slide (10 segundos)
      primaryColor="#6c5dd3"               // Color principal de tu marca
    />
  )
}
