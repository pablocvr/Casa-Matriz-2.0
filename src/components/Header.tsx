import { Plus, FileSpreadsheet, Download, RefreshCw, Barcode } from 'lucide-react';

interface HeaderProps {
  activeTab: 'search' | 'catalog' | 'add';
  onTabChange: (tab: 'search' | 'catalog' | 'add') => void;
  productCount: number;
  onOpenBulkUpload: () => void;
  onOpenMissingModal: () => void;
}

export function Header({
  activeTab,
  onTabChange,
  productCount,
  onOpenBulkUpload,
  onOpenMissingModal,
}: HeaderProps) {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
              <Barcode className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold tracking-tight text-white block leading-tight">
                Casa Matriz
              </span>
              <span className="text-[11px] text-emerald-400 block font-medium">
                Sistema de Verificación y Gestión
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation Links (Matching user tabs: Buscador, Catálogo, Agregar) */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => onTabChange('search')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'search'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Buscador Rápido
            </button>
            <button
              onClick={() => onTabChange('catalog')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'catalog'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Catálogo Completo
            </button>
            <button
              onClick={() => onTabChange('add')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'add'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              + Agregar Producto
            </button>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenMissingModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-semibold transition-colors"
              title="Ver alimentos y productos faltantes detectados"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Faltantes (52 alimentos)</span>
            </button>

            <button
              onClick={onOpenBulkUpload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Carga Masiva</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
