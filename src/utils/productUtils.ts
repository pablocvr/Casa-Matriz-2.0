import { Product, BulkUploadRow } from '../types/product';

export function formatCLP(val: number | string | undefined | null): string {
  if (val === undefined || val === null || val === '') return '$0';
  const num = typeof val === 'string' ? parseFloat(val.replace(/[^0-9.-]+/g, '')) : val;
  if (isNaN(num)) return '$0';
  return '$' + Math.round(num).toLocaleString('es-CL');
}

export function calculateTax(grossPrice: number): { neto: number; iva: number } {
  if (!grossPrice || grossPrice <= 0) return { neto: 0, iva: 0 };
  const neto = Math.round(grossPrice / 1.19);
  const iva = grossPrice - neto;
  return { neto, iva };
}

export function generateSKU(): string {
  const prefix = '780';
  const randomPart = Math.floor(1000000000 + Math.random() * 9000000000).toString();
  return (prefix + randomPart).slice(0, 13);
}

export function sanitizeText(str: string | undefined | null): string {
  return (str || '').trim();
}

export function parsePrice(val: any): number {
  if (typeof val === 'number') return isNaN(val) ? 0 : Math.round(val);
  if (!val) return 0;
  const cleaned = String(val).replace(/[^0-9]/g, '');
  const parsed = parseInt(cleaned, 10);
  return isNaN(parsed) ? 0 : parsed;
}

