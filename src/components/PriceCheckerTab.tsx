import { useState, useMemo, useRef, useEffect } from 'react';
import { Product } from '../types/product';
import { calculateTax, formatCLP } from '../utils/productUtils';
import { BarcodeBadge } from './BarcodeBadge';
import {
  Search,
  Scan,
  Printer,
  Edit2,
  X,
  Volume2,
  VolumeX,
  ArrowRight,
  Sparkles,
  Layers,
} from 'lucide-react';

interface PriceCheckerTabProps {
  products: Product[];
  onEditProduct: (p: Product) => void;
  onPrintLabel: (p: Product) => void;
  onOpenBulkUpload: () => void;
  onOpenAddSingle: () => void;
}

export function PriceCheckerTab({
  products,
  onEditProduct,
  onPrintLabel,
  onOpenBulkUpload,
  onOpenAddSingle,
}: PriceCheckerTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  // Play subtle beep sound when scanning / matching
  const playBeep = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 note
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.12);
    } catch {
      // AudioContext not allowed or not supported
    }
  };

  const handleSelectProduct = (prod: Product) => {
    setSelectedProduct(prod);
    setSearchQuery(prod.nombre);
    playBeep();
  };

  // Search logic
  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return products.filter((item) => {
      const matchCategory = selectedCategory === 'all' || item.tipo.toLowerCase() === selectedCategory.toLowerCase();
      if (!matchCategory) return false;

      if (!q) return true;
      return (
        item.nombre.toLowerCase().includes(q) ||
        item.producto.toLowerCase().includes(q) ||
        (item.sku && item.sku.toLowerCase().includes(q)) ||
        (item.marca && item.marca.toLowerCase().includes(q)) ||
        (item.variante && item.variante.toLowerCase().includes(q))
      );
    });
  }, [products, searchQuery, selectedCategory]);

  // Exact SKU match detection for barcode scanners
  useEffect(() => {
    const q = searchQuery.trim();
    if (q.length >= 6) {
      const exactMatch = products.find((p) => p.sku === q);
      if (exactMatch && selectedProduct?.id !== exactMatch.id) {
        setSelectedProduct(exactMatch);
        playBeep();
      }
    }
  }, [searchQuery, products]);

  // Focus search input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.tipo) set.add(p.tipo);
    });
    return Array.from(set).sort();
  }, [products]);

  return (
    <div className="space-y-6">
      {/* Search & Scanner Box */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <label htmlFor="priceSearchInput" className="text-sm font-bold text-slate-900 block">
              Consulta Rápida y Verificador de Precios
            </label>
            <p className="text-xs text-slate-500">
              Escanea con lector de código de barras o escribe nombre, marca o SKU
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                soundEnabled
                  ? 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
                  : 'text-slate-400 bg-slate-100 hover:bg-slate-200'
              }`}
              title="Sonido de confirmación al escanear"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">{soundEnabled ? 'Sonido Activo' : 'Sin Sonido'}</span>
            </button>

            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200/80">
              {products.length} productos en base de datos
            </span>
          </div>
        </div>

        {/* Input container */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
            <Scan className="w-5 h-5 text-emerald-600" />
          </div>
          <input
            id="priceSearchInput"
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pasa el código de barras o busca: Sabanilla, Nutreats, Oxbow, 78000060..."
            className="w-full pl-12 pr-10 py-3.5 bg-slate-50 border border-slate-300 rounded-xl text-base text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all font-medium"
            autoComplete="off"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedProduct(null);
                inputRef.current?.focus();
              }}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-3 pb-1 text-xs">
          <span className="text-slate-400 font-medium shrink-0 mr-1">Filtrar por:</span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            Todos
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedCategory === c
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Display for Selected Product */}
      {selectedProduct && (
        <div className="bg-white rounded-2xl border-2 border-emerald-500 p-6 shadow-md transition-all">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Left info */}
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-md">
                  {selectedProduct.tipo || 'General'}
                </span>
                {selectedProduct.marca && (
                  <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                    Marca: {selectedProduct.marca}
                  </span>
                )}
                {selectedProduct.variante && (
                  <span className="text-xs text-slate-500">
                    Variante: <strong>{selectedProduct.variante}</strong>
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  {selectedProduct.nombre}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Producto base: <span className="font-semibold text-slate-700">{selectedProduct.producto}</span>
                </p>
              </div>

              <div className="flex items-center gap-4 pt-1">
                <BarcodeBadge value={selectedProduct.sku} height={34} />
              </div>
            </div>

            {/* Right Price Display */}
            <div className="lg:text-right shrink-0 bg-emerald-50/70 p-5 rounded-xl border border-emerald-200/60 lg:min-w-[280px]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-900 block mb-1">
                Precio Venta Público (Bruto)
              </span>
              <div className="text-4xl sm:text-5xl font-extrabold text-emerald-700 tracking-tight tabular-nums">
                {formatCLP(selectedProduct.precio)}
              </div>

              {/* Tax breakdown */}
              {(() => {
                const { neto, iva } = calculateTax(selectedProduct.precio);
                return (
                  <div className="text-xs text-slate-600 font-mono mt-2 space-y-0.5 border-t border-emerald-200/60 pt-2">
                    <div>Neto: <strong className="text-slate-800">{formatCLP(neto)}</strong></div>
                    <div>IVA (19%): <strong className="text-slate-800">{formatCLP(iva)}</strong></div>
                  </div>
                );
              })()}

              <div className="flex items-center justify-end gap-2 mt-4 pt-2 border-t border-emerald-200/60">
                <button
                  onClick={() => onPrintLabel(selectedProduct)}
                  className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-600" />
                  Imprimir Etiqueta
                </button>
                <button
                  onClick={() => onEditProduct(selectedProduct)}
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  Editar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
            {searchQuery ? `Coincidencias encontradas (${filteredProducts.length})` : 'Catálogo Rápido'}
          </h4>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAddSingle}
              className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold"
            >
              + Agregar 1 Producto
            </button>
            <span className="text-slate-300">·</span>
            <button
              onClick={onOpenBulkUpload}
              className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold"
            >
              Carga Masiva
            </button>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <Scan className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h5 className="text-sm font-bold text-slate-700">No se encontraron productos coincidentes</h5>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
              Verifica el código de barra o nombre ingresado, o incorpora este nuevo producto a la base de datos.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={onOpenAddSingle}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs"
              >
                + Crear este Producto
              </button>
              <button
                onClick={onOpenBulkUpload}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
              >
                Carga Masiva
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredProducts.slice(0, 24).map((p) => {
              const isSelected = selectedProduct?.id === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => handleSelectProduct(p)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-emerald-50/50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5">
                      <span className="font-semibold text-slate-700">{p.tipo || 'General'}</span>
                      <span className="font-mono">{p.sku ? p.sku.slice(-6) : ''}</span>
                    </div>
                    <div className="font-bold text-slate-900 text-sm line-clamp-2 leading-snug">
                      {p.nombre}
                    </div>
                    {p.marca && (
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {p.marca}
                      </div>
                    )}
                  </div>

                  <div className="flex items-end justify-between mt-3 pt-2 border-t border-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Bruto</span>
                    <span className="font-extrabold text-emerald-700 text-base tabular-nums">
                      {formatCLP(p.precio)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
