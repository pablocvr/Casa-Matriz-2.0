import { useState, useMemo } from 'react';
import {
  MISSING_ALIMENTOS,
  MISSING_SNACKS_HENO,
  MISSING_SALUD,
  MISSING_ACCESORIOS_HIGIENE,
  MissingProductItem,
} from '../data/missingProductsData';
import { Product } from '../types/product';
import { generateSKU, formatCLP, downloadCSV } from '../utils/productUtils';
import {
  X,
  Search,
  PlusCircle,
  Download,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Filter,
} from 'lucide-react';

interface MissingProductsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportItems: (newProducts: Omit<Product, 'id'>[]) => void;
}

export function MissingProductsModal({
  isOpen,
  onClose,
  onImportItems,
}: MissingProductsModalProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'alimentos' | 'snacks' | 'salud' | 'accesorios'>('alimentos');
  const [search, setSearch] = useState('');
  const [selectedNames, setSelectedNames] = useState<Set<string>>(new Set());
  const [importedSuccess, setImportedSuccess] = useState<number | null>(null);

  const allMissingList: MissingProductItem[] = useMemo(() => {
    return [
      ...MISSING_ALIMENTOS,
      ...MISSING_SNACKS_HENO,
      ...MISSING_SALUD,
      ...MISSING_ACCESORIOS_HIGIENE,
    ];
  }, []);

  const filteredList = useMemo(() => {
    return allMissingList.filter((item) => {
      if (activeFilter === 'alimentos' && item.categoria !== 'Alimentos') return false;
      if (activeFilter === 'snacks' && item.categoria !== 'Snack / Heno') return false;
      if (activeFilter === 'salud' && item.categoria !== 'Salud') return false;
      if (activeFilter === 'accesorios' && item.categoria !== 'Accesorios' && item.categoria !== 'Higiene') return false;

      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        item.nombre.toLowerCase().includes(q) ||
        item.producto.toLowerCase().includes(q) ||
        item.variante.toLowerCase().includes(q) ||
        item.marca.toLowerCase().includes(q)
      );
    });
  }, [allMissingList, activeFilter, search]);

  if (!isOpen) return null;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedNames(new Set(filteredList.map((i) => i.nombre)));
    } else {
      setSelectedNames(new Set());
    }
  };

  const toggleSelect = (nombre: string) => {
    const next = new Set(selectedNames);
    if (next.has(nombre)) next.delete(nombre);
    else next.add(nombre);
    setSelectedNames(next);
  };

  const handleImportSelected = () => {
    const toImport = allMissingList.filter((i) => selectedNames.has(i.nombre));
    if (toImport.length === 0) return;

    const payload: Omit<Product, 'id'>[] = toImport.map((item) => ({
      producto: item.producto,
      variante: item.variante,
      nombre: item.nombre,
      tipo: item.categoria === 'Snack / Heno' ? 'Snack' : item.categoria,
      marca: item.marca,
      sku: generateSKU(),
      precio: item.precioBruto,
    }));

    onImportItems(payload);
    setImportedSuccess(payload.length);
    setSelectedNames(new Set());
  };

  const handleImportAllAlimentos = () => {
    const payload: Omit<Product, 'id'>[] = MISSING_ALIMENTOS.map((item) => ({
      producto: item.producto,
      variante: item.variante,
      nombre: item.nombre,
      tipo: 'Alimentos',
      marca: item.marca,
      sku: generateSKU(),
      precio: item.precioBruto,
    }));

    onImportItems(payload);
    setImportedSuccess(payload.length);
  };

  const handleExportCSV = () => {
    const headers = ['Producto Base', 'Variante', 'Nombre Completo', 'Categoría', 'Marca', 'Precio Bruto (CLP)', 'Precio Neto (CLP)', 'Costo Neto (CLP)'];
    const rows = filteredList.map((i) => [
      `"${i.producto}"`,
      `"${i.variante}"`,
      `"${i.nombre}"`,
      `"${i.categoria}"`,
      `"${i.marca}"`,
      i.precioBruto,
      i.precioNeto,
      i.costoNeto,
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    downloadCSV(`alimentos_faltantes_casa_matriz.csv`, csvContent);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white rounded-2xl max-w-5xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Alimentos y Productos Faltantes Identificados
              </h2>
              <p className="text-xs text-slate-500">
                Comparativa de la nueva planilla contra la base de datos actual de Casa Matriz
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Alert */}
        {importedSuccess !== null && (
          <div className="m-5 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <p className="text-xs font-semibold text-emerald-900">
                ¡Se incorporaron exitosamente {importedSuccess} productos faltantes a la base de datos!
              </p>
            </div>
            <button
              onClick={() => setImportedSuccess(null)}
              className="text-xs text-emerald-700 hover:underline font-bold"
            >
              Aceptar
            </button>
          </div>
        )}

        {/* Filter Bar */}
        <div className="px-6 py-3 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-white">
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              onClick={() => setActiveFilter('alimentos')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                activeFilter === 'alimentos'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Alimentos Faltantes ({MISSING_ALIMENTOS.length})
            </button>
            <button
              onClick={() => setActiveFilter('snacks')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                activeFilter === 'snacks'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Snacks / Heno ({MISSING_SNACKS_HENO.length})
            </button>
            <button
              onClick={() => setActiveFilter('salud')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                activeFilter === 'salud'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Salud / Farmacia ({MISSING_SALUD.length})
            </button>
            <button
              onClick={() => setActiveFilter('accesorios')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                activeFilter === 'accesorios'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Higiene / Accesorios ({MISSING_ACCESORIOS_HIGIENE.length})
            </button>
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                activeFilter === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Todos ({allMissingList.length})
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="text-xs font-semibold text-slate-600 hover:text-emerald-700 flex items-center gap-1.5 py-1.5 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Descargar CSV
            </button>
            <button
              onClick={handleImportAllAlimentos}
              className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Incorporar los {MISSING_ALIMENTOS.length} Alimentos
            </button>
          </div>
        </div>

        {/* Search input */}
        <div className="px-6 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar en la lista de faltantes (ej: Royal, Proplan, 12 kgs, Urinary, Hepatic)..."
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>
          <span className="text-xs text-slate-500 font-medium">
            {filteredList.length} elementos listados
          </span>
        </div>

        {/* Table Body */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200 select-none">
                <tr>
                  <th className="py-2.5 px-3 w-8 text-center">
                    <input
                      type="checkbox"
                      checked={filteredList.length > 0 && selectedNames.size === filteredList.length}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                  </th>
                  <th className="py-2.5 px-3">Producto Base</th>
                  <th className="py-2.5 px-3">Variante / Formato</th>
                  <th className="py-2.5 px-3">Marca</th>
                  <th className="py-2.5 px-3">Categoría</th>
                  <th className="py-2.5 px-3 text-right">Precio Neto</th>
                  <th className="py-2.5 px-3 text-right">Precio Bruto (CLP)</th>
                  <th className="py-2.5 px-3 text-right">Costo Neto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredList.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-slate-400">
                      No se encontraron elementos con los criterios seleccionados.
                    </td>
                  </tr>
                ) : (
                  filteredList.map((item, idx) => {
                    const isChecked = selectedNames.has(item.nombre);
                    return (
                      <tr
                        key={idx}
                        className={`hover:bg-slate-50/80 transition-colors ${
                          isChecked ? 'bg-emerald-50/30' : ''
                        }`}
                      >
                        <td className="py-2 px-3 text-center">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleSelect(item.nombre)}
                            className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                          />
                        </td>
                        <td className="py-2 px-3 font-bold text-slate-900">
                          {item.producto}
                        </td>
                        <td className="py-2 px-3 text-slate-700">
                          {item.variante || '-'}
                        </td>
                        <td className="py-2 px-3 text-slate-600">
                          {item.marca || '-'}
                        </td>
                        <td className="py-2 px-3">
                          <span className="font-semibold text-slate-700">{item.categoria}</span>
                        </td>
                        <td className="py-2 px-3 text-right font-mono text-slate-600 tabular-nums">
                          {formatCLP(item.precioNeto)}
                        </td>
                        <td className="py-2 px-3 text-right font-bold text-emerald-700 tabular-nums">
                          {formatCLP(item.precioBruto)}
                        </td>
                        <td className="py-2 px-3 text-right font-mono text-slate-400 tabular-nums">
                          {item.costoNeto > 0 ? formatCLP(item.costoNeto) : '-'}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-600">
            {selectedNames.size > 0 ? (
              <strong>{selectedNames.size} producto(s) seleccionado(s)</strong>
            ) : (
              `Total faltantes en esta vista: ${filteredList.length}`
            )}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg"
            >
              Cerrar
            </button>
            {selectedNames.size > 0 && (
              <button
                onClick={handleImportSelected}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs"
              >
                <PlusCircle className="w-4 h-4" />
                Incorporar Seleccionados ({selectedNames.size})
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
