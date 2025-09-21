import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * TabletShowcase.jsx — Catálogo interactivo para tablet en feria
 * ----------------------------------------------------------------
 * ✔ Optimizado para tablets (10-13 pulgadas)
 * ✔ Controles táctiles grandes y gestos swipe
 * ✔ Vista de catálogo completo + vista detalle de producto
 * ✔ Orientación portrait/landscape responsiva
 * ✔ Modo presentación automática + modo interactivo
 * ✔ Información de contacto siempre visible
 * ✔ Diseño atractivo para ferias y eventos
 */

export default function TabletShowcase({
  products,
  brand = "Molto",
  whatsapp = "321 225 4330",
  instagram = "@Molto_co",
  qrSrc = "/qr-placeholder.svg",
  autoSlideMs = 8000,
  primaryColor = "#f6e8d6",
}) {
  const data = useMemo(
    () =>
      products?.length
        ? products
        : [
            {
              id: "p1",
              name: "Cheesecake de frutos rojos",
              description: "Cremoso, con salsa artesanal y base de galleta crocante.",
              price: 28000,
              image: "/cheesecake.jpg",
              badge: "TOP VENTAS",
            },
            {
              id: "p2",
              name: "Brownie con nueces",
              description: "Chocolate intenso, textura fudgy, nuez tostada.",
              price: 12000,
              image: "/brownie.jpg",
              badge: "FAVORITO",
            },
            {
              id: "p3",
              name: "Galletas de avena",
              description: "Suaves, con chips de chocolate y canela.",
              price: 8000,
              image: "/cookies.jpg",
              badge: "NUEVO",
            },
          ],
    [products]
  );

  const [currentView, setCurrentView] = useState("catalog"); // "catalog" | "detail"
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timerRef = useRef(null);

  // Auto-slide en modo presentación
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    timerRef.current && clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setSelectedProduct((prev) => (prev + 1) % data.length);
    }, autoSlideMs);
    
    return () => timerRef.current && clearInterval(timerRef.current);
  }, [data.length, autoSlideMs, isAutoPlaying]);

  // Detener auto-play cuando hay interacción
  const handleInteraction = () => {
    setIsAutoPlaying(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const selectProduct = (index) => {
    handleInteraction();
    setSelectedProduct(index);
    setCurrentView("detail");
  };

  const goToNext = () => {
    handleInteraction();
    setSelectedProduct((prev) => (prev + 1) % data.length);
  };

  const goToPrev = () => {
    handleInteraction();
    setSelectedProduct((prev) => (prev - 1 + data.length) % data.length);
  };

  // Gestos de swipe para tablet
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) goToNext();
    if (isRightSwipe) goToPrev();
  };

  return (
    <div 
      className="w-screen h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900 overflow-hidden"
      style={{ "--primary": primaryColor }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header con marca y controles */}
      <Header 
        brand={brand}
        currentView={currentView}
        setCurrentView={setCurrentView}
        isAutoPlaying={isAutoPlaying}
        setIsAutoPlaying={setIsAutoPlaying}
      />

      {/* Contenido principal */}
      <div className="h-[calc(100vh-80px)] p-4">
        {currentView === "catalog" ? (
          <CatalogView 
            products={data}
            onSelectProduct={selectProduct}
            selectedIndex={selectedProduct}
          />
        ) : (
          <DetailView
            product={data[selectedProduct]}
            onBack={() => setCurrentView("catalog")}
            onNext={goToNext}
            onPrev={goToPrev}
            currentIndex={selectedProduct}
            totalProducts={data.length}
            whatsapp={whatsapp}
            qrSrc={qrSrc}
            instagram={instagram}
            brand={brand}
          />
        )}
      </div>

      {/* Footer con contacto */}
      <Footer whatsapp={whatsapp} instagram={instagram} />
    </div>
  );
}

