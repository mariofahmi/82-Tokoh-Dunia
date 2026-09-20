import React, { useState, useMemo } from 'react';
import { Search, Globe, Hourglass, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { Tokoh, EraCategory } from '../types/tokoh';
import { TOKOH_DATA, getEraCategory, extractCleanOrigin, getAllOrigins } from '../data/tokohData';
import { TokohCard } from './TokohCard';

interface GalleryViewProps {
  onSelectTokoh: (tokoh: Tokoh) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ onSelectTokoh }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWilayah, setSelectedWilayah] = useState('ALL');
  const [selectedEra, setSelectedEra] = useState<EraCategory>('ALL');
  const [pageSize, setPageSize] = useState<number>(12);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const origins = useMemo(() => getAllOrigins(), []);

  // Filtered dataset
  const filteredTokoh = useMemo(() => {
    return TOKOH_DATA.filter((tokoh) => {
      // Wilayah check
      if (selectedWilayah !== 'ALL') {
        const cleanOrigin = extractCleanOrigin(tokoh.origin);
        if (cleanOrigin !== selectedWilayah && !tokoh.origin.includes(selectedWilayah)) {
          return false;
        }
      }

      // Era check
      if (selectedEra !== 'ALL') {
        const era = getEraCategory(tokoh.years);
        if (era !== selectedEra) {
          return false;
        }
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = tokoh.name.toLowerCase().includes(q);
        const matchInfluence = tokoh.influence.toLowerCase().includes(q);
        const matchOrigin = tokoh.origin.toLowerCase().includes(q);
        if (!matchName && !matchInfluence && !matchOrigin) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedWilayah, selectedEra]);

  // Reset pagination when filters change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleWilayahChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWilayah(e.target.value);
    setCurrentPage(1);
  };

  const handleEraChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEra(e.target.value as EraCategory);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedWilayah('ALL');
    setSelectedEra('ALL');
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredTokoh.length / pageSize) || 1;
  const validPage = Math.min(Math.max(currentPage, 1), totalPages);

  const paginatedTokoh = useMemo(() => {
    const start = (validPage - 1) * pageSize;
    return filteredTokoh.slice(start, start + pageSize);
  }, [filteredTokoh, validPage, pageSize]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const filterPanel = document.getElementById('filter-control-panel');
    if (filterPanel) {
      filterPanel.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter Control Panel */}
      <div
        id="filter-control-panel"
        className="bg-white rounded-2xl border border-[#c4ecd3] p-5 sm:p-6 shadow-sm shadow-emerald-950/5 transition-all"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          {/* Filter Wilayah */}
          <div className="space-y-1.5">
            <label
              htmlFor="filter-wilayah-select"
              className="text-xs font-extrabold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span>Wilayah / Asal</span>
            </label>
            <select
              id="filter-wilayah-select"
              value={selectedWilayah}
              onChange={handleWilayahChange}
              className="w-full bg-white border border-[#c4ecd3] text-emerald-950 text-sm font-semibold rounded-xl px-3.5 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer"
            >
              <option value="ALL">Semua Wilayah ({origins.length} Asal)</option>
              {origins.map((origin) => (
                <option key={origin} value={origin}>
                  {origin}
                </option>
              ))}
            </select>
          </div>

          {/* Filter Era */}
          <div className="space-y-1.5">
            <label
              htmlFor="filter-era-select"
              className="text-xs font-extrabold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5"
            >
              <Hourglass className="w-3.5 h-3.5 text-emerald-600" />
              <span>Era / Periode Waktu</span>
            </label>
            <select
              id="filter-era-select"
              value={selectedEra}
              onChange={handleEraChange}
              className="w-full bg-white border border-[#c4ecd3] text-emerald-950 text-sm font-semibold rounded-xl px-3.5 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer"
            >
              <option value="ALL">Semua Era Sejarah</option>
              <option value="Sebelum Masehi">Sebelum Masehi (SM)</option>
              <option value="Abad 1-1500">Abad 1 – 1500 M</option>
              <option value="Abad 1501-1900">Abad 1501 – 1900 M</option>
              <option value="Abad 1900+">Abad 1900 ke atas (Modern)</option>
            </select>
          </div>

          {/* Search Box */}
          <div className="space-y-1.5">
            <label
              htmlFor="filter-search-input"
              className="text-xs font-extrabold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5 text-emerald-600" />
              <span>Pencarian Cepat</span>
            </label>
            <div className="relative">
              <input
                id="filter-search-input"
                type="text"
                placeholder="Cari nama, penemuan, asal..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full bg-white border border-[#c4ecd3] text-emerald-950 text-sm font-medium rounded-xl pl-3.5 pr-8 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-emerald-950/40"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setCurrentPage(1);
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-emerald-600 hover:text-emerald-900 font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Reset Filters */}
          <div>
            <button
              onClick={handleResetFilters}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#e8f8ee] hover:bg-[#d5f4e1] text-emerald-950 border border-[#c4ecd3] px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all"
            >
              <RotateCcw className="w-4 h-4 text-emerald-700" />
              <span>Reset Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Gallery Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-1">
        <div className="text-sm font-semibold text-emerald-900 flex items-center flex-wrap gap-2">
          <span>
            Menampilkan <strong className="text-emerald-600 font-extrabold">{filteredTokoh.length}</strong> dari{' '}
            <strong className="text-emerald-600 font-extrabold">{TOKOH_DATA.length}</strong> tokoh
          </span>
          <span className="hidden sm:inline text-emerald-400">&bull;</span>
          <span className="text-xs text-emerald-700">
            Sains, Penemuan & Peradaban Dunia &bull; Bebas Sentimen Agama
          </span>
        </div>

        {/* Page Size Selector */}
        <div className="flex items-center gap-2 text-xs text-emerald-800 font-bold">
          <label htmlFor="select-page-size">Per Halaman:</label>
          <select
            id="select-page-size"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="bg-white border border-[#c4ecd3] text-emerald-950 font-bold px-2.5 py-1.5 rounded-lg outline-none cursor-pointer"
          >
            <option value={12}>12 Tokoh</option>
            <option value={24}>24 Tokoh</option>
            <option value={48}>48 Tokoh</option>
            <option value={999}>Tampilkan Semua</option>
          </select>
        </div>
      </div>

      {/* Cards Grid */}
      {paginatedTokoh.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedTokoh.map((tokoh) => (
            <TokohCard
              key={tokoh.rank}
              tokoh={tokoh}
              onSelect={onSelectTokoh}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-dashed border-[#c4ecd3] p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-2xl mb-4">
            🔍
          </div>
          <h3 className="font-serif text-lg font-bold text-emerald-950 mb-1">
            Tidak Ada Tokoh yang Sesuai
          </h3>
          <p className="text-sm text-emerald-800 max-w-md mx-auto mb-5">
            Coba sesuaikan kata kunci pencarian, pilihan wilayah asal, atau pilihan era waktu Anda.
          </p>
          <button
            onClick={handleResetFilters}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all"
          >
            Kembalikan Semua Tokoh
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-6 pb-2">
          <button
            disabled={validPage <= 1}
            onClick={() => handlePageChange(validPage - 1)}
            className="inline-flex items-center gap-1.5 bg-white hover:bg-emerald-100/70 disabled:opacity-40 disabled:hover:bg-white text-emerald-950 border border-[#c4ecd3] px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-all cursor-pointer disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          <span className="bg-white border border-[#c4ecd3] text-emerald-900 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-sm">
            Halaman {validPage} dari {totalPages}
          </span>

          <button
            disabled={validPage >= totalPages}
            onClick={() => handlePageChange(validPage + 1)}
            className="inline-flex items-center gap-1.5 bg-white hover:bg-emerald-100/70 disabled:opacity-40 disabled:hover:bg-white text-emerald-950 border border-[#c4ecd3] px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-all cursor-pointer disabled:cursor-not-allowed"
          >
            <span>Selanjutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
