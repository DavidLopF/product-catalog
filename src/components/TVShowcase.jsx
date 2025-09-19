import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * TVShowcase.jsx — Pantalla animada para televisor
 * ------------------------------------------------
 * ✔ 100% pantalla: ideal para TV (Full HD / 4K)
 * ✔ Carrusel auto‑rotativo con efecto Ken Burns (zoom/pan suave)
 * ✔ Transiciones fluidas entre productos
 * ✔ Ticker inferior (marquesina) con CTA a WhatsApp / Instagram
 * ✔ Reloj y fecha en vivo
 * ✔ Modo offline (no dependencias externas)
 *
 * Uso rápido:
 * 1) Copia este archivo a: src/components/TVShowcase.jsx
 * 2) En tu App.jsx: `import TVShowcase from './components/TVShowcase'`
 * 3) Renderiza: `<TVShowcase products={products} brand="Tu Marca" whatsapp="57300XXXXXXX" qrSrc="/qr.png" />`
 * 4) Ajusta estilos de marca en las variables CSS (—brand) o Tailwind.
 */

export default function TVShowcase({
  products,
  brand = "Mi Marca",
  whatsapp = "573001112233",
  instagram = "@tu_marca",
  qrSrc = "/qr-placeholder.svg",
  slideMs = 7000,
}) {
  const data = useMemo(
    () =>
      products?.length
        ? products
        : [
            {
              id: "p1",
              name: "Cheesecake de frutos rojos",
              description: "Cremoso, con salsa artesanal y base de galleta.",
              price: 28000,
              image: "/img/cheesecake.jpg",
              badge: "TOP VENTAS",
            },
            {
              id: "p2",
              name: "Brownie con nueces",
              description: "Chocolate intenso, textura fudgy, nuez tostada.",
              price: 12000,
              image: "/img/brownie.jpg",
              badge: "FAVORITO",
            },
            {
              id: "p3",
              name: "Galletas de avena",
              description: "Suaves, con chips de chocolate y canela.",
              price: 8000,
              image: "/img/cookies.jpg",
              badge: "NUEVO",
            },
          ],
    [products]
  );

  // índice del slide
  const [i, setI] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current && clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setI((v) => (v + 1) % data.length);
    }, slideMs);
    return () => timerRef.current && clearInterval(timerRef.current);
  }, [data.length, slideMs]);

  // hora en vivo
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const fmtTime = (d) =>
    d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const fmtDate = (d) =>
    d.toLocaleDateString("es-CO", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  return (
    <div className="w-screen h-screen overflow-hidden bg-neutral-950 text-white" style={{"--brand":"#6c5dd3"}}>
      {/* Fondo del slide con efecto Ken Burns */}
      {data.map((p, idx) => (
        <SlideBG key={p.id} src={p.image} active={i === idx} />
      ))}

      {/* capa de degradado para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />

      {/* Contenido principal */}
      <div className="relative z-10 h-full max-w-[92rem] mx-auto px-8 py-10 grid grid-rows-[1fr_auto]">
        {/* Zona superior: card del producto + info lateral */}
        <div className="grid grid-cols-12 gap-8 items-center">
          <div className="col-span-7">
            <ProductCardLarge key={data[i].id} product={data[i]} brand={brand} whatsapp={whatsapp} />
          </div>

          <aside className="col-span-5 flex flex-col gap-4">
            <BrandHeader brand={brand} now={now} fmtTime={fmtTime} fmtDate={fmtDate} />
            <MiniQueue data={data} activeIndex={i} onSelect={(k) => setI(k)} />
            <div className="rounded-2xl p-5 bg-white/5 ring-1 ring-white/10">
              <p className="text-sm/6 text-white/70">Escanéame para ordenar</p>
              <div className="mt-3 flex items-center gap-4">
                <img src={qrSrc} alt="QR de contacto" className="w-28 h-28 bg-white p-2 rounded" />
                <div>
                  <a
                    href={`https://wa.me/${whatsapp}?text=${encodeURIComponent("Hola, vi la pantalla de "+brand+" y quiero más info")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 font-semibold text-white hover:opacity-90"
                  >
                    WhatsApp directo
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-90"><path d="M14 3h7v7" stroke="currentColor" strokeWidth="2"/><path d="M21 3 10 14" stroke="currentColor" strokeWidth="2"/><path d="M21 10v11H3V3h11" stroke="currentColor" strokeWidth="2"/></svg>
                  </a>
                  <p className="text-white/70 text-sm">{instagram}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Ticker inferior */}
        <Ticker>
          <span className="mx-8">{brand} • Hecho con amor • Sabores del día • Descuento especial mostrando este QR</span>
          <span className="mx-8">WhatsApp: +{whatsapp}</span>
          <span className="mx-8">Instagram: {instagram}</span>
        </Ticker>
      </div>

      {/* Controles opcionales con teclado (izq/der) para debugging */}
      <KeyControls onPrev={() => setI((i - 1 + data.length) % data.length)} onNext={() => setI((i + 1) % data.length)} />
    </div>
  );
}

function SlideBG({ src, active }) {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-[1200ms] ${active ? "opacity-100" : "opacity-0"}`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={src}
          alt=""
          className={`w-full h-full object-cover will-change-transform ${active ? "kenburns" : ""}`}
        />
      </div>
      <style>{`
        .kenburns { animation: kb 18s ease-in-out infinite alternate; }
        @keyframes kb { from { transform: scale(1.05) translate3d(-1%, -1%, 0); } to { transform: scale(1.15) translate3d(1%, 1%, 0); } }
      `}</style>
    </div>
  );
}

function ProductCardLarge({ product, brand, whatsapp }) {
  return (
    <div className="grid grid-cols-12 gap-6 items-center">
      <div className="col-span-7">
        <div className="relative rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
          <img src={product.image} alt={product.name} className="w-full aspect-[4/3] object-cover" />
          {product.badge && (
            <span className="absolute top-4 left-4 bg-[var(--brand)] text-white text-xs font-bold px-3 py-1 rounded-full">
              {product.badge}
            </span>
          )}
        </div>
      </div>
      <div className="col-span-5">
        <h2 className="text-4xl font-extrabold drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]">{product.name}</h2>
        <p className="mt-3 text-white/85 text-lg max-w-prose">{product.description}</p>
        <div className="mt-5 flex items-center gap-4">
          <span className="text-3xl font-black">${product.price?.toLocaleString?.("es-CO") ?? product.price}</span>
          <a
            href={`https://wa.me/${whatsapp}?text=${encodeURIComponent("Quiero el "+product.name)}`}
            target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-3 bg-[var(--brand)] font-semibold hover:opacity-90 ring-1 ring-white/10"
          >
            Pedir ahora
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M14 3h7v7" stroke="currentColor" strokeWidth="2"/><path d="M21 3 10 14" stroke="currentColor" strokeWidth="2"/></svg>
          </a>
        </div>
        <ul className="mt-4 text-white/70 text-sm space-y-1">
          <li>• Ingredientes frescos y receta propia</li>
          <li>• Ideal para ferias, eventos y regalos</li>
          <li>• Promoción válida mostrando el QR</li>
        </ul>
      </div>
    </div>
  );
}

function BrandHeader({ brand, now, fmtTime, fmtDate }) {
  return (
    <div className="rounded-2xl p-5 bg-white/5 ring-1 ring-white/10 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[var(--brand)]" />
        <div>
          <p className="text-xs uppercase tracking-widest text-white/70">Feria de Emprendimiento</p>
          <h3 className="text-xl font-bold">{brand}</h3>
        </div>
      </div>
      <div className="text-right">
        <div className="text-2xl font-black tabular-nums">{fmtTime(now)}</div>
        <div className="text-sm text-white/70 capitalize">{fmtDate(now)}</div>
      </div>
    </div>
  );
}

function MiniQueue({ data, activeIndex, onSelect }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {data.map((p, k) => (
        <button
          key={p.id}
          onClick={() => onSelect(k)}
          className={`group relative rounded-2xl overflow-hidden ring-2 transition ${
            k === activeIndex ? "ring-[var(--brand)]" : "ring-white/10 hover:ring-white/30"
          }`}
          aria-label={`Ver ${p.name}`}
        >
          <img src={p.image} alt="" className="w-full aspect-video object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition" />
          <span className="absolute bottom-2 left-2 text-white text-xs font-semibold drop-shadow">{p.name}</span>
        </button>
      ))}
    </div>
  );
}

function Ticker({ children, speed = 40 }) {
  // Animación continua de derecha a izquierda
  return (
    <div className="absolute left-0 right-0 bottom-0 h-14 bg-black/60 backdrop-blur-md border-t border-white/10 overflow-hidden">
      <div className="absolute inset-0 flex items-center">
        <div
          className="flex gap-10 text-white/90 font-semibold whitespace-nowrap will-change-transform"
          style={{ animation: `marquee ${speed}s linear infinite` }}
        >
          {children}
          {children}
          {children}
        </div>
      </div>
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
}

function KeyControls({ onPrev, onNext }) {
  useEffect(() => {
    const h = (e) => {
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onPrev, onNext]);
  return null;
}
