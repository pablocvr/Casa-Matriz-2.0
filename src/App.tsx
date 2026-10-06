import { useState, useEffect, useMemo } from 'react';
import { Product, ProductInput } from './types/product';
import { INITIAL_PRODUCTS, DEFAULT_CATEGORIES } from './data/initialProducts';
import { Header } from './components/Header';
import { PriceCheckerTab } from './components/PriceCheckerTab';
import { CatalogTableTab } from './components/CatalogTableTab';
import { AddProductTab } from './components/AddProductTab';
import { ProductFormModal } from './components/ProductFormModal';
import { BulkUploadModal } from './components/BulkUploadModal';
import { ShelfLabelModal } from './components/ShelfLabelModal';
import { MissingProductsModal } from './components/MissingProductsModal';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const STORAGE_KEY = 'casaMatrizDb';
const LEGACY_STORAGE_KEY = 'casa_matriz_products_db_v1';

export default function App() {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= INITIAL_PRODUCTS.length) {
          return parsed.map((p, i) => ({
            ...p,
            id: p.id || `prod-${i}-${p.sku || Math.random().toString(36).substr(2, 6)}`,
          }));
        } else if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge user-added items with the full initial catalog
          const existingSkus = new Set(INITIAL_PRODUCTS.map((p) => p.sku));
          const customUserItems = parsed.filter((p) => p.sku && !existingSkus.has(p.sku));
          return [...customUserItems, ...INITIAL_PRODUCTS];
        }
      }
    } catch {
      // ignore
    }
    return INITIAL_PRODUCTS;
  });

  const [activeTab, setActiveTab] = useState<'search' | 'catalog' | 'add'>('search');
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [isMissingModalOpen, setIsMissingModalOpen] = useState(false);
  const [labelProduct, setLabelProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync products with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
      localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(products));
    } catch (err) {
      console.error('Error saving products to localStorage:', err);
    }
  }, [products]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Derive unique categories
  const categories = useMemo(() => {
    const set = new Set<string>(DEFAULT_CATEGORIES);
    products.forEach((p) => {
      if (p.tipo && p.tipo.trim()) set.add(p.tipo.trim());
    });
    return Array.from(set).sort();
  }, [products]);

  // Derive unique brands
  const brands = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.marca && p.marca.trim()) set.add(p.marca.trim());
    });
    return Array.from(set).sort();
  }, [products]);

  // Add or Update Single Product
  const handleSaveProduct = (input: ProductInput) => {
    if (input.id) {
      // Update existing
      setProducts((prev) =>
        prev.map((p) =>
          p.id === input.id
            ? {
                ...p,
                ...input,
                id: p.id,
                updatedAt: new Date().toISOString(),
              }
            : p
        )
      );
      showToast(`Producto "${input.nombre}" actualizado.`);
    } else {
      // Create new
      const newProd: Product = {
        id: `prod-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        producto: input.producto,
        variante: input.variante || '',
        nombre: input.nombre || `${input.producto} - ${input.variante}`,
        tipo: input.tipo || 'General',
        precio: input.precio,
        sku: input.sku,
        marca: input.marca || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setProducts((prev) => [newProd, ...prev]);
      showToast(`Nuevo producto "${newProd.nombre}" incorporado a la base de datos.`);
    }
  };

  // Delete product
  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Producto eliminado.');
  };

  // Delete multiple
  const handleDeleteMultiple = (ids: string[]) => {
    const idSet = new Set(ids);
    setProducts((prev) => prev.filter((p) => !idSet.has(p.id)));
    showToast(`${ids.length} productos eliminados.`);
  };

  // Bulk Import
  const handleBulkImport = (
    newItems: Omit<Product, 'id'>[],
    updateExisting: boolean
  ): { added: number; updated: number } => {
    let addedCount = 0;
    let updatedCount = 0;

    setProducts((prev) => {
      const existingSkuMap = new Map<string, number>();
      prev.forEach((p, idx) => {
        if (p.sku && p.sku.trim()) {
          existingSkuMap.set(p.sku.trim().toLowerCase(), idx);
        }
      });

      const updatedList = [...prev];

      newItems.forEach((item) => {
        const itemSku = (item.sku || '').trim().toLowerCase();
        const existingIdx = itemSku ? existingSkuMap.get(itemSku) : undefined;

        if (existingIdx !== undefined && updateExisting) {
          // Update existing
          updatedList[existingIdx] = {
            ...updatedList[existingIdx],
            ...item,
            updatedAt: new Date().toISOString(),
          };
          updatedCount++;
        } else {
          // Add new
          const newProd: Product = {
            ...item,
            id: `prod-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          updatedList.unshift(newProd);
          if (itemSku) {
            existingSkuMap.set(itemSku, 0);
          }
          addedCount++;
        }
      });

      return updatedList;
    });

    showToast(`Carga masiva completada: ${addedCount} agregados, ${updatedCount} actualizados.`);
    return { added: addedCount, updated: updatedCount };
  };

  // Reset to initial stock
  const handleResetDefaults = () => {
    if (
      window.confirm(
        '¿Deseas restablecer la base de datos a los 494 productos originales de Casa Matriz? Los cambios no guardados se perderán.'
      )
    ) {
      setProducts(INITIAL_PRODUCTS);
      showToast('Base de datos restablecida a los productos iniciales.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-2.5 text-xs font-semibold animate-fade-in no-print">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Header */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        productCount={products.length}
        onOpenBulkUpload={() => setIsBulkModalOpen(true)}
        onOpenMissingModal={() => setIsMissingModalOpen(true)}
      />

      {/* Main Body Viewport */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1">
        {activeTab === 'search' && (
          <PriceCheckerTab
            products={products}
            onEditProduct={(p) => {
              setEditingProduct(p);
              setIsFormModalOpen(true);
            }}
            onPrintLabel={(p) => setLabelProduct(p)}
            onOpenBulkUpload={() => setIsBulkModalOpen(true)}
            onOpenAddSingle={() => setActiveTab('add')}
          />
        )}

        {activeTab === 'catalog' && (
          <CatalogTableTab
            products={products}
            onEditProduct={(p) => {
              setEditingProduct(p);
              setIsFormModalOpen(true);
            }}
            onDeleteProduct={handleDeleteProduct}
            onDeleteMultiple={handleDeleteMultiple}
            onPrintLabel={(p) => setLabelProduct(p)}
            onOpenAddSingle={() => setActiveTab('add')}
            onOpenBulkUpload={() => setIsBulkModalOpen(true)}
            onResetDefaults={handleResetDefaults}
          />
        )}

        {activeTab === 'add' && (
          <AddProductTab
            onSaveProduct={(p) => {
              handleSaveProduct(p);
              return { success: true };
            }}
            categories={categories}
            existingSkus={new Set(products.map((p) => p.sku))}
            onNavigateToCatalog={() => setActiveTab('catalog')}
          />
        )}
      </main>

      {/* Modals */}
      <ProductFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSaveProduct}
        initialProduct={editingProduct}
        categories={categories}
        brands={brands}
      />

      <BulkUploadModal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        onImport={handleBulkImport}
        categories={categories}
      />

      <ShelfLabelModal
        product={labelProduct}
        onClose={() => setLabelProduct(null)}
      />

      <MissingProductsModal
        isOpen={isMissingModalOpen}
        onClose={() => setIsMissingModalOpen(false)}
        onImportItems={(newItems) => handleBulkImport(newItems, true)}
      />
    </div>
  );
}
