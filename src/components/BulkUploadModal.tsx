import { useState, useRef } from 'react';
import { Product, BulkUploadRow } from '../types/product';
import {
  parsePastedTableData,
  generateSKU,
  parsePrice,
  downloadSampleTemplateCSV,
  formatCLP,
} from '../utils/productUtils';
import {
  X,
  Plus,
  Trash2,
  Upload,
  FileSpreadsheet,
  ClipboardPaste,
  Download,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Info,
} from 'lucide-react';

interface BulkUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (products: Omit<Product, 'id'>[], updateExisting: boolean) => { added: number; updated: number };
  categories: string[];
}

export function BulkUploadModal({ isOpen, onClose, onImport, categories }: BulkUploadModalProps) {
  const [activeTab, setActiveTab] = useState<'grid' | 'paste' | 'file'>('grid');
  const [rows, setRows] = useState<BulkUploadRow[]>(() => createInitialRows(3));
  const [pasteText, setPasteText] = useState('');
  const [updateExisting, setUpdateExisting] = useState(true);
  const [importSummary, setImportSummary] = useState<{ added: number; updated: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  function createInitialRows(count: number): BulkUploadRow[] {
    const list: BulkUploadRow[] = [];
    for (let i = 0; i < count; i++) {
      list.push({
        rowId: `row-${Date.now()}-${i}-${Math.random().toString(36).substr(2, 4)}`,
        producto: '',
        variante: '',
        nombre: '',
        tipo: 'Alimentos',
        precio: '',
        sku: generateSKU(),
        marca: '',
        errors: [],
        isValid: false,
      });
    }
    return list;
  }

  const addRows = (count: number) => {
    const newRows: BulkUploadRow[] = [];
    for (let i = 0; i < count; i++) {
      newRows.push({
        rowId: `row-${Date.now()}-${rows.length + i}-${Math.random().toString(36).substr(2, 4)}`,
        producto: '',
        variante: '',
        nombre: '',
        tipo: 'Alimentos',
        precio: '',
        sku: generateSKU(),
        marca: '',
        errors: [],
        isValid: false,
      });
    }
    setRows([...rows, ...newRows]);
  };

  const removeRow = (rowId: string) => {
    setRows(rows.filter(r => r.rowId !== rowId));
  };

  const updateRowField = (rowId: string, field: keyof BulkUploadRow, value: any) => {
    setRows(prevRows =>
      prevRows.map(row => {
        if (row.rowId !== rowId) return row;

        const updated = { ...row, [field]: value };

        // Auto-update nombre if producto or variante changed
        if (field === 'producto' || field === 'variante') {
          const prod = field === 'producto' ? value : row.producto;
          const vari = field === 'variante' ? value : row.variante;
          updated.nombre = vari ? `${prod} - ${vari}` : prod;
        }

        // Validate row
        const errors: string[] = [];
        const numPrice = parsePrice(updated.precio);
        if (!updated.producto.trim()) errors.push('Falta producto');
        if (numPrice <= 0) errors.push('Precio debe ser > 0');

        updated.errors = errors;
        updated.isValid = errors.length === 0;

        return updated;
      })
    );
  };

  const handleProcessPastedText = () => {
    if (!pasteText.trim()) return;
    const parsedRows = parsePastedTableData(pasteText);
    if (parsedRows.length > 0) {
      setRows(parsedRows);
      setActiveTab('grid');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        const parsedRows = parsePastedTableData(text);
        if (parsedRows.length > 0) {
          setRows(parsedRows);
          setActiveTab('grid');
        }
      }
    };
    reader.readAsText(file);
  };

  const fillExampleData = () => {
    const examples = [
      { producto: 'Snack Barkies', variante: 'Gourmet 150g', tipo: 'Snack', precio: 4500, sku: '7801234567890', marca: 'Barkies' },
      { producto: 'Shampoo Hipoalergénico', variante: '500ml', tipo: 'Higiene', precio: 8900, sku: '7809876543210', marca: 'Traper' },
      { producto: 'Pelota de Goma Resistente', variante: 'Talla M', tipo: 'Juguetes', precio: 6200, sku: '7804561237895', marca: 'Kong' },
      { producto: 'Collar Reflectante Neopreno', variante: 'Rojo L', tipo: 'Accesorios', precio: 12500, sku: '7806543219874', marca: 'Kulcan' },
    ];

    const filledRows: BulkUploadRow[] = examples.map((ex, i) => ({
      rowId: `sample-${Date.now()}-${i}`,
      producto: ex.producto,
      variante: ex.variante,
      nombre: `${ex.producto} - ${ex.variante}`,
      tipo: ex.tipo,
      precio: ex.precio,
      sku: ex.sku,
      marca: ex.marca,
      errors: [],
      isValid: true,
    }));

    setRows(filledRows);
  };

  const validRows = rows.filter(r => r.producto.trim().length > 0 && parsePrice(r.precio) > 0);

  const handleFinalImport = () => {
    if (validRows.length === 0) return;

    const payload: Omit<Product, 'id'>[] = validRows.map(r => ({
      producto: r.producto.trim(),
      variante: r.variante.trim(),
      nombre: r.nombre.trim() || (r.variante.trim() ? `${r.producto.trim()} - ${r.variante.trim()}` : r.producto.trim()),
      tipo: r.tipo.trim() || 'General',
      precio: parsePrice(r.precio),
      sku: r.sku.trim() || generateSKU(),
      marca: r.marca.trim(),
    }));

    const result = onImport(payload, updateExisting);
    setImportSummary(result);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white rounded-2xl max-w-5xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/10 text-emerald-700 flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Formulario Interactivo de Carga Masiva
              </h2>
              <p className="text-xs text-slate-500">
                Incorpora múltiples productos con los títulos exactos de la base de datos
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

        {/* Success Banner if just imported */}
        {importSummary && (
          <div className="m-5 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold text-emerald-900 text-sm">
                  ¡Carga masiva completada con éxito!
                </p>
                <p className="text-xs text-emerald-700">
                  Se incorporaron <strong>{importSummary.added}</strong> nuevos productos y se actualizaron{' '}
                  <strong>{importSummary.updated}</strong> productos existentes.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold"
            >
              Ver en Catálogo
            </button>
          </div>
        )}

        {/* Tab Controls */}
        <div className="px-6 pt-3 border-b border-slate-100 flex items-center justify-between gap-4 bg-white">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('grid')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-t-lg border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'grid'
                  ? 'border-emerald-600 text-emerald-700 bg-emerald-50/40'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              Cuadrícula Interactiva ({rows.length})
            </button>
            <button
              onClick={() => setActiveTab('paste')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-t-lg border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'paste'
                  ? 'border-emerald-600 text-emerald-700 bg-emerald-50/40'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <ClipboardPaste className="w-4 h-4" />
              Pegar desde Excel / Sheets
            </button>
            <button
              onClick={() => setActiveTab('file')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-t-lg border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'file'
                  ? 'border-emerald-600 text-emerald-700 bg-emerald-50/40'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Upload className="w-4 h-4" />
              Subir Archivo CSV
            </button>
          </div>

          <button
            onClick={downloadSampleTemplateCSV}
            className="text-xs font-semibold text-slate-600 hover:text-emerald-700 flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Descargar Plantilla CSV
          </button>
        </div>

        {/* Main Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* TAB 1: INTERACTIVE EDITABLE GRID */}
          {activeTab === 'grid' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-700">Agregar filas:</span>
                  <button
                    onClick={() => addRows(1)}
                    className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-md text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> 1 Fila
                  </button>
                  <button
                    onClick={() => addRows(5)}
                    className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-md text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> 5 Filas
                  </button>
                  <button
                    onClick={() => addRows(10)}
                    className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-md text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> 10 Filas
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={fillExampleData}
                    className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    Cargar 4 ejemplos de prueba
                  </button>
                  <button
                    onClick={() => setRows([])}
                    className="px-2.5 py-1 text-slate-500 hover:text-red-600 text-xs font-medium transition-colors"
                  >
                    Limpiar cuadrícula
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200 select-none">
                    <tr>
                      <th className="py-2.5 px-2 w-10 text-center">#</th>
                      <th className="py-2.5 px-3 min-w-[170px]">Producto Base *</th>
                      <th className="py-2.5 px-3 min-w-[130px]">Variante</th>
                      <th className="py-2.5 px-3 min-w-[120px]">Tipo / Categoría</th>
                      <th className="py-2.5 px-3 min-w-[120px]">Precio Venta (CLP) *</th>
                      <th className="py-2.5 px-3 min-w-[140px]">Código SKU</th>
                      <th className="py-2.5 px-3 min-w-[110px]">Marca</th>
                      <th className="py-2.5 px-2 w-12 text-center">Estado</th>
                      <th className="py-2.5 px-2 w-10 text-center"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {rows.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="py-10 text-center text-slate-400">
                          <p className="text-sm">No hay filas en la cuadrícula.</p>
                          <button
                            onClick={() => addRows(3)}
                            className="mt-2 text-xs text-emerald-600 hover:underline font-semibold"
                          >
                            Agregar 3 filas vacías
                          </button>
                        </td>
                      </tr>
                    ) : (
                      rows.map((row, index) => {
                        const priceNum = parsePrice(row.precio);
                        const isRowValid = row.producto.trim().length > 0 && priceNum > 0;
                        return (
                          <tr
                            key={row.rowId}
                            className={`transition-colors hover:bg-slate-50/80 ${
                              isRowValid ? 'bg-white' : 'bg-amber-50/20'
                            }`}
                          >
                            <td className="py-2 px-2 text-center font-mono text-slate-400 text-[11px]">
                              {index + 1}
                            </td>
                            {/* Producto */}
                            <td className="p-1.5">
                              <input
                                type="text"
                                value={row.producto}
                                onChange={(e) => updateRowField(row.rowId, 'producto', e.target.value)}
                                placeholder="Ej: Sabanilla FIT"
                                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-none focus:border-emerald-500 font-medium"
                              />
                            </td>
                            {/* Variante */}
                            <td className="p-1.5">
                              <input
                                type="text"
                                value={row.variante}
                                onChange={(e) => updateRowField(row.rowId, 'variante', e.target.value)}
                                placeholder="Ej: 90*60cms"
                                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-none focus:border-emerald-500"
                              />
                            </td>
                            {/* Tipo */}
                            <td className="p-1.5">
                              <select
                                value={row.tipo}
                                onChange={(e) => updateRowField(row.rowId, 'tipo', e.target.value)}
                                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-none focus:border-emerald-500"
                              >
                                {categories.map(c => (
                                  <option key={c} value={c}>{c}</option>
                                ))}
                                <option value="General">General</option>
                              </select>
                            </td>
                            {/* Precio */}
                            <td className="p-1.5">
                              <div className="relative">
                                <span className="absolute left-2 top-1.5 text-slate-400 text-xs">$</span>
                                <input
                                  type="number"
                                  min="0"
                                  step="100"
                                  value={row.precio}
                                  onChange={(e) => updateRowField(row.rowId, 'precio', e.target.value)}
                                  placeholder="0"
                                  className="w-full pl-5 pr-2.5 py-1.5 text-xs font-mono font-semibold bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-none focus:border-emerald-500 tabular-nums"
                                />
                              </div>
                            </td>
                            {/* SKU */}
                            <td className="p-1.5">
                              <input
                                type="text"
                                value={row.sku}
                                onChange={(e) => updateRowField(row.rowId, 'sku', e.target.value)}
                                placeholder="780..."
                                className="w-full px-2.5 py-1.5 text-xs font-mono bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-none focus:border-emerald-500"
                              />
                            </td>
                            {/* Marca */}
                            <td className="p-1.5">
                              <input
                                type="text"
                                value={row.marca}
                                onChange={(e) => updateRowField(row.rowId, 'marca', e.target.value)}
                                placeholder="Marca"
                                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-none focus:border-emerald-500"
                              />
                            </td>
                            {/* Valid Status */}
                            <td className="py-2 px-2 text-center">
                              {isRowValid ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" />
                              ) : (
                                <span title="Falta nombre o precio">
                                  <AlertCircle className="w-4 h-4 text-amber-500 inline" />
                                </span>
                              )}
                            </td>
                            {/* Delete button */}
                            <td className="py-2 px-2 text-center">
                              <button
                                onClick={() => removeRow(row.rowId)}
                                className="p-1 text-slate-400 hover:text-red-600 rounded transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span>
                  Filas listas para incorporar:{' '}
                  <strong className="text-emerald-700 font-semibold">{validRows.length}</strong> de {rows.length}
                </span>
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Info className="w-3.5 h-3.5" />
                  El campo 'nombre' se genera automáticamente como "Producto - Variante"
                </span>
              </div>
            </div>
          )}

          {/* TAB 2: PASTE FROM SPREADSHEETS */}
          {activeTab === 'paste' && (
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <ClipboardPaste className="w-4 h-4 text-emerald-700" />
                  <h3 className="text-xs font-bold text-slate-800">
                    Copiar y Pegar directamente desde Excel, Google Sheets o LibreOffice
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Copia las columnas de tu hoja de cálculo y pégalas aquí. Puedes incluir encabezados
                  (<strong>producto, variante, tipo, precio, sku, marca</strong>) o pegar directamente los datos en ese orden.
                </p>
              </div>

              <textarea
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                placeholder="Pega aquí los datos de tu planilla (ej: Sabanilla FIT	90*60cms	Higiene	16000	7800006010125	FIT)..."
                rows={9}
                className="w-full p-3 font-mono text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
              />

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleProcessPastedText}
                  disabled={!pasteText.trim()}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-semibold shadow-xs transition-all flex items-center gap-2"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  Procesar y Ver en Cuadrícula
                </button>
                <button
                  type="button"
                  onClick={() => setPasteText('')}
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  Limpiar texto
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: CSV FILE UPLOAD */}
          {activeTab === 'file' && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-8 text-center transition-colors bg-slate-50/50">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".csv,.txt,.tsv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-800 mb-1">
                  Selecciona tu archivo de productos CSV o TSV
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                  Compatible con exportaciones de Excel, Google Drive o cualquier software de inventario.
                </p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors inline-flex items-center gap-2"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Examinar archivo local
                </button>
              </div>

              <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-xl flex items-start gap-2.5">
                <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-xs text-blue-900">
                  <strong>Estructura esperada:</strong> Columnas tituladas <code>producto</code>, <code>variante</code>,{' '}
                  <code>tipo</code>, <code>precio</code>, <code>sku</code>, <code>marca</code>. Puedes usar la plantilla descargable como guía.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-xs text-slate-600 select-none cursor-pointer">
            <input
              type="checkbox"
              checked={updateExisting}
              onChange={(e) => setUpdateExisting(e.target.checked)}
              className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span>Si el código SKU ya existe, actualizar precio y datos</span>
          </label>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-xl transition-colors"
            >
              Cerrar
            </button>
            <button
              type="button"
              onClick={handleFinalImport}
              disabled={validRows.length === 0}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-xs font-bold rounded-xl shadow-xs shadow-emerald-600/30 hover:shadow-md transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              Guardar e Incorporar ({validRows.length} productos)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
