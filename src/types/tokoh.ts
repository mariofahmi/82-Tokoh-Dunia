export interface Tokoh {
  rank: number;
  name: string;
  origin: string;
  years: string;
  influence: string;
  image: string;
  wikiTitle: string;
  wikiDesc: string;
}

export type EraCategory = 'ALL' | 'Sebelum Masehi' | 'Abad 1-1500' | 'Abad 1501-1900' | 'Abad 1900+';

export type TabType = 'galeri' | 'kuis' | 'metodologi';

export type QuizMode = 'wajah' | 'pengaruh' | 'campuran';

export interface QuizScore {
  correct: number;
  wrong: number;
  streak: number;
}
