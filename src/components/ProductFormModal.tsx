import { useState, useEffect } from 'react';
import { Product, ProductInput } from '../types/product';
import { calculateTax, formatCLP, generateSKU } from '../utils/productUtils';
import { X, Sparkles, Check, DollarSign, Tag, Barcode, Layers, Building } from 'lucide-react';
import { BarcodeBadge } from './BarcodeBadge';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: ProductInput) => void;
  initialProduct?: Product | null;
  categories: string[];
  brands: string[];
}

export function ProductFormModal({
  isOpen,
  onClose,
  onSave,
  initialProduct,
  categories,
  brands,
}: ProductFormModalProps) {
  const [producto, setProducto] = useState('');
  const [variante, setVariante] = useState('');
  const [nombre, setNombre] = useState('');
  const [autoNombre, setAutoNombre] = useState(true);
  const [tipo, setTipo] = useState('Alimentos');
  const [customTipo, setCustomTipo] = useState('');
  const [precio, setPrecio] = useState<number | ''>(10000);
  const [sku, setSku] = useState('');
  const [marca, setMarca] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialProduct) {
      setProducto(initialProduct.producto || '');
      setVariante(initialProduct.variante || '');
      setNombre(initialProduct.nombre || '');
      setAutoNombre(false);
      setTipo(initialProduct.tipo || 'Alimentos');
      setPrecio(initialProduct.precio || 0);
      setSku(initialProduct.sku || '');
      setMarca(initialProduct.marca || '');
    } else {
      setProducto('');
      setVariante('');
      setNombre('');
      setAutoNombre(true);
      setTipo('Alimentos');
      setCustomTipo('');
      setPrecio(10000);
      setSku(generateSKU());
      setMarca('');
    }
    setErrors({});
  }, [initialProduct, isOpen]);

  // Handle auto-updating 'nombre' when producto or variante changes
  const handleProductoChange = (val: string) => {
    setProducto(val);
    if (autoNombre) {
      setNombre(variante.trim() ? `${val.trim()} - ${variante.trim()}` : val.trim());
    }
  };

  const handleVarianteChange = (val: string) => {
    setVariante(val);
    if (autoNombre) {
      setNombre(val.trim() ? `${producto.trim()} - ${val.trim()}` : producto.trim());
    }
  };

  if (!isOpen) return null;

  const currentPrice = typeof precio === 'number' ? precio : 0;
  const { neto, iva } = calculateTax(currentPrice);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!producto.trim() && !nombre.trim()) {
      newErrors.producto = 'Debes ingresar el nombre del producto';
    }
    if (currentPrice <= 0) {
      newErrors.precio = 'El precio debe ser mayor a 0';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const finalTipo = tipo === '__custom__' ? customTipo.trim() || 'General' : tipo;
    const finalNombre = nombre.trim() || (variante.trim() ? `${producto.trim()} - ${variante.trim()}` : producto.trim());
    const finalSku = sku.trim() || generateSKU();

    onSave({
      id: initialProduct?.id,
      producto: producto.trim() || finalNombre,
      variante: variante.trim(),
      nombre: finalNombre,
      tipo: finalTipo,
      precio: currentPrice,
      sku: finalSku,
      marca: marca.trim(),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {initialProduct ? 'Editar Producto' : 'Incorporar Nuevo Producto'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Campos estandarizados de la base de datos Casa Matriz
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Producto Base */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Producto Base *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={producto}
                  onChange={(e) => handleProductoChange(e.target.value)}
                  placeholder="Ej: Sabanilla FIT, Fit Snack, Mazuri"
                  className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all ${
                    errors.producto ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
                  }`}
                />
              </div>
              {errors.producto && (
                <p className="text-xs text-red-600 mt-1">{errors.producto}</p>
              )}
            </div>

            {/* Variante / Presentación */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Variante / Formato
              </label>
              <input
                type="text"
                value={variante}
                onChange={(e) => handleVarianteChange(e.target.value)}
                placeholder="Ej: 90*60cms, Truto pollo, 3 kgs, L"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          {/* Nombre Completo */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Nombre en Catálogo y Boleta (nombre)
              </label>
              <button
                type="button"
                onClick={() => setAutoNombre(!autoNombre)}
                className={`text-[11px] font-medium transition-colors ${
                  autoNombre ? 'text-emerald-600 font-semibold' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {autoNombre ? '✓ Generación automática activa' : 'Editar manualmente'}
              </button>
            </div>
            <input
              type="text"
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value);
                setAutoNombre(false);
              }}
              placeholder="Ej: Sabanilla FIT - 90*60cms"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tipo / Categoría */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Tipo / Categoría (tipo)
              </label>
              <div className="relative">
                <select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all appearance-none"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                  <option value="__custom__">+ Otra categoría personalizada</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                  <Layers className="w-4 h-4" />
                </div>
              </div>
              {tipo === '__custom__' && (
                <input
                  type="text"
                  value={customTipo}
                  onChange={(e) => setCustomTipo(e.target.value)}
                  placeholder="Escribe la nueva categoría"
                  className="w-full mt-2 px-3 py-2 bg-white border border-emerald-400 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              )}
            </div>

            {/* Marca */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Marca (marca)
              </label>
              <div className="relative">
                <input
                  type="text"
                  list="brandsList"
                  value={marca}
                  onChange={(e) => setMarca(e.target.value)}
                  placeholder="Ej: Wild, Royal Canin, Fit, Zoetis"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                />
                <datalist id="brandsList">
                  {brands.filter(Boolean).map((b) => (
                    <option key={b} value={b} />
                  ))}
                </datalist>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                  <Building className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Precio Venta Bruto */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Precio Venta Bruto (CLP) *
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 font-semibold text-sm">
                  $
                </div>
                <input
                  type="number"
                  min="0"
                  step="50"
                  required
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="Ej: 16000"
                  className={`w-full pl-8 pr-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all ${
                    errors.precio ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
                  }`}
                />
              </div>
              {/* Tax preview helper */}
              <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-500">
                <span>Neto: <strong className="text-slate-700">{formatCLP(neto)}</strong></span>
                <span>·</span>
                <span>IVA (19%): <strong className="text-slate-700">{formatCLP(iva)}</strong></span>
              </div>
              {errors.precio && (
                <p className="text-xs text-red-600 mt-1">{errors.precio}</p>
              )}
            </div>

            {/* Código SKU / Barras */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Código SKU / Barras (sku)
                </label>
                <button
                  type="button"
                  onClick={() => setSku(generateSKU())}
                  className="text-[11px] text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" /> Generar SKU
                </button>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  placeholder="Ej: 7800006010125"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Live Preview Box */}
          <div className="p-4 bg-emerald-50/40 rounded-xl border border-emerald-200/60 mt-4">
            <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block mb-2">
              Vista previa en Verificador
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-medium text-emerald-700">
                  {tipo === '__custom__' ? customTipo || 'General' : tipo} {marca ? `· ${marca}` : ''}
                </div>
                <div className="font-bold text-slate-900 text-base">
                  {nombre || producto || 'Nombre del producto'}
                </div>
                <div className="text-xs font-mono text-slate-500 mt-0.5">
                  SKU: {sku || '---'}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xs text-slate-500">Precio Bruto</div>
                <div className="text-2xl font-extrabold text-emerald-700 tabular-nums">
                  {formatCLP(currentPrice)}
                </div>
              </div>
            </div>
          </div>

          {/* Footer buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow-xs shadow-emerald-600/20 hover:shadow-md transition-all flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              {initialProduct ? 'Guardar Cambios' : 'Incorporar a Base de Datos'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
