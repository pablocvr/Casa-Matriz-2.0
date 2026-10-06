import { Product } from '../types/product';
import { CATALOG_PART_1 } from './catalogPart1';
import { CATALOG_PART_2 } from './catalogPart2';

export const RAW_INITIAL_PRODUCTS: Omit<Product, 'id'>[] = [
  ...CATALOG_PART_1,
  ...CATALOG_PART_2,
];

export const INITIAL_PRODUCTS: Product[] = RAW_INITIAL_PRODUCTS.map((p, index) => ({
  ...p,
  id: `prod-${index + 1}-${p.sku || Math.random().toString(36).substr(2, 6)}`,
  createdAt: '2026-09-28T10:00:00Z',
  updatedAt: '2026-09-28T10:00:00Z',
}));

export const DEFAULT_CATEGORIES = [
  'Alimentos',
  'Snack',
  'Salud',
  'Higiene',
  'Accesorios',
  'Juguetes',
  'Pellets',
  'Heno',
  'Ropa',
  'Extra',
];
