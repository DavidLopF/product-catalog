import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-12">
          <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
            <span className="text-3xl">🏪</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Mi Emprendimiento
          </h1>
          <p className="text-xl text-white/80">
            Selecciona el modo de visualización para tu catálogo
          </p>
        </div>

        {/* Opciones de modo */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Modo TV */}
          <Link
            to="/tv"
            className="group relative bg-white/10 backdrop-blur-md rounded-3xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-white/20"
          >
            <div className="text-6xl mb-6">📺</div>
            <h2 className="text-2xl font-bold text-white mb-4">Modo TV</h2>
            <p className="text-white/80 mb-6 leading-relaxed">
              Perfecto para televisores y pantallas grandes. Presentación automática con efectos cinematográficos.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white">Pantalla completa</span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white">Auto-rotación</span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white">Efectos Ken Burns</span>
            </div>
            <div className="inline-flex items-center text-white font-semibold group-hover:translate-x-2 transition-transform">
              Usar modo TV <span className="ml-2">→</span>
            </div>
          </Link>

          {/* Modo Tablet */}
          <Link
            to="/tablet"
            className="group relative bg-white/10 backdrop-blur-md rounded-3xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-white/20"
          >
            <div className="text-6xl mb-6">📱</div>
            <h2 className="text-2xl font-bold text-white mb-4">Modo Tablet</h2>
            <p className="text-white/80 mb-6 leading-relaxed">
              Optimizado para tablets en ferias y eventos. Interacción táctil y navegación intuitiva.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white">Controles táctiles</span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white">Gestos swipe</span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white">Fondo blanco</span>
            </div>
            <div className="inline-flex items-center text-white font-semibold group-hover:translate-x-2 transition-transform">
              Usar modo Tablet <span className="ml-2">→</span>
            </div>
          </Link>
        </div>

        {/* Información adicional */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-3">💡 Consejos de uso</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-white/80">
            <div>
              <strong className="text-white">Modo TV:</strong> Ideal para vitrinas, televisores en tiendas, o presentaciones automáticas donde no hay interacción directa.
            </div>
            <div>
              <strong className="text-white">Modo Tablet:</strong> Perfecto para ferias, eventos, stands donde los clientes pueden tocar y navegar por los productos.
            </div>
          </div>
        </div>

        {/* Enlaces rápidos */}
        <div className="mt-8 flex justify-center gap-6 text-sm">
          <a href="#" className="text-white/70 hover:text-white transition-colors">
            📞 Contacto
          </a>
          <a href="#" className="text-white/70 hover:text-white transition-colors">
            📸 Instagram
          </a>
          <a href="#" className="text-white/70 hover:text-white transition-colors">
            💬 WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
