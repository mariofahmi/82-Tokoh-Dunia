import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-[#c4ecd3] bg-[#f2fbf5]/95 py-6 px-4 text-center text-xs text-emerald-800 space-y-2">
      <p className="font-semibold text-emerald-950 text-sm">
        &copy; {new Date().getFullYear()} 82 Tokoh Dunia &bull; Diadaptasi dari karya Michael H. Hart (Edisi Sains, Penemuan & Peradaban)
      </p>
      <div className="inline-flex items-center gap-2 bg-emerald-100/90 text-emerald-950 font-bold px-3.5 py-1 rounded-full border border-emerald-300 shadow-sm text-xs">
        <span>✨ Perancang & Pengembang:</span>
        <strong className="text-emerald-900 underline font-black">Mario Fahmi Syharial</strong>
      </div>
      <p className="text-emerald-700 text-[11px]">
        Arsip dokumentasi sejarah tervalidasi dari Wikimedia Commons & Wikipedia &bull; Bebas Sentimen Agama &bull; Edukasi Terbuka
      </p>
    </footer>
  );
};
