import React, { useState, useEffect } from 'react';
import { AlertTriangle, ShieldAlert, CheckCircle2, X } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  canDismissWithoutAgree?: boolean;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  canDismissWithoutAgree = false,
}) => {
  const [hasAgreed, setHasAgreed] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && canDismissWithoutAgree) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);

      // Reset agreement state if modal is opened fresh (not manual re-read)
      if (!canDismissWithoutAgree) {
        setHasAgreed(false);
      } else {
        setHasAgreed(true);
      }
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, canDismissWithoutAgree, onClose]);

  if (!isOpen) return null;

  const handleAgreeAndProceed = () => {
    if (!hasAgreed && !canDismissWithoutAgree) return;
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={canDismissWithoutAgree ? onClose : undefined}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-red-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-white rounded-3xl border-2 border-red-500 shadow-2xl shadow-red-600/40 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
      >
        {/* Red Warning Banner Top Stripe */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 px-6 py-4 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-red-100 block opacity-90">
                Pemberitahuan Wajib & Regulasi Konten
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-black text-white leading-tight">
                DISCLAIMER & CATATAN KURASI RESMI
              </h3>
            </div>
          </div>

          {canDismissWithoutAgree && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
              title="Tutup Catatan"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-slate-850">
          {/* Main Notice Box */}
          <div className="bg-red-50/95 border border-red-200 border-l-4 border-l-red-600 rounded-2xl p-4 sm:p-4.5 space-y-3 shadow-inner">
            <div className="flex items-center gap-2 text-red-800 font-extrabold text-sm">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
              <span>Harap Dibaca & Disetujui Sebelum Melanjutkan:</span>
            </div>

            <p className="text-xs sm:text-sm text-red-950 leading-relaxed font-medium">
              Aplikasi edukasi interaktif ini diadaptasi dari karya literatur <em>"100 Tokoh Paling Berpengaruh dalam Sejarah"</em> versi <strong>Michael H. Hart (1978)</strong> dengan ketentuan kurasi khusus:
            </p>

            <ul className="text-xs sm:text-sm text-red-950 space-y-2 list-disc list-inside font-semibold bg-white/90 p-3.5 rounded-xl border border-red-200/90 shadow-sm">
              <li className="leading-snug">
                <span className="text-red-700 font-black">Peniadaan Figur Agama:</span> Seluruh tokoh yang memiliki keterkaitan langsung dengan figur pendiri agama, nabi, rasul, paus, dan teolog <strong>telah dieliminasi 100%</strong> dari aplikasi ini.
              </li>
              <li className="leading-snug">
                <span className="text-red-700 font-black">Netralitas Edukatif Total:</span> Koleksi 82 tokoh ini murni berfokus pada <strong>penemu sains, teknologi, matematika, biologi, kedokteran, filsafat rasional, eksplorasi geografis, dan peradaban dunia</strong> demi menjaga objektivitas belajar dan menghindari sentimen SARA.
              </li>
            </ul>
          </div>

          {/* Agreement Checkbox Gate */}
          <div
            onClick={() => setHasAgreed(!hasAgreed)}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer select-none ${
              hasAgreed
                ? 'bg-red-50 border-red-500 shadow-sm shadow-red-500/15'
                : 'bg-red-50/40 border-dashed border-red-300 hover:bg-red-50/70'
            }`}
          >
            <label className="flex items-start gap-3 cursor-pointer" onClick={(e) => e.stopPropagation()}>
              <input
                type="checkbox"
                id="checkbox-disclaimer-agree"
                checked={hasAgreed}
                onChange={(e) => setHasAgreed(e.target.checked)}
                className="mt-0.5 w-5 h-5 accent-red-600 rounded cursor-pointer shrink-0"
              />
              <span className="text-xs sm:text-sm font-bold text-red-950 leading-snug">
                Saya telah membaca, memahami, dan <strong className="text-red-700 underline">menyetujui seluruh ketentuan kurasi & disclaimer</strong> di atas untuk melanjutkan ke aplikasi.
              </span>
            </label>
          </div>
        </div>

        {/* Action Button Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-red-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] font-semibold text-slate-700 text-center sm:text-left">
            {!hasAgreed
              ? '⚠️ Beri centang pada kotak persetujuan untuk mengaktifkan tombol.'
              : '✅ Persetujuan terkonfirmasi. Silakan klik tombol untuk masuk.'}
          </span>

          <button
            id="btn-agree-disclaimer"
            disabled={!hasAgreed && !canDismissWithoutAgree}
            onClick={handleAgreeAndProceed}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 font-black text-xs sm:text-sm py-3 px-6 rounded-xl shadow-md transition-all ${
              hasAgreed || canDismissWithoutAgree
                ? 'bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white shadow-red-600/30 hover:scale-105 cursor-pointer'
                : 'bg-slate-300 text-slate-500 cursor-not-allowed opacity-70'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Setuju & Masuk ke Aplikasi</span>
          </button>
        </div>
      </div>
    </div>
  );
};
