import { useState, useMemo } from 'react';
import { Product } from '../types/product';
import { formatCLP, exportProductsToCSV } from '../utils/productUtils';
import {
  Search,
  Filter,
  Download,
  Trash2,
  Edit2,
  Printer,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  RefreshCw,
  Plus,
  FileSpreadsheet,
} from 'lucide-react';

interface CatalogTableTabProps {
  products: Product[];
  onEditProduct: (p: Product) => void;
  onDeleteProduct: (id: string) => void;
  onDeleteMultiple: (ids: string[]) => void;
  onPrintLabel: (p: Product) => void;
  onOpenAddSingle: () => void;
  onOpenBulkUpload: () => void;
  onResetDefaults: () => void;
}

export function CatalogTableTab({
  products,
  onEditProduct,
  onDeleteProduct,
  onDeleteMultiple,
  onPrintLabel,
  onOpenAddSingle,
  onOpenBulkUpload,
  onResetDefaults,
}: CatalogTableTabProps) {
  const [filterText, setFilterText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [sortField, setSortField] = useState<'nombre' | 'precio' | 'sku' | 'tipo'>('nombre');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  // Extract unique categories and brands
  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach(p => {
      if (p.tipo) set.add(p.tipo);
    });
    return Array.from(set).sort();
  }, [products]);

  const brands = useMemo(() => {
    const set = new Set<string>();
    products.forEach(p => {
      if (p.marca) set.add(p.marca);
    });
    return Array.from(set).sort();
  }, [products]);

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    const q = filterText.trim().toLowerCase();
    return products
      .filter(p => {
        if (selectedCategory !== 'all' && p.tipo !== selectedCategory) return false;
        if (selectedBrand !== 'all' && p.marca !== selectedBrand) return false;
        if (!q) return true;
        return (
          p.nombre.toLowerCase().includes(q) ||
          p.producto.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.marca.toLowerCase().includes(q) ||
          p.variante.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        let valA = a[sortField] || '';
        let valB = b[sortField] || '';
        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [products, filterText, selectedCategory, selectedBrand, sortField, sortOrder]);

  // Pagination
  const totalPages = pageSize === -1 ? 1 : Math.ceil(filteredProducts.length / pageSize);
  const paginatedProducts = useMemo(() => {
    if (pageSize === -1) return filteredProducts;
    const start = (currentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, currentPage, pageSize]);

  const toggleSort = (field: 'nombre' | 'precio' | 'sku' | 'tipo') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(paginatedProducts.map(p => p.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const toggleSelectRow = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleDeleteSelected = () => {
    if (selectedIds.size === 0) return;
    if (window.confirm(`¿Estás seguro de eliminar ${selectedIds.size} productos seleccionados?`)) {
      onDeleteMultiple(Array.from(selectedIds));
      setSelectedIds(new Set());
    }
  };

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={filterText}
              onChange={(e) => {
                setFilterText(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Filtrar por nombre, variante, SKU o marca..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
            />
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenAddSingle}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Nuevo Producto
            </button>
            <button
              onClick={onOpenBulkUpload}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Carga Masiva
            </button>
            <button
              onClick={() => exportProductsToCSV(filteredProducts)}
              className="px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-4 h-4 text-slate-500" />
              Exportar CSV
            </button>
          </div>
        </div>

        {/* Filter Dropdowns and Stats */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-slate-500">Categoría:</span>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-emerald-500"
              >
                <option value="all">Todas ({products.length})</option>
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {brands.length > 0 && (
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-500">Marca:</span>
                <select
                  value={selectedBrand}
                  onChange={(e) => {
                    setSelectedBrand(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-emerald-500"
                >
                  <option value="all">Todas</option>
                  {brands.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            )}

            {selectedIds.size > 0 && (
              <button
                onClick={handleDeleteSelected}
                className="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Eliminar seleccionados ({selectedIds.size})
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span>
              Mostrando <strong className="text-slate-900">{filteredProducts.length}</strong> de {products.length} productos
            </span>
            <button
              onClick={onResetDefaults}
              className="text-slate-400 hover:text-slate-600 flex items-center gap-1 text-[11px]"
              title="Restablecer base de datos inicial de 494 productos"
            >
              <RefreshCw className="w-3 h-3" /> Restablecer inicial
            </button>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-100/70 text-slate-700 font-semibold border-b border-slate-200 select-none">
              <tr>
                <th className="py-3 px-3 w-8 text-center">
                  <input
                    type="checkbox"
                    checked={paginatedProducts.length > 0 && selectedIds.size === paginatedProducts.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                </th>
                <th
                  onClick={() => toggleSort('nombre')}
                  className="py-3 px-4 cursor-pointer hover:text-emerald-700"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Nombre Completo</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3 px-4">Producto Base</th>
                <th className="py-3 px-4">Variante</th>
                <th
                  onClick={() => toggleSort('tipo')}
                  className="py-3 px-4 cursor-pointer hover:text-emerald-700"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Tipo / Categoría</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3 px-4">Marca</th>
                <th
                  onClick={() => toggleSort('sku')}
                  className="py-3 px-4 cursor-pointer hover:text-emerald-700 font-mono"
                >
                  <div className="flex items-center gap-1.5">
                    <span>SKU</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort('precio')}
                  className="py-3 px-4 text-right cursor-pointer hover:text-emerald-700"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Precio Bruto</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3 px-4 text-center w-28">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedProducts.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    No se encontraron productos con los filtros seleccionados.
                  </td>
                </tr>
              ) : (
                paginatedProducts.map((prod) => {
                  const isChecked = selectedIds.has(prod.id);
                  return (
                    <tr
                      key={prod.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        isChecked ? 'bg-emerald-50/30' : ''
                      }`}
                    >
                      <td className="py-3 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSelectRow(prod.id)}
                          className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                        />
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900 text-sm">
                        {prod.nombre}
                      </td>
                      <td className="py-3 px-4 text-slate-700">
                        {prod.producto || '-'}
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {prod.variante || '-'}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-slate-700">{prod.tipo || 'General'}</span>
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {prod.marca || '-'}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-600">
                        {prod.sku || 'N/A'}
                      </td>
                      <td className="py-3 px-4 text-right font-extrabold text-emerald-700 text-sm tabular-nums">
                        {formatCLP(prod.precio)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => onPrintLabel(prod)}
                            title="Imprimir Etiqueta"
                            className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                          >
                            <Printer className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onEditProduct(prod)}
                            title="Editar Producto"
                            className="p-1.5 text-slate-400 hover:text-emerald-700 hover:bg-slate-100 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`¿Eliminar ${prod.nombre}?`)) {
                                onDeleteProduct(prod.id);
                              }
                            }}
                            title="Eliminar"
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-slate-100 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span>Filas por página:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2 py-1 bg-white border border-slate-300 rounded-md text-xs focus:outline-none"
            >
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={-1}>Todos</option>
            </select>
          </div>

          {pageSize !== -1 && totalPages > 1 && (
            <div className="flex items-center gap-2">
              <span className="text-slate-500">
                Página {currentPage} de {totalPages}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 bg-white hover:bg-slate-100 disabled:opacity-40 text-slate-700 border border-slate-300 rounded-md transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 bg-white hover:bg-slate-100 disabled:opacity-40 text-slate-700 border border-slate-300 rounded-md transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
