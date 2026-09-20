import React, { useState } from 'react';
import { Globe, Clock, Sparkles, ExternalLink } from 'lucide-react';
import { Tokoh } from '../types/tokoh';
import { getEraCategory } from '../data/tokohData';

interface TokohCardProps {
  tokoh: Tokoh;
  onSelect: (tokoh: Tokoh) => void;
}

export const TokohCard: React.FC<TokohCardProps> = ({ tokoh, onSelect }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const era = getEraCategory(tokoh.years);
  const isCollaboration = tokoh.name.includes('&');

  // Fallback initial avatar generator
  const initials = tokoh.name
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('');

  const getEraBadgeClasses = (eraName: string) => {
    switch (eraName) {
      case 'Sebelum Masehi':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      case 'Abad 1-1500':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'Abad 1501-1900':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Abad 1900+':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      default:
        return 'bg-slate-50 text-slate-800 border-slate-200';
    }
  };

  return (
    <div
      onClick={() => onSelect(tokoh)}
      className={`group relative flex flex-col justify-between rounded-2xl border transition-all duration-250 cursor-pointer overflow-hidden bg-white shadow-sm hover:shadow-xl hover:-translate-y-1.5 ${
        isCollaboration
          ? 'border-2 border-emerald-400 bg-gradient-to-b from-white to-emerald-50/40 shadow-emerald-500/10'
          : 'border-[#c4ecd3] hover:border-emerald-400 shadow-emerald-950/5'
      }`}
    >
      {/* Photo Wrap */}
      <div className="relative w-full h-52 bg-emerald-100/60 overflow-hidden border-b border-[#c4ecd3]/80">
        {!imageError ? (
          <img
            src={tokoh.image}
            alt={tokoh.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover object-[center_20%] transition-transform duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-900 p-4 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-300/80 flex items-center justify-center font-serif text-2xl font-bold mb-2 shadow-inner">
              {initials}
            </div>
            <span className="text-xs font-bold text-emerald-800">
              Arsip #{tokoh.rank} &bull; {tokoh.name}
            </span>
          </div>
        )}

        {/* Ambient Dark Gradient at Bottom of Image for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-emerald-950/15 to-transparent pointer-events-none" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5 bg-emerald-950/90 backdrop-blur-md text-white font-serif font-extrabold text-xs px-2.5 py-1 rounded-lg border border-white/25 shadow">
            <span className="opacity-75 uppercase text-[10px]">Rank</span>
            <span>#{tokoh.rank}</span>
          </div>

          <div
            className={`text-xs font-bold px-2.5 py-1 rounded-full border shadow-sm backdrop-blur-md ${getEraBadgeClasses(
              era
            )}`}
          >
            {era}
          </div>
        </div>

        {/* Archive label */}
        <div className="absolute bottom-2.5 left-3 z-10 inline-flex items-center gap-1.5 bg-emerald-950/80 backdrop-blur-sm text-emerald-200 text-[11px] font-semibold px-2 py-0.5 rounded-md border border-emerald-400/30">
          <span>🏛️</span>
          <span>Arsip Sejarah</span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between gap-3">
        <div>
          {isCollaboration && (
            <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold tracking-wide uppercase mb-2">
              <span>🤝</span> Kemitraan Penemu
            </div>
          )}

          <h3 className="font-serif text-lg font-bold text-emerald-950 leading-snug group-hover:text-emerald-700 transition-colors">
            {tokoh.name}
          </h3>

          <div className="flex flex-col gap-1 mt-2 text-xs text-emerald-850 font-medium">
            <div className="flex items-center gap-2 text-emerald-800">
              <Globe className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>
                <strong>Asal:</strong> {tokoh.origin}
              </span>
            </div>
            <div className="flex items-center gap-2 text-emerald-800">
              <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>
                <strong>Tahun:</strong> {tokoh.years}
              </span>
            </div>
          </div>

          {tokoh.wikiDesc && (
            <p className="text-[11.5px] italic text-emerald-750 bg-emerald-50/70 border-l-2 border-emerald-400 rounded-r px-2 py-1 mt-2.5 leading-relaxed">
              {tokoh.wikiDesc}
            </p>
          )}
        </div>

        {/* Influence Box */}
        <div className="bg-emerald-50/80 border border-emerald-200/80 border-l-4 border-l-emerald-600 rounded-xl p-3 text-xs text-emerald-950 leading-relaxed relative flex flex-col justify-between">
          <div>
            <span className="flex items-center gap-1 text-[10px] font-extrabold tracking-wider uppercase text-emerald-700 mb-1">
              <Sparkles className="w-3 h-3" />
              Pengaruh Sejarah
            </span>
            <p className="font-medium text-emerald-900">{tokoh.influence}</p>
          </div>

          <div className="mt-2.5 pt-2 border-t border-emerald-200/50 flex items-center justify-between text-[11px] font-bold text-emerald-700 group-hover:text-emerald-900">
            <span>Buka Detail</span>
            <ExternalLink className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
};