export function parsePastedTableData(rawText: string): BulkUploadRow[] {
  if (!rawText.trim()) return [];

  const lines = rawText.split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length === 0) return [];

  // Detect delimiter: tab, comma, semicolon
  const firstLine = lines[0];
  let delimiter = '\t';
  if (firstLine.includes('\t')) {
    delimiter = '\t';
  } else if (firstLine.includes(';') && !firstLine.includes(',')) {
    delimiter = ';';
  } else if (firstLine.includes(',')) {
    delimiter = ',';
  }

  // Check if first row is header
  const lowerFirstLine = firstLine.toLowerCase();
  const hasHeader =
    lowerFirstLine.includes('producto') ||
    lowerFirstLine.includes('nombre') ||
    lowerFirstLine.includes('precio') ||
    lowerFirstLine.includes('sku') ||
    lowerFirstLine.includes('tipo');

  const startIndex = hasHeader ? 1 : 0;
  let headers = ['producto', 'variante', 'tipo', 'precio', 'sku', 'marca'];

  if (hasHeader) {
    const rawHeaders = splitLine(firstLine, delimiter).map(h => h.trim().toLowerCase());
    headers = rawHeaders.map(h => {
      if (h.includes('nombre') && !h.includes('variante')) return 'nombre';
      if (h.includes('producto')) return 'producto';
      if (h.includes('variante') || h.includes('formato') || h.includes('medida')) return 'variante';
      if (h.includes('tipo') || h.includes('categ')) return 'tipo';
      if (h.includes('precio') || h.includes('valor')) return 'precio';
      if (h.includes('sku') || h.includes('codigo') || h.includes('barra')) return 'sku';
      if (h.includes('marca')) return 'marca';
      return h;
    });
  }

  const result: BulkUploadRow[] = [];

  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i];
    const columns = splitLine(line, delimiter).map(c => c.trim().replace(/^["']|["']$/g, ''));
    if (columns.length === 0 || columns.every(c => c === '')) continue;

    let producto = '';
    let variante = '';
    let nombre = '';
    let tipo = 'General';
    let precioRaw = '';
    let sku = '';
    let marca = '';

    if (hasHeader) {
      headers.forEach((h, colIndex) => {
        const val = columns[colIndex] || '';
        if (h === 'producto') producto = val;
        else if (h === 'variante') variante = val;
        else if (h === 'nombre') nombre = val;
        else if (h === 'tipo') tipo = val || 'General';
        else if (h === 'precio') precioRaw = val;
        else if (h === 'sku') sku = val;
        else if (h === 'marca') marca = val;
      });
    } else {
      // Default order: producto, variante, tipo, precio, sku, marca
      if (columns.length >= 1) producto = columns[0] || '';
      if (columns.length >= 2) variante = columns[1] || '';
      if (columns.length >= 3) tipo = columns[2] || 'General';
      if (columns.length >= 4) precioRaw = columns[3] || '0';
      if (columns.length >= 5) sku = columns[4] || '';
      if (columns.length >= 6) marca = columns[5] || '';
    }

    if (!nombre) {
      nombre = variante ? `${producto} - ${variante}` : producto;
    }
    if (!producto && nombre) {
      const parts = nombre.split(' - ');
      producto = parts[0];
      if (parts.length > 1 && !variante) {
        variante = parts.slice(1).join(' - ');
      }
    }

    const precio = parsePrice(precioRaw);
    const errors: string[] = [];

    if (!producto && !nombre) {
      errors.push('Falta el nombre o producto');
    }
    if (precio <= 0) {
      errors.push('El precio debe ser mayor a 0');
    }

    result.push({
      rowId: `bulk-row-${i}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      producto,
      variante,
      nombre,
      tipo: tipo || 'General',
      precio: precio || precioRaw,
      sku: sku || generateSKU(),
      marca,
      errors,
      isValid: errors.length === 0,
    });
  }

  return result;
}

function splitLine(line: string, delimiter: string): string[] {
  if (delimiter === '\t') {
    return line.split('\t');
  }
  // regex to handle quotes in CSV / semicolon
  const pattern = new RegExp(
    `(?:\\s*${delimiter}\\s*|\\s*^)(?:"([^"]*(?:""[^"]*)*)"|([^"${delimiter}]*))`,
    'g'
  );
  const entries: string[] = [];
  let match;
  while ((match = pattern.exec(line)) !== null) {
    if (match.index === pattern.lastIndex) {
      pattern.lastIndex++;
    }
    entries.push(match[1] !== undefined ? match[1].replace(/""/g, '"') : (match[2] || ''));
  }
  if (entries.length === 0) {
    return line.split(delimiter);
  }
  return entries;
}

export function downloadCSV(filename: string, csvContent: string) {
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportProductsToCSV(products: Product[]) {
  const headers = ['producto', 'variante', 'nombre', 'tipo', 'precio', 'sku', 'marca'];
  const rows = products.map(p => [
    `"${(p.producto || '').replace(/"/g, '""')}"`,
    `"${(p.variante || '').replace(/"/g, '""')}"`,
    `"${(p.nombre || '').replace(/"/g, '""')}"`,
    `"${(p.tipo || '').replace(/"/g, '""')}"`,
    p.precio,
    `"${(p.sku || '').replace(/"/g, '""')}"`,
    `"${(p.marca || '').replace(/"/g, '""')}"`,
  ]);
  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  downloadCSV(`catalogo_casa_matriz_${new Date().toISOString().slice(0, 10)}.csv`, csvContent);
}

export function downloadSampleTemplateCSV() {
  const headers = ['producto', 'variante', 'nombre', 'tipo', 'precio', 'sku', 'marca'];
  const sampleData = [
    ['Sabanilla FIT', '90*60cms', 'Sabanilla FIT - 90*60cms', 'Higiene', '16000', '7800006010125', 'FIT'],
    ['Fit Snack', 'Truto pollo', 'Fit Snack - Truto pollo', 'Snack', '9800', '7800006010309', 'Fit'],
    ['Collar gatos', 'Antiahorque', 'Collar gatos - Antiahorque', 'Accesorios', '2500', '729208205023', 'Kulcan'],
    ['Royal', 'Kitten 1,5 kgs', 'Royal - Kitten 1,5 kgs', 'Alimentos', '20000', '7896181213031', 'Royal Canin'],
    ['Bravecto', 'Perro 10 a 20 kgs', 'Bravecto - Perro 10 a 20 kgs', 'Salud', '32000', '8713184148964', 'MSD']
  ];
  const csvContent = [headers.join(','), ...sampleData.map(r => r.map(c => `"${c}"`).join(','))].join('\n');
  downloadCSV('plantilla_carga_masiva_casa_matriz.csv', csvContent);
}
