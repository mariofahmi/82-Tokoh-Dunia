import React from 'react';
import { Landmark, Target, BookOpen } from 'lucide-react';
import { TabType } from '../types/tokoh';

interface NavbarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onOpenOnboarding: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  onOpenOnboarding,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#f2fbf5]/95 backdrop-blur-md border-b border-[#c4ecd3] shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* ================= BARIS 1: JUDUL APLIKASI, LOGO & PERANCANG ================= */}
        <div className="py-3 sm:py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-[#c4ecd3]/60">
          <div 
            onClick={() => onTabChange('galeri')}
            className="flex items-center gap-3.5 cursor-pointer group select-none"
          >
            {/* Dual Logos Side-by-Side */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white font-serif font-extrabold text-xl flex items-center justify-center shadow-md shadow-emerald-500/25 border border-emerald-300/40 group-hover:scale-105 transition-transform">
                82
              </div>
              <div className="w-11 h-11 rounded-xl bg-white p-1 flex items-center justify-center shadow-md shadow-emerald-950/10 border border-[#c4ecd3] group-hover:scale-105 transition-transform overflow-hidden">
                <img
                  src={`${import.meta.env.BASE_URL}logo-mf.png`}
                  alt="Logo Mario Fahmi"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div>
              <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-emerald-950 flex items-center gap-2">
                82 Tokoh Dunia
              </h1>
              <div className="flex items-center gap-2 flex-wrap text-xs text-emerald-850 mt-0.5">
                <span className="font-semibold text-emerald-800">
                  Edisi Sains & Peradaban &bull; Michael H. Hart
                </span>
                <span className="text-emerald-400">&bull;</span>
                <span className="bg-emerald-200/90 text-emerald-950 px-2.5 py-0.5 rounded-full font-black text-[11px] border border-emerald-300 shadow-xs">
                  Perancang: Mario Fahmi Syharial
                </span>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-100/50 px-3 py-1.5 rounded-xl border border-emerald-200">
            <span>🏛️ Eksplorasi Interaktif & Kuis Sejarah Dunia</span>
          </div>
        </div>

        {/* ================= BARIS 2: TAB NAVIGASI MULTI-WARNA & DISCLAIMER ================= */}
        <div className="py-2.5 flex flex-wrap items-center justify-between gap-3">
          {/* Multi-Color Distinct Navigation Tabs */}
          <nav 
            className="flex items-center bg-white/90 p-1.5 rounded-2xl border border-[#c4ecd3] shadow-xs gap-2 overflow-x-auto" 
            role="tablist"
          >
            {/* TAB 1: GALERI TOKOH (HIJAU EMERALD SEGAR) */}
            <button
              id="nav-tab-galeri"
              role="tab"
              aria-selected={activeTab === 'galeri'}
              onClick={() => onTabChange('galeri')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'galeri'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/35 ring-2 ring-emerald-400/40'
                  : 'bg-emerald-50 text-emerald-850 hover:bg-emerald-100/80 border border-emerald-200/80'
              }`}
            >
              <div className={`p-1 rounded-md ${activeTab === 'galeri' ? 'bg-emerald-700 text-white' : 'bg-emerald-200/80 text-emerald-800'}`}>
                <Landmark className="w-3.5 h-3.5" />
              </div>
              <span>Galeri Tokoh</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${activeTab === 'galeri' ? 'bg-emerald-800 text-emerald-100' : 'bg-emerald-200 text-emerald-900'}`}>
                82
              </span>
            </button>

            {/* TAB 2: KUIS INTERAKTIF (UNGU / VIOLET GAMIFIKASI) */}
            <button
              id="nav-tab-kuis"
              role="tab"
              aria-selected={activeTab === 'kuis'}
              onClick={() => onTabChange('kuis')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'kuis'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/35 ring-2 ring-purple-400/40'
                  : 'bg-purple-50 text-purple-900 hover:bg-purple-100/80 border border-purple-200/80'
              }`}
            >
              <div className={`p-1 rounded-md ${activeTab === 'kuis' ? 'bg-purple-700 text-white' : 'bg-purple-200/80 text-purple-800'}`}>
                <Target className="w-3.5 h-3.5" />
              </div>
              <span>Main Game (Kuis)</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${activeTab === 'kuis' ? 'bg-purple-800 text-purple-100' : 'bg-purple-200 text-purple-900'}`}>
                20 Soal 🔥
              </span>
            </button>

            {/* TAB 3: PRINSIP & METODOLOGI (BIRU SAMUDERA / OCEAN BLUE) */}
            <button
              id="nav-tab-metodologi"
              role="tab"
              aria-selected={activeTab === 'metodologi'}
              onClick={() => onTabChange('metodologi')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'metodologi'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/35 ring-2 ring-blue-400/40'
                  : 'bg-blue-50 text-blue-900 hover:bg-blue-100/80 border border-blue-200/80'
              }`}
            >
              <div className={`p-1 rounded-md ${activeTab === 'metodologi' ? 'bg-blue-700 text-white' : 'bg-blue-200/80 text-blue-800'}`}>
                <BookOpen className="w-3.5 h-3.5" />
              </div>
              <span>Prinsip & Metodologi</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${activeTab === 'metodologi' ? 'bg-blue-800 text-blue-100' : 'bg-blue-200 text-blue-900'}`}>
                Pedoman
              </span>
            </button>
          </nav>

          {/* TAB 4: DISCLAIMER RESMI (MERAH / ROSE PERINGATAN) */}
          <button
            id="btn-curation-notes"
            onClick={onOpenOnboarding}
            className="inline-flex items-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-300 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold shadow-xs transition-all hover:scale-[1.02] cursor-pointer whitespace-nowrap"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            <span>Disclaimer Resmi</span>
          </button>
        </div>
      </div>
    </header>
  );
};
