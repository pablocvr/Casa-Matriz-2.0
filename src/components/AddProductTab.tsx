import { useState } from 'react';
import { ProductInput } from '../types/product';
import { generateSKU, calculateTax, formatCLP } from '../utils/productUtils';
import { PlusCircle, CheckCircle2, AlertCircle, Sparkles, Barcode } from 'lucide-react';
import { BarcodeBadge } from './BarcodeBadge';

interface AddProductTabProps {
  onSaveProduct: (p: ProductInput) => { success: boolean; error?: string };
  categories: string[];
  existingSkus: Set<string>;
  onNavigateToCatalog: () => void;
}

export function AddProductTab({
  onSaveProduct,
  categories,
  existingSkus,
  onNavigateToCatalog,
}: AddProductTabProps) {
  const [producto, setProducto] = useState('');
  const [variante, setVariante] = useState('');
  const [tipo, setTipo] = useState('Alimentos');
  const [marca, setMarca] = useState('');
  const [sku, setSku] = useState(() => generateSKU());
  const [precio, setPrecio] = useState<string>('');
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'danger' } | null>(null);

  const numPrecio = parseInt(precio, 10) || 0;
  const { neto, iva } = calculateTax(numPrecio);
  const nombreGenerado = variante.trim() ? `${producto.trim()} - ${variante.trim()}` : producto.trim();

  const handleGenerateSku = () => {
    setSku(generateSKU());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!producto.trim()) {
      setAlert({ message: 'El producto base es obligatorio.', type: 'danger' });
      return;
    }
    if (!sku.trim()) {
      setAlert({ message: 'El código SKU es obligatorio.', type: 'danger' });
      return;
    }
    if (numPrecio <= 0) {
      setAlert({ message: 'El precio debe ser un número mayor a 0.', type: 'danger' });
      return;
    }

    if (existingSkus.has(sku.trim())) {
      setAlert({
        message: 'El código SKU ya existe en la base de datos. Modifícalo o genera uno nuevo.',
        type: 'danger',
      });
      return;
    }

    const res = onSaveProduct({
      producto: producto.trim(),
      variante: variante.trim(),
      nombre: nombreGenerado,
      tipo: tipo.trim() || 'General',
      marca: marca.trim(),
      sku: sku.trim(),
      precio: numPrecio,
    });

    if (res.success) {
      setAlert({
        message: `Producto "${nombreGenerado}" guardado correctamente en la base de datos.`,
        type: 'success',
      });
      // Reset form
      setProducto('');
      setVariante('');
      setMarca('');
      setPrecio('');
      setSku(generateSKU());
    } else {
      setAlert({ message: res.error || 'Error al guardar el producto.', type: 'danger' });
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center">
            <PlusCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Registrar Nuevo Producto</h2>
            <p className="text-xs text-slate-500">
              Ingresa los datos del producto con la misma estructura oficial de Casa Matriz
            </p>
          </div>
        </div>

        {alert && (
          <div
            className={`p-4 rounded-xl mb-6 flex items-start gap-3 border ${
              alert.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-red-50 border-red-200 text-red-900'
            }`}
          >
            {alert.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 text-xs">
              <span className="font-semibold">{alert.message}</span>
              {alert.type === 'success' && (
                <button
                  type="button"
                  onClick={onNavigateToCatalog}
                  className="block mt-1 font-bold text-emerald-700 hover:underline"
                >
                  Ver en el Catálogo Completo &rarr;
                </button>
              )}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Producto Base */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Producto (Nombre Base) *
              </label>
              <input
                type="text"
                required
                value={producto}
                onChange={(e) => setProducto(e.target.value)}
                placeholder="Ej: Sabanilla FIT, Churu gato, Kong"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all font-medium"
              />
            </div>

            {/* Variante */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Variante / Formato
              </label>
              <input
                type="text"
                value={variante}
                onChange={(e) => setVariante(e.target.value)}
                placeholder="Ej: 90*60cms, Adulto, 3 kgs, Truto pollo"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          {/* Nombre autogenerado */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-[11px] font-semibold text-slate-500 block mb-0.5">
              Nombre Completo en Catálogo (autogenerado):
            </span>
            <span className="text-sm font-bold text-slate-800">
              {nombreGenerado || <span className="text-slate-400 font-normal italic">Escribe el producto base arriba</span>}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Tipo / Categoría */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Tipo / Categoría *
              </label>
              <input
                type="text"
                required
                list="categoryDatalist"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                placeholder="Ej: Higiene, Snack, Alimentos"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
              />
              <datalist id="categoryDatalist">
                {categories.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>

            {/* Marca */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Marca
              </label>
              <input
                type="text"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                placeholder="Ej: Drag Pharma, Royal, Oxbow"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
              />
            </div>

            {/* SKU */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Código SKU *
                </label>
                <button
                  type="button"
                  onClick={handleGenerateSku}
                  className="text-[11px] text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-0.5"
                  title="Generar SKU de 13 dígitos automáticamente"
                >
                  <Sparkles className="w-3 h-3" /> Generar
                </button>
              </div>
              <input
                type="text"
                required
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="Ej: 7800006010125"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
            {/* Precio */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Precio Venta Bruto ($ CLP) *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-slate-400 font-semibold text-sm">$</span>
                <input
                  type="number"
                  required
                  min="0"
                  step="1"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  placeholder="Ej: 16000"
                  className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all tabular-nums"
                />
              </div>
              <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-500 font-mono">
                <span>Neto: <strong className="text-slate-700">{formatCLP(neto)}</strong></span>
                <span>·</span>
                <span>IVA (19%): <strong className="text-slate-700">{formatCLP(iva)}</strong></span>
              </div>
            </div>

            {/* Live Barcode Preview */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex flex-col items-center justify-center min-h-[82px]">
              <span className="text-[10px] text-slate-400 uppercase font-semibold mb-1">
                Código de Barras
              </span>
              <BarcodeBadge value={sku} height={28} />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-xs shadow-emerald-600/20 hover:shadow-md transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              Guardar Producto en la Base de Datos
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
