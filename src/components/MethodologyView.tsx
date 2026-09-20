import React from 'react';
import { Microscope, ShieldCheck, Image, Globe, Award, Users, BookOpen } from 'lucide-react';

export const MethodologyView: React.FC = () => {
  const principles = [
    {
      num: 1,
      icon: <Microscope className="w-5 h-5 text-emerald-700" />,
      title: 'Fokus Sains, Inovasi & Peradaban',
      desc: 'Mengutamakan para perintis matematika, fisika, biologi, kedokteran, teknologi cetak, revolusi industri, serta filsafat rasional yang meletakkan fondasi kehidupan modern.',
    },
    {
      num: 2,
      icon: <ShieldCheck className="w-5 h-5 text-emerald-700" />,
      title: 'Bebas Sentimen Keagamaan',
      desc: 'Tokoh-tokoh yang memiliki keterkaitan dengan agama (seperti pendiri agama, nabi, rasul, paus, dan teolog) sengaja ditiadakan demi menjaga netralitas edukatif, objektif, dan inklusif bagi seluruh kalangan.',
    },
    {
      num: 3,
      icon: <Image className="w-5 h-5 text-emerald-700" />,
      title: 'Foto Potret Arsip Historis Terverifikasi',
      desc: 'Setiap foto bersumber dari dokumentasi sejarah otentik di Wikimedia Commons dan Wikipedia (patung klasik, lukisan sezaman, atau foto arsip), tanpa fabrikasi gambar AI.',
    },
    {
      num: 4,
      icon: <Globe className="w-5 h-5 text-emerald-700" />,
      title: 'Jangkauan Pengaruh Skala Global',
      desc: 'Tokoh yang dimasukkan membawa lompatan pemikiran atau penemuan yang berdampak melintasi batas benua dan bertahan lintas generasi.',
    },
    {
      num: 5,
      icon: <Award className="w-5 h-5 text-emerald-700" />,
      title: 'Peringkat Asli Hart Dipertahankan',
      desc: 'Nomor peringkat asli dari buku Michael H. Hart (misalnya Isaac Newton #2, Ts’ai Lun #7, Albert Einstein #10, dll.) tetap dipertahankan sebagai referensi historis aslinya.',
    },
    {
      num: 6,
      icon: <Users className="w-5 h-5 text-emerald-700" />,
      title: 'Kerja Bersama Dirangkum (Joint Cards)',
      desc: 'Tokoh penemu yang karyanya tak terpisahkan (seperti Wright Bersaudara) dirangkum dalam satu nomor peringkat kemitraan resmi.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-[#c4ecd3] p-6 sm:p-10 shadow-xl shadow-emerald-950/5 space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 border border-emerald-300 font-extrabold text-xs px-3.5 py-1 rounded-full mb-3">
          <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
          <span>Prinsip Kurasi & Metodologi</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-emerald-950 leading-tight mb-2">
          Dasar Kurasi & Metodologi Michael H. Hart
        </h2>
        <p className="text-sm sm:text-base text-emerald-850">
          Pemeringkatan tokoh paling berpengaruh dalam sejarah dunia dengan fokus edukasi sains, inovasi & peradaban global.
        </p>
      </div>

      {/* Quote Banner */}
      <div className="bg-emerald-50/90 border border-emerald-200 border-l-4 border-l-emerald-600 rounded-2xl p-5 sm:p-6 text-emerald-950 font-medium text-sm sm:text-base leading-relaxed shadow-sm">
        "Koleksi ini berfokus murni pada tokoh-tokoh sains, penemuan teknologi, filsafat rasional, eksplorasi geografis, dan kepemimpinan peradaban dunia. Seluruh tokoh yang berkaitan dengan figur/pendiri agama telah dieliminasi demi netralitas edukatif dan menghindari sentimen keagamaan."
      </div>

      {/* 6 Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {principles.map((item) => (
          <div
            key={item.num}
            className="bg-[#f8fcf9] border border-[#c4ecd3] rounded-2xl p-5 flex items-start gap-4 transition-all hover:bg-emerald-50/70 hover:border-emerald-300"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center font-serif font-black text-emerald-900 shrink-0 shadow-sm">
              {item.num}
            </div>

            <div className="space-y-1">
              <h4 className="font-serif text-base font-bold text-emerald-950 flex items-center gap-2">
                <span>{item.title}</span>
              </h4>
              <p className="text-xs sm:text-sm text-emerald-850 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Designer Credit Banner */}
      <div className="bg-gradient-to-r from-emerald-100/90 via-[#e4f7eb] to-emerald-100/90 border border-emerald-300 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white p-1 flex items-center justify-center shadow-md border border-emerald-300 shrink-0 overflow-hidden">
            <img
              src="/logo-mf.png"
              alt="Logo Mario Fahmi"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 block">
              Inisiator & Perancang Aplikasi
            </span>
            <h3 className="font-serif text-lg font-bold text-emerald-950">
              Mario Fahmi Syharial
            </h3>
            <p className="text-xs text-emerald-800">
              Penggagas kurasi digital 82 tokoh Michael H. Hart untuk edukasi sains & peradaban dunia.
            </p>
          </div>
        </div>

        <div className="bg-white/80 border border-emerald-300 text-emerald-950 text-xs font-bold px-3 py-1.5 rounded-xl shrink-0 shadow-xs">
          Edisi Sains &bull; 2026
        </div>
      </div>
    </div>
  );
};
