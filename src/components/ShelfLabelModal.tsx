import { Product } from '../types/product';
import { calculateTax, formatCLP } from '../utils/productUtils';
import { BarcodeBadge } from './BarcodeBadge';
import { X, Printer } from 'lucide-react';

interface ShelfLabelModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ShelfLabelModal({ product, onClose }: ShelfLabelModalProps) {
  if (!product) return null;

  const { neto, iva } = calculateTax(product.precio);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50 no-print">
          <h3 className="text-sm font-bold text-slate-900">Etiqueta de Góndola / Precio</h3>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Printable Label Area */}
        <div className="p-6 flex justify-center">
          <div className="w-80 border-2 border-slate-900 rounded-xl p-4 bg-white shadow-sm flex flex-col justify-between text-slate-900 select-none">
            {/* Store & Category */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2">
              <span className="text-[11px] font-extrabold tracking-wider uppercase text-emerald-800">
                Casa Matriz
              </span>
              <span className="text-[10px] text-slate-500 font-medium">
                {product.tipo || 'General'} {product.marca ? `· ${product.marca}` : ''}
              </span>
            </div>

            {/* Product Title */}
            <div className="my-2">
              <h4 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">
                {product.nombre}
              </h4>
              {product.variante && (
                <span className="text-xs text-slate-600 block mt-0.5">
                  Variante: {product.variante}
                </span>
              )}
            </div>

            {/* Main Price */}
            <div className="my-3 py-2 bg-slate-50 rounded-lg text-center border border-slate-200/80">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                Precio Venta Público
              </span>
              <span className="text-3xl font-extrabold text-slate-950 font-mono tracking-tight tabular-nums block">
                {formatCLP(product.precio)}
              </span>
              <span className="text-[10px] text-slate-500">IVA incluido</span>
            </div>

            {/* Tax Breakdown */}
            <div className="flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-200 pt-1.5 mb-3 font-mono">
              <span>Neto: {formatCLP(neto)}</span>
              <span>IVA (19%): {formatCLP(iva)}</span>
            </div>

            {/* Barcode */}
            <div className="flex justify-center pt-1">
              <BarcodeBadge value={product.sku} height={32} />
            </div>
          </div>
        </div>

        {/* Footer controls */}
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-2 no-print">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg"
          >
            Cerrar
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            Imprimir Etiqueta
          </button>
        </div>
      </div>
    </div>
  );
}
