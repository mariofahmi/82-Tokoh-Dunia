import React, { useEffect } from 'react';
import { X, Globe, Clock, ExternalLink, Sparkles, Award } from 'lucide-react';
import { Tokoh } from '../types/tokoh';
import { getEraCategory } from '../data/tokohData';

interface TokohDetailModalProps {
  tokoh: Tokoh | null;
  onClose: () => void;
}

export const TokohDetailModal: React.FC<TokohDetailModalProps> = ({
  tokoh,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (tokoh) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [tokoh, onClose]);

  if (!tokoh) return null;

  const era = getEraCategory(tokoh.years);
  const wikiUrl = `https://en.wikipedia.org/wiki/${
    tokoh.wikiTitle || encodeURIComponent(tokoh.name.replace(/ /g, '_'))
  }`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white rounded-3xl border border-emerald-300 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-transform animate-in zoom-in-95 duration-200"
      >
        {/* Header Photo Section */}
        <div className="relative w-full h-64 sm:h-72 bg-emerald-950 shrink-0">
          <img
            src={tokoh.image}
            alt={tokoh.name}
            className="w-full h-full object-cover object-[center_20%]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Tutup Dialog"
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-emerald-950/70 hover:bg-emerald-900 text-white flex items-center justify-center border border-white/20 transition-all hover:scale-105"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Rank & Era Overlay */}
          <div className="absolute bottom-4 left-5 right-5 flex flex-wrap items-end justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-emerald-500/90 text-white font-serif font-extrabold text-sm px-3 py-1 rounded-lg border border-emerald-300/40 shadow mb-1.5">
                <Award className="w-4 h-4" />
                <span>Peringkat #{tokoh.rank} Michael H. Hart</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-white leading-tight drop-shadow">
                {tokoh.name}
              </h2>
            </div>

            <div className="bg-white/90 backdrop-blur-md text-emerald-950 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-200 shadow-sm">
              {era}
            </div>
          </div>
        </div>

        {/* Scrollable Content Details */}
        <div className="p-6 overflow-y-auto space-y-4">
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200/80">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
                  Asal / Kebangsaan
                </span>
                <span className="text-sm font-semibold text-emerald-950">
                  {tokoh.origin}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
                  Periode / Rentang Hidup
                </span>
                <span className="text-sm font-semibold text-emerald-950">
                  {tokoh.years}
                </span>
              </div>
            </div>
          </div>

          {tokoh.wikiDesc && (
            <div className="text-sm text-emerald-900/90 italic bg-white border-l-4 border-emerald-500 pl-4 py-2">
              "{tokoh.wikiDesc}"
            </div>
          )}

          {/* Influence Box */}
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/40 p-5 rounded-2xl border border-emerald-200">
            <h4 className="flex items-center gap-2 font-serif text-sm font-bold text-emerald-900 uppercase tracking-wide mb-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Sumbangan & Pengaruh Sejarah Dunia
            </h4>
            <p className="text-emerald-950 text-sm sm:text-base leading-relaxed">
              {tokoh.influence}
            </p>
          </div>

          {/* Wikipedia Link Action */}
          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-emerald-800">
              Arsip terverifikasi dari ensiklopedia terbuka
            </span>
            <a
              href={wikiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md transition-all hover:scale-[1.02]"
            >
              <span>Buka Artikel Wikipedia</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