function Header({ brand, currentView, setCurrentView, isAutoPlaying, setIsAutoPlaying }) {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <img
          src="https://i.ibb.co/fGCPRPq8/Imagen-de-Whats-App-2025-09-20-a-las-20-17-56-0a3665da.jpg"
          alt="Logo Molto"
          className="w-12 h-12 rounded-xl object-cover shadow-lg border border-gray-200 bg-white"
        />
        <div>
          <h1 className="text-xl font-bold text-gray-900">{brand}</h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setCurrentView(currentView === "catalog" ? "detail" : "catalog")}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 text-sm font-medium text-gray-700 shadow-sm hover:shadow-md transform hover:scale-105"
        >
          {currentView === "catalog" ? "🔍 Ver Detalle" : "📱 Ver Catálogo"}
        </button>
        
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className={`px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md transform hover:scale-105 ${
            isAutoPlaying ? "bg-[var(--primary)] text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
        >
          {isAutoPlaying ? "⏸️ Pausar" : "▶️ Auto"}
        </button>
      </div>
    </header>
  );
}

function CatalogView({ products, onSelectProduct, selectedIndex }) {
  // refs para cada tarjeta
  const cardRefs = useRef([]);

  useEffect(() => {
    if (cardRefs.current[selectedIndex]) {
      cardRefs.current[selectedIndex].scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }
  }, [selectedIndex]);

  const isFour = products.length === 4;
  return (
    <div className="h-full animate-fadeIn">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-3 text-gray-800">Nuestros Productos</h2>
        <p className="text-gray-600 text-lg">Toca cualquier producto para ver más detalles</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 h-[calc(100%-140px)] overflow-y-auto px-4">
        {isFour ? (
          <>
            {/* Primeros 3 productos en la primera fila */}
            {products.slice(0, 3).map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                isSelected={index === selectedIndex}
                onClick={() => onSelectProduct(index)}
                index={index}
                ref={el => cardRefs.current[index] = el}
              />
            ))}
            {/* Cuarto producto centrado en la segunda fila */}
            <div className="col-span-full flex justify-center">
              <ProductCard
                key={products[3].id}
                product={products[3]}
                isSelected={3 === selectedIndex}
                onClick={() => onSelectProduct(3)}
                index={3}
                ref={el => cardRefs.current[3] = el}
              />
            </div>
          </>
        ) : (
          products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              isSelected={index === selectedIndex}
              onClick={() => onSelectProduct(index)}
              index={index}
              ref={el => cardRefs.current[index] = el}
            />
          ))
        )}
      </div>
    </div>
  );
}

// Permitir ref en ProductCard
const ProductCard = React.forwardRef(function ProductCard({ product, isSelected, onClick, index }, ref) {
  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`group relative bg-white hover:bg-gray-50 rounded-3xl p-6 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-2xl ${
        isSelected ? "ring-3 ring-[var(--primary)] bg-gradient-to-br from-white to-purple-50 shadow-2xl scale-105" : "ring-1 ring-gray-200"
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative mb-6 overflow-hidden rounded-2xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {product.badge && (
          <span
            className="absolute top-4 left-4 text-white text-sm font-bold px-3 py-2 rounded-full shadow-lg animate-pulse"
            style={{
              background:
                product.badge === "TOP VENTAS"
                  ? '#ffb347'
                  : product.badge === "NUEVO"
                  ? '#4ade80'
                  : product.badge === "FAVORITO"
                  ? '#60a5fa'
                  : 'var(--primary)'
            }}
          >
            {product.badge}
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="text-left">
        <h3 className="font-bold text-xl mb-3 text-gray-800 line-clamp-2 group-hover:text-[var(--primary)] transition-colors duration-300">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-black" style={{ color: '#a67c52' }}>
            ${product.price?.toLocaleString?.("es-CO") ?? product.price}
          </span>
          <span className="text-gray-400 group-hover:text-[var(--primary)] transition-all duration-300 transform group-hover:translate-x-1">
            Ver más →
          </span>
        </div>
      </div>
    </button>
  );
});

function DetailView({ 
  product, 
  onBack, 
  onNext, 
  onPrev, 
  currentIndex, 
  totalProducts,
  whatsapp,
  qrSrc,
  instagram,
  brand 
}) {
  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-10 animate-slideIn">
      {/* Imagen del producto */}
      <div className="relative flex flex-col items-center justify-center h-full">
        <button
          onClick={onBack}
          className="absolute top-6 left-6 z-10 bg-white/90 hover:bg-white backdrop-blur-lg rounded-full p-4 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 text-gray-700 hover:text-[var(--primary)]"
        >
          ← Volver
        </button>

        <div className="relative w-80 h-96 sm:w-96 sm:h-[28rem] rounded-3xl overflow-hidden shadow-2xl bg-white">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          {product.badge && (
            <span
              className="absolute top-6 right-6 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg animate-bounce"
              style={{
                background:
                  product.badge === "TOP VENTAS"
                    ? '#ffb347'
                    : product.badge === "NUEVO"
                    ? '#4ade80'
                    : product.badge === "FAVORITO"
                    ? '#60a5fa'
                    : 'var(--primary)'
              }}
            >
              {product.badge}
            </span>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        </div>

        {/* Controles de navegación centrados debajo de la imagen */}
        <div className="flex items-center gap-6 bg-white/90 backdrop-blur-lg rounded-full px-8 py-4 shadow-xl mt-6">
          <button
            onClick={onPrev}
            className="text-2xl hover:text-[var(--primary)] transition-all duration-300 transform hover:scale-125 text-gray-600"
          >
            ⬅️
          </button>
          <span className="text-sm font-semibold text-gray-700 px-3">
            {currentIndex + 1} de {totalProducts}
          </span>
          <button
            onClick={onNext}
            className="text-2xl hover:text-[var(--primary)] transition-all duration-300 transform hover:scale-125 text-gray-600"
          >
            ➡️
          </button>
        </div>
      </div>

      {/* Información del producto */}
      <div className="flex flex-col justify-center space-y-8 p-8">
        <div className="animate-fadeInUp">
          <h2 className="text-5xl font-bold mb-6 text-gray-800 leading-tight h-32 flex items-center">{product.name}</h2>
          <p className="text-xl text-gray-600 leading-relaxed h-16 flex items-center">{product.description}</p>
        </div>

        <div className="space-y-6 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
          <div className="text-6xl font-black" style={{ color: '#a67c52' }}>
            ${product.price?.toLocaleString?.("es-CO") ?? product.price}
          </div>
          <div className="space-y-4 text-gray-600">
            <p className="flex items-center gap-3 text-lg"><span className="text-green-500">✓</span> Ingredientes frescos y naturales</p>
            <p className="flex items-center gap-3 text-lg"><span className="text-green-500">✓</span> Hecho artesanalmente</p>
            <p className="flex items-center gap-3 text-lg"><span className="text-green-500">✓</span> Perfecto para regalar o disfrutar</p>
          </div>
        </div>

        {/* Botón de pedido y QR juntos en desktop */}
        <div className="flex flex-col lg:flex-row items-center gap-6 w-full">
          <a
            href={`https://wa.me/573212254230?text=${encodeURIComponent(`Hola! Vi ${product.name} en la feria de ${brand} y me interesa. ¿Puedes darme más información?`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-5 px-8 rounded-2xl transition-all transform hover:scale-105 hover:shadow-2xl text-lg animate-pulse hover:animate-none min-w-[220px]"
          >
            <span>📱</span>
            Pedir por WhatsApp
            <span>→</span>
          </a>
          <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-3 flex items-center gap-4 shadow-lg border border-gray-200 animate-fadeInUp w-auto" style={{animationDelay: '0.4s'}}>
            <img src={qrSrc} alt="QR de contacto" className="w-16 h-16 bg-white p-2 rounded-xl shadow-md" />
            <div>
              <p className="font-bold text-gray-800 text-base">Escanea para contactar</p>
              <p className="text-gray-500 text-sm">{instagram}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer({ whatsapp, instagram }) {
  return (
    <footer className="h-16 bg-white/80 backdrop-blur-xl border-t border-gray-200/50 px-6 flex items-center justify-center shadow-lg">
      <div className="flex items-center gap-8 text-sm text-gray-600">
        <span className="flex items-center gap-2">📱 WhatsApp: <strong className="text-gray-800">+{whatsapp}</strong></span>
        <span className="flex items-center gap-2">📸 Instagram: <strong className="text-gray-800">{instagram}</strong></span>
        <span className="text-[var(--primary)] font-semibold">💝 ¡Gracias por visitarnos!</span>
      </div>
    </footer>
  );
}

// Agregar estilos de animación
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.6s ease-out;
  }
  
  .animate-slideIn {
    animation: slideIn 0.8s ease-out;
  }
  
  .animate-fadeInUp {
    animation: fadeInUp 0.6s ease-out forwards;
    opacity: 0;
  }
`;

// Inyectar estilos
if (typeof document !== 'undefined' && !document.getElementById('tablet-showcase-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'tablet-showcase-styles';
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
