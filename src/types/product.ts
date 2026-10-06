export interface Product {
  id: string;
  nombre: string;
  producto: string;
  variante: string;
  tipo: string;
  precio: number;
  sku: string;
  marca: string;
  createdAt?: string;
  updatedAt?: string;
}

export type ProductInput = Omit<Product, 'id'> & { id?: string };

export interface BulkUploadRow {
  rowId: string;
  producto: string;
  variante: string;
  nombre: string;
  tipo: string;
  precio: string | number;
  sku: string;
  marca: string;
  errors: string[];
  isValid: boolean;
}

export interface BulkImportResult {
  added: number;
  updated: number;
  errors: number;
  skipped: number;
}
