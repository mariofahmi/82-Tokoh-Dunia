import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  User, Lightbulb, Flame, CheckCircle2, XCircle, ArrowRight, RotateCcw, 
  Sparkles, Trophy, Globe, Hourglass, Gamepad2, UserCheck, RefreshCw, 
  LogOut, Play, ChevronLeft, Award, Zap, Download, FileText, Eye, Printer, X, ZoomIn
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { Tokoh, QuizMode, QuizScore } from '../types/tokoh';
import { TOKOH_DATA, getEraCategory, extractCleanOrigin } from '../data/tokohData';
import { playSuccessSound, playWrongSound } from '../utils/audio';

const TOTAL_QUESTIONS = 20;

export type GameStage = 'NAME_INPUT' | 'MENU' | 'PLAYING';

// Helper function to shuffle an array (Fisher-Yates)
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const QuizView: React.FC = () => {
  // Player state: user MUST enter name before playing
  const [playerName, setPlayerName] = useState<string>('');
  const [inputName, setInputName] = useState<string>('');
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);
  const [gameStage, setGameStage] = useState<GameStage>('NAME_INPUT');

  const [mode, setMode] = useState<QuizMode>('wajah');
  const [currentQuestionType, setCurrentQuestionType] = useState<'wajah' | 'pengaruh'>('wajah');
  const [questionIndex, setQuestionIndex] = useState<number>(1);
  const [sessionTokohList, setSessionTokohList] = useState<Tokoh[]>([]);
  const [currentTokoh, setCurrentTokoh] = useState<Tokoh | null>(null);
  const [options, setOptions] = useState<Tokoh[]>([]);
  const [selectedOption, setSelectedOption] = useState<Tokoh | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const [countdownPercent, setCountdownPercent] = useState<number>(100);
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);
  const [maxStreak, setMaxStreak] = useState<number>(0);

  const [score, setScore] = useState<QuizScore>({ correct: 0, wrong: 0, streak: 0 });

  const autoNextTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [isGeneratingCertificate, setIsGeneratingCertificate] = useState<boolean>(false);
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);

  const generateCertificateCanvas = async (): Promise<HTMLCanvasElement | null> => {
    const canvas = document.createElement('canvas');
    const width = 1200;
    const height = 860;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Helper function for rounded rectangles with fallback
    const drawRoundRect = (x: number, y: number, w: number, h: number, r: number) => {
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(x, y, w, h, r);
      } else {
        ctx.rect(x, y, w, h);
      }
    };

    // 1. Background: Pure White to Warm Ivory/Pearl
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, '#ffffff');
    bgGradient.addColorStop(0.5, '#fffdfa');
    bgGradient.addColorStop(1, '#fff8f6');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // 1.5. Watermark Logo MF in Background (Red & Gold MF Emblem)
    await new Promise<void>((resolve) => {
      const watermarkImg = new Image();
      watermarkImg.crossOrigin = 'anonymous';
      watermarkImg.onload = () => {
        try {
          ctx.save();
          ctx.globalAlpha = 0.085; // Elegant, subtle watermark opacity
          const wmSize = 460;
          const wmX = (width - wmSize) / 2;
          const wmY = (height - wmSize) / 2 + 15;
          ctx.drawImage(watermarkImg, wmX, wmY, wmSize, wmSize);
          ctx.restore();
        } catch (e) {
          console.error('Error drawing watermark:', e);
        }
        resolve();
      };
      watermarkImg.onerror = () => resolve();
      watermarkImg.src = `${import.meta.env.BASE_URL}logo-mf.png`;
      setTimeout(resolve, 350);
    });

    // 2. Outer Border Frame (Merah / Royal Crimson Red)
    ctx.strokeStyle = '#881337';
    ctx.lineWidth = 10;
    ctx.strokeRect(25, 25, width - 50, height - 50);

    // 3. Inner Decorative Border (Kuning Emas / Royal Gold)
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(38, 38, width - 76, height - 76);

    // Corner Ornaments (Emas & Merah)
    const cornerSize = 22;
    ctx.fillStyle = '#f59e0b'; // Gold outer
    ctx.fillRect(38, 38, cornerSize, cornerSize);
    ctx.fillRect(width - 38 - cornerSize, 38, cornerSize, cornerSize);
    ctx.fillRect(38, height - 38 - cornerSize, cornerSize, cornerSize);
    ctx.fillRect(width - 38 - cornerSize, height - 38 - cornerSize, cornerSize, cornerSize);

    // Inner Corner Inset (Crimson Red)
    const innerCornerSize = 12;
    ctx.fillStyle = '#881337';
    ctx.fillRect(43, 43, innerCornerSize, innerCornerSize);
    ctx.fillRect(width - 43 - innerCornerSize, 43, innerCornerSize, innerCornerSize);
    ctx.fillRect(43, height - 43 - innerCornerSize, innerCornerSize, innerCornerSize);
    ctx.fillRect(width - 43 - innerCornerSize, height - 43 - innerCornerSize, innerCornerSize, innerCornerSize);

    // 4. Header Top Logo & Title
    ctx.textAlign = 'center';

    // Top Pill Tag (Kuning / Gold & Merah)
    ctx.fillStyle = '#fef3c7'; // Pastel Gold Yellow
    ctx.beginPath();
    const tagWidth = 390;
    const tagHeight = 28;
    const tagX = (width - tagWidth) / 2;
    const tagY = 60;
    drawRoundRect(tagX, tagY, tagWidth, tagHeight, 14);
    ctx.fill();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#92400e'; // Rich Gold/Amber text
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('🏛️ KUIS EDUKASI INTERAKTIF SEJARAH DUNIA', width / 2, 78);

    // Main Title (Royal Crimson Merah)
    ctx.fillStyle = '#881337';
    ctx.font = 'bold 36px Georgia, serif';
    ctx.fillText('SERTIFIKAT HASIL CAPAIAN KUIS', width / 2, 130);

    // Subtitle (Emas / Amber)
    ctx.fillStyle = '#b45309';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText('82 TOKOH PALING BERPENGARUH DALAM SEJARAH (MICHAEL H. HART)', width / 2, 160);

    ctx.fillStyle = '#78350f';
    ctx.font = 'normal 13px sans-serif';
    ctx.fillText('Edisi Khusus Tokoh Sains, Matematika, Kedokteran & Peradaban Dunia', width / 2, 182);

    // Decorative Divider Line (Merah - Emas - Merah)
    const divGrad = ctx.createLinearGradient(180, 0, width - 180, 0);
    divGrad.addColorStop(0, 'rgba(136, 19, 55, 0)');
    divGrad.addColorStop(0.3, 'rgba(136, 19, 55, 1)');
    divGrad.addColorStop(0.5, 'rgba(245, 158, 11, 1)');
    divGrad.addColorStop(0.7, 'rgba(136, 19, 55, 1)');
    divGrad.addColorStop(1, 'rgba(136, 19, 55, 0)');
    ctx.strokeStyle = divGrad;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(180, 205);
    ctx.lineTo(width - 180, 205);
    ctx.stroke();

    // 5. Recipient Section
    ctx.fillStyle = '#475569';
    ctx.font = 'italic 16px Georgia, serif';
    ctx.fillText('Diberikan secara resmi kepada pemain:', width / 2, 238);

    // Player Name (Royal Crimson)
    ctx.fillStyle = '#881337';
    ctx.font = 'bold 44px Georgia, serif';
    ctx.fillText(playerName.toUpperCase(), width / 2, 290);

    // Underline under player name (Gold)
    const nameWidth = Math.min(Math.max(ctx.measureText(playerName.toUpperCase()).width + 40, 280), 600);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo((width - nameWidth) / 2, 305);
    ctx.lineTo((width + nameWidth) / 2, 305);
    ctx.stroke();

    const modeName = mode === 'wajah' ? 'Tebak Wajah Tokoh' : mode === 'pengaruh' ? 'Tebak Karya & Penemuan' : 'Tantangan Campuran';
    const todayStr = new Date().toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    ctx.fillStyle = '#b45309';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText(`Kategori Kuis: ${modeName}   •   Total 20 Soal Acak Komprehensif`, width / 2, 335);

    // 6. Stats Cards Row
    const cardWidth = 240;
    const cardHeight = 90;
    const cardY = 360;
    const startX = (width - (cardWidth * 3 + 30 * 2)) / 2;

    // Card 1: Benar (White background, Gold border)
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#fcd34d';
    ctx.lineWidth = 2;
    ctx.beginPath();
    drawRoundRect(startX, cardY, cardWidth, cardHeight, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#b45309';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('JAWABAN BENAR', startX + cardWidth / 2, cardY + 28);
    ctx.fillStyle = '#881337';
    ctx.font = 'bold 30px Georgia, serif';
    const pct = Math.round((score.correct / TOTAL_QUESTIONS) * 100);
    ctx.fillText(`${score.correct} / ${TOTAL_QUESTIONS}`, startX + cardWidth / 2, cardY + 62);
    ctx.fillStyle = '#d97706';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText(`Akurasi: ${pct}%`, startX + cardWidth / 2, cardY + 78);

    // Card 2: Salah (White background, Crimson/Rose border)
    const c2X = startX + cardWidth + 30;
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#fca5a5';
    ctx.lineWidth = 2;
    ctx.beginPath();
    drawRoundRect(c2X, cardY, cardWidth, cardHeight, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#9f1239';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('JAWABAN SALAH', c2X + cardWidth / 2, cardY + 28);
    ctx.fillStyle = '#be123c';
    ctx.font = 'bold 30px Georgia, serif';
    ctx.fillText(`${score.wrong}`, c2X + cardWidth / 2, cardY + 62);
    ctx.fillStyle = '#9f1239';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('Evaluasi Jawaban', c2X + cardWidth / 2, cardY + 78);

    // Card 3: Max Streak (White background, Gold/Amber border)
    const c3X = c2X + cardWidth + 30;
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#fde68a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    drawRoundRect(c3X, cardY, cardWidth, cardHeight, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#b45309';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('MAX STREAK BERUNTUN', c3X + cardWidth / 2, cardY + 28);
    ctx.fillStyle = '#d97706';
    ctx.font = 'bold 30px Georgia, serif';
    ctx.fillText(`${maxStreak} 🔥`, c3X + cardWidth / 2, cardY + 62);
    ctx.fillStyle = '#92400e';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('Streak Terbaik', c3X + cardWidth / 2, cardY + 78);

    // 7. Grade Badge Box (Warm Ivory White with Gold border & Crimson text)
    const grade = getGradeEvaluation(score.correct);
    const badgeBoxWidth = 720;
    const badgeBoxHeight = 54;
    const badgeBoxX = (width - badgeBoxWidth) / 2;
    const badgeBoxY = 475;

    ctx.fillStyle = '#fffdf7';
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    drawRoundRect(badgeBoxX, badgeBoxY, badgeBoxWidth, badgeBoxHeight, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#881337';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText(grade.badge, width / 2, badgeBoxY + 34);

    // Grade description text
    ctx.fillStyle = '#475569';
    ctx.font = 'italic 15px Georgia, serif';
    ctx.fillText(`"${grade.desc}"`, width / 2, 560);

    // Bottom Divider (Merah - Emas - Merah)
    ctx.strokeStyle = divGrad;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(180, 600);
    ctx.lineTo(width - 180, 600);
    ctx.stroke();

    // 8. Footer Section: Logo 82 (Kiri) & Tanggal + Cap Tervalidasi Resmi (Kanan)
    // -------------------------------------------------------------
    // BAGIAN 1 (KIRI BAWAH): LOGO 82 TOKOH DUNIA
    // -------------------------------------------------------------
    const logo82X = 280;

    ctx.textAlign = 'center';

    // Badge container for "82"
    const bSize = 84;
    const bX = logo82X - bSize / 2;
    const bY = 642;

    // Gradient background for badge: Royal Crimson to Deep Maroon
    const badgeGrad = ctx.createLinearGradient(bX, bY, bX + bSize, bY + bSize);
    badgeGrad.addColorStop(0, '#881337');
    badgeGrad.addColorStop(1, '#4c0519');

    ctx.fillStyle = badgeGrad;
    ctx.beginPath();
    drawRoundRect(bX, bY, bSize, bSize, 22);
    ctx.fill();

    // Gold Outer Border
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Inner subtle gold ring
    ctx.strokeStyle = 'rgba(254, 240, 138, 0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    drawRoundRect(bX + 4, bY + 4, bSize - 8, bSize - 8, 18);
    ctx.stroke();

    // Number "82" in sparkling white serif
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px Georgia, serif';
    ctx.fillText('82', logo82X, bY + 50);

    // Subtext inside badge (Gold)
    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 8.5px sans-serif';
    ctx.fillText('TOKOH DUNIA', logo82X, bY + 70);

    // Label below badge
    ctx.fillStyle = '#881337';
    ctx.font = 'bold 15px Georgia, serif';
    ctx.fillText('82 Tokoh Dunia', logo82X, 756);

    ctx.fillStyle = '#b45309';
    ctx.font = 'italic 12px sans-serif';
    ctx.fillText('Edisi Khusus Michael H. Hart', logo82X, 775);

    // -------------------------------------------------------------
    // BAGIAN 2 (KANAN BAWAH): TANGGAL & CAP TERVALIDASI RESMI
    // -------------------------------------------------------------
    const stampX = 920;

    // Tanggal di atas Cap Tervalidasi (Merah Elegan)
    ctx.fillStyle = '#881337';
    ctx.font = 'bold 15px Georgia, serif';
    ctx.fillText(`Tanggal: ${todayStr}`, stampX, 642);

    // Cap Tervalidasi Resmi (Merah & Emas Stempel Resmi)
    const stampY = 712;

    ctx.save();
    ctx.translate(stampX, stampY);
    ctx.rotate((-4 * Math.PI) / 180);

    // Stamp Outer Circle (Crimson Red)
    ctx.strokeStyle = '#881337';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(0, 0, 52, 0, Math.PI * 2);
    ctx.stroke();

    // Stamp Inner Circle (Crimson)
    ctx.strokeStyle = '#9f1239';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(0, 0, 46, 0, Math.PI * 2);
    ctx.stroke();

    // Stamp Dotted Accent Ring (Gold)
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.2;
    ctx.setLineDash([3, 2.5]);
    ctx.beginPath();
    ctx.arc(0, 0, 39, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Stamp Top Text
    ctx.fillStyle = '#7f1d1d';
    ctx.font = 'bold 9.5px sans-serif';
    ctx.fillText('★ SISTEM KUIS EDUKASI ★', 0, -22);

    // Stamp Center Banner Pill (Crimson fill)
    ctx.fillStyle = '#881337';
    ctx.beginPath();
    drawRoundRect(-52, -12, 104, 24, 6);
    ctx.fill();

    // Stamp Center Text (White)
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12.5px sans-serif';
    ctx.fillText('✓ TERVALIDASI', 0, 4);

    // Stamp Bottom Accent (Gold stars)
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('★ ★ ★', 0, 26);

    ctx.restore();

    return canvas;
  };

  // Auto-generate preview certificate when quiz completes
  useEffect(() => {
    if (isQuizFinished && isPlayerReady) {
      let isCancelled = false;
      generateCertificateCanvas().then((canvas) => {
        if (!isCancelled && canvas) {
          setPreviewDataUrl(canvas.toDataURL('image/png'));
        }
      });
      return () => {
        isCancelled = true;
      };
    } else {
      setPreviewDataUrl(null);
      setShowPreviewModal(false);
    }
  }, [isQuizFinished, isPlayerReady, score.correct, score.wrong, maxStreak, playerName, mode]);

  // ESC key listener to close preview modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showPreviewModal) {
        setShowPreviewModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showPreviewModal]);

  const handleDownloadPNG = async () => {
    setIsGeneratingCertificate(true);
    try {
      let dataUrl = previewDataUrl;
      if (!dataUrl) {
        const canvas = await generateCertificateCanvas();
        if (!canvas) return;
        dataUrl = canvas.toDataURL('image/png');
        setPreviewDataUrl(dataUrl);
      }
      const link = document.createElement('a');
      const cleanPlayerName = playerName.replace(/[^a-zA-Z0-9_-]/g, '_') || 'Pemain';
      link.download = `Sertifikat_Nilai_82Tokoh_${cleanPlayerName}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error generating PNG:', err);
    } finally {
      setIsGeneratingCertificate(false);
    }
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingCertificate(true);
    try {
      let dataUrl = previewDataUrl;
      let width = 1200;
      let height = 860;
      if (!dataUrl) {
        const canvas = await generateCertificateCanvas();
        if (!canvas) return;
        dataUrl = canvas.toDataURL('image/png');
        width = canvas.width;
        height = canvas.height;
        setPreviewDataUrl(dataUrl);
      }
      const cleanPlayerName = playerName.replace(/[^a-zA-Z0-9_-]/g, '_') || 'Pemain';
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [width, height],
      });
      pdf.addImage(dataUrl, 'PNG', 0, 0, width, height);
      pdf.save(`Sertifikat_Nilai_82Tokoh_${cleanPlayerName}.pdf`);
    } catch (err) {
      console.error('Error generating PDF:', err);
    } finally {
      setIsGeneratingCertificate(false);
    }
  };

  const handlePrintCertificate = async () => {
    setIsGeneratingCertificate(true);
    try {
      let dataUrl = previewDataUrl;
      if (!dataUrl) {
        const canvas = await generateCertificateCanvas();
        if (!canvas) return;
        dataUrl = canvas.toDataURL('image/png');
        setPreviewDataUrl(dataUrl);
      }

      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Cetak Sertifikat - ${playerName}</title>
              <style>
                @page {
                  size: landscape;
                  margin: 0;
                }
                * {
                  box-sizing: border-box;
                }
                html, body {
                  margin: 0;
                  padding: 0;
                  width: 100%;
                  height: 100%;
                  background: #ffffff;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
                img {
                  width: 100vw;
                  height: 100vh;
                  object-fit: contain;
                  display: block;
                }
              </style>
            </head>
            <body>
              <img src="${dataUrl}" alt="Sertifikat Nilai" onload="setTimeout(function(){ window.print(); }, 250);" />
            </body>
          </html>
        `);
        printWindow.document.close();
      } else {
        const iframe = document.createElement('iframe');
        iframe.style.position = 'fixed';
        iframe.style.right = '0';
        iframe.style.bottom = '0';
        iframe.style.width = '0';
        iframe.style.height = '0';
        iframe.style.border = '0';
        document.body.appendChild(iframe);
        const doc = iframe.contentWindow?.document;
        if (doc) {
          doc.write(`
            <html>
              <head>
                <style>
                  @page { size: landscape; margin: 0; }
                  body { margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; }
                  img { width: 100%; height: auto; }
                </style>
              </head>
              <body><img src="${dataUrl}" onload="setTimeout(function(){ window.print(); }, 200);" /></body>
            </html>
          `);
          doc.close();
          setTimeout(() => {
            document.body.removeChild(iframe);
          }, 3000);
        }
      }
    } catch (err) {
      console.error('Error printing certificate:', err);
    } finally {
      setIsGeneratingCertificate(false);
    }
  };

  // Load a question by index from the randomized 20 figures
  const loadQuestion = (qIndex: number, list: Tokoh[], activeMode: QuizMode) => {
    const target = list[qIndex - 1];
    if (!target) return;

    setCurrentTokoh(target);
    setIsAnswered(false);
    setSelectedOption(null);
    setImageError(false);
    setCountdownPercent(100);

    if (activeMode === 'campuran') {
      setCurrentQuestionType(qIndex % 2 === 1 ? 'wajah' : 'pengaruh');
    } else {
      setCurrentQuestionType(activeMode);
    }

    // Pick 3 distractors from the remaining 81 figures (excluding target)
    const otherFigures = TOKOH_DATA.filter((t) => t.rank !== target.rank);
    const shuffledOthers = shuffleArray(otherFigures);
    const distractors = shuffledOthers.slice(0, 3);

    // Combine & shuffle the 4 choices
    const allChoices = shuffleArray([target, ...distractors]);
    setOptions(allChoices);
  };

  // Initialize a fresh 20-question session with 20 completely unique, randomized figures
  const startNewQuizSession = useCallback(
    (selectedMode?: QuizMode) => {
      const activeMode = selectedMode || mode;
      if (autoNextTimerRef.current) clearTimeout(autoNextTimerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

      // Shuffle all 82 figures and pick 20 unique figures
      const shuffledPool = shuffleArray(TOKOH_DATA);
      const selected20 = shuffledPool.slice(0, TOTAL_QUESTIONS);

      setSessionTokohList(selected20);
      setQuestionIndex(1);
      setScore({ correct: 0, wrong: 0, streak: 0 });
      setMaxStreak(0);
      setIsQuizFinished(false);
      setIsAnswered(false);
      setSelectedOption(null);
      setImageError(false);
      setCountdownPercent(100);

      // Load first question
      loadQuestion(1, selected20, activeMode);
    },
    [mode]
  );

  useEffect(() => {
    return () => {
      if (autoNextTimerRef.current) clearTimeout(autoNextTimerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, []);

  const handleStartWithPlayerName = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanName = inputName.trim();
    if (!cleanName) return;

    setPlayerName(cleanName);
    setIsPlayerReady(true);
    setGameStage('MENU'); // Langsung buka Menu Game setelah user mengisi nama!
  };

  const handleSelectGameMode = (chosenMode: QuizMode) => {
    setMode(chosenMode);
    startNewQuizSession(chosenMode);
    setGameStage('PLAYING');
  };

  const handleReturnToMenu = () => {
    if (autoNextTimerRef.current) clearTimeout(autoNextTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    setGameStage('MENU');
  };

  const handleChangePlayer = () => {
    if (autoNextTimerRef.current) clearTimeout(autoNextTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    setPlayerName('');
    setInputName('');
    setIsPlayerReady(false);
    setGameStage('NAME_INPUT');
  };

  const advanceToNextQuestion = useCallback(() => {
    if (autoNextTimerRef.current) clearTimeout(autoNextTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

    if (questionIndex >= TOTAL_QUESTIONS) {
      setIsQuizFinished(true);
    } else {
      const nextIndex = questionIndex + 1;
      setQuestionIndex(nextIndex);
      loadQuestion(nextIndex, sessionTokohList, mode);
    }
  }, [questionIndex, sessionTokohList, mode]);

  const handleAnswer = useCallback(
    (option: Tokoh) => {
      if (isAnswered || !currentTokoh) return;

      setIsAnswered(true);
      setSelectedOption(option);

      const correct = option.rank === currentTokoh.rank;
      setIsCorrect(correct);

      if (correct) {
        playSuccessSound();
        setScore((prev) => {
          const newStreak = prev.streak + 1;
          setMaxStreak((m) => Math.max(m, newStreak));
          return {
            correct: prev.correct + 1,
            wrong: prev.wrong,
            streak: newStreak,
          };
        });
      } else {
        playWrongSound();
        setScore((prev) => ({
          correct: prev.correct,
          wrong: prev.wrong + 1,
          streak: 0,
        }));
      }

      // Smooth countdown progress bar (2800ms)
      const duration = 2800;
      const intervalMs = 50;
      const step = (intervalMs / duration) * 100;

      countdownIntervalRef.current = setInterval(() => {
        setCountdownPercent((prev) => {
          if (prev <= 0) {
            if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
            return 0;
          }
          return prev - step;
        });
      }, intervalMs);

      autoNextTimerRef.current = setTimeout(() => {
        advanceToNextQuestion();
      }, duration);
    },
    [isAnswered, currentTokoh, advanceToNextQuestion]
  );

  // Keyboard shortcut listeners (1, 2, 3, 4 atau A, B, C, D)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlayerReady || gameStage !== 'PLAYING') return;

      if (isQuizFinished) {
        if (e.key === 'Enter') startNewQuizSession(mode);
        return;
      }

      if (isAnswered) {
        if (e.key === 'Enter' || e.key === ' ') {
          advanceToNextQuestion();
        }
        return;
      }

      const keyMap: Record<string, number> = {
        '1': 0,
        '2': 1,
        '3': 2,
        '4': 3,
        a: 0,
        b: 1,
        c: 2,
        d: 3,
        A: 0,
        B: 1,
        C: 2,
        D: 3,
      };

      if (keyMap[e.key] !== undefined && options[keyMap[e.key]]) {
        handleAnswer(options[keyMap[e.key]]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlayerReady, gameStage, isAnswered, isQuizFinished, options, handleAnswer, advanceToNextQuestion, startNewQuizSession, mode]);

  const alphabet = ['A', 'B', 'C', 'D'];

  // Gen Z Streak titles
  const getStreakTitle = (streak: number) => {
    if (streak >= 7) return '👑 Si Paling Genius';
    if (streak >= 5) return '⚡ Otak Einstein';
    if (streak >= 3) return '🔥 On Fire!';
    if (streak >= 1) return '🌱 Semangat!';
    return '🎯 Yuk Coba!';
  };

  // Evaluation Grade for 20 questions
  const getGradeEvaluation = (correctCount: number) => {
    const percentage = Math.round((correctCount / TOTAL_QUESTIONS) * 100);
    if (percentage >= 90) {
      return {
        badge: '👑 Master Sejarah Dunia (Grade S)',
        desc: `Luar biasa, ${playerName}! Pengetahuan sejarah dan wawasan sains Anda setingkat ensiklopedia berjalan.`,
        color: 'text-amber-600 bg-amber-50 border-amber-300',
      };
    } else if (percentage >= 75) {
      return {
        badge: '🥇 Sejarawan Ahli (Grade A)',
        desc: `Hebat sekali, ${playerName}! Anda sangat mengenal tokoh-tokoh sains dan peradaban yang mengubah dunia.`,
        color: 'text-emerald-700 bg-emerald-50 border-emerald-300',
      };
    } else if (percentage >= 50) {
      return {
        badge: '🥈 Pelajar Cerdas (Grade B)',
        desc: `Bagus, ${playerName}! Anda memiliki pemahaman umum yang kuat tentang para perintis peradaban.`,
        color: 'text-blue-700 bg-blue-50 border-blue-300',
      };
    } else {
      return {
        badge: '🥉 Penjelajah Muda (Grade C)',
        desc: `Awal yang baik, ${playerName}! Terus eksplorasi Galeri Tokoh untuk memperkaya wawasan sejarah dunia.`,
        color: 'text-purple-700 bg-purple-50 border-purple-300',
      };
    }
  };

  /* ==========================================================
     LAYAR 1: MASUKKAN DATA PEMAIN (NAMA)
     ========================================================== */
  if (gameStage === 'NAME_INPUT' || !isPlayerReady) {
    return (
      <div className="max-w-md mx-auto space-y-6 animate-in zoom-in-95 duration-200">
        <div className="bg-white rounded-3xl border-2 border-purple-300 p-6 sm:p-8 shadow-2xl shadow-purple-900/10 text-center space-y-6">
          {/* Game Avatar Icon */}
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-xl shadow-purple-500/25">
            <Gamepad2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-black uppercase tracking-widest text-purple-700 block">
              Arena Kuis 82 Tokoh Dunia
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Masukan Data Pemain
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Jika ingin main game, Anda harus memasukan <strong className="text-purple-900">Nama</strong> terlebih dahulu:
            </p>
          </div>

          {/* Form Input Nama */}
          <form onSubmit={handleStartWithPlayerName} className="space-y-4 text-left">
            <div className="space-y-2">
              <label 
                htmlFor="input-player-name" 
                className="block text-sm font-black text-purple-950 flex items-center gap-2"
              >
                <div className="w-6 h-6 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                  <User className="w-3.5 h-3.5" />
                </div>
                <span className="text-base font-black">Nama:</span>
              </label>
              <input
                id="input-player-name"
                type="text"
                autoFocus
                required
                placeholder="Ketik nama Anda di sini..."
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                maxLength={30}
                className="w-full bg-purple-50/70 border-2 border-purple-300 text-slate-900 text-base font-bold rounded-2xl px-4 py-3.5 outline-none focus:border-purple-600 focus:ring-4 focus:ring-purple-500/20 transition-all placeholder:text-slate-400 shadow-inner"
              />
            </div>

            <button
              type="submit"
              disabled={!inputName.trim()}
              className={`w-full inline-flex items-center justify-center gap-2 font-black text-base py-3.5 px-6 rounded-2xl shadow-lg transition-all ${
                inputName.trim()
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-purple-600/30 hover:scale-[1.02] cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Lanjut ke Menu Game</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="pt-1 text-[11px] text-slate-500">
            <span>💡 Setelah memasukkan nama, Anda dapat memilih mode game yang ingin dimainkan.</span>
          </div>
        </div>
      </div>
    );
  }

  /* ==========================================================
     LAYAR 2: MENU PILIHAN GAME (SETELAH MENGISI DATA)
     ========================================================== */
  if (gameStage === 'MENU') {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-in zoom-in-95 duration-200">
        {/* Header Kartu Sambutan Pemain */}
        <div className="bg-white rounded-3xl border-2 border-purple-200 p-6 sm:p-8 shadow-xl shadow-purple-900/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-800 text-white flex items-center justify-center shadow-lg shadow-purple-600/30 shrink-0">
              <Gamepad2 className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-black uppercase tracking-widest text-purple-700">
                  Arena Game Edukasi Sejarah
                </span>
                <span className="text-slate-300">&bull;</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold bg-purple-100 text-purple-900 px-2.5 py-0.5 rounded-full">
                  <User className="w-3 h-3 text-purple-700" />
                  <span>Pemain: <strong>{playerName}</strong></span>
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">
                Pilih Mode Permainan
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Halo, <strong className="text-purple-950 font-black">{playerName}</strong>! Silakan pilih tantangan game yang ingin kamu mainkan:
              </p>
            </div>
          </div>
        </div>

        {/* 3 Game Mode Choice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* KARTU 1: TEBAK WAJAH */}
          <div
            onClick={() => handleSelectGameMode('wajah')}
            className="group relative bg-white rounded-3xl border-2 border-purple-200 hover:border-purple-500 p-6 shadow-md hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100/50 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-purple-500/30 group-hover:scale-110 transition-transform">
                  <User className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-full">
                  🖼️ Mode Visual
                </span>
              </div>

              <div>
                <h3 className="font-serif text-xl font-black text-slate-900 group-hover:text-purple-900 transition-colors">
                  Tebak Wajah Tokoh
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Uji ketajaman visualmu! Kenali nama tokoh penemu dan peradaban dunia dari foto arsip serta lukisan sejarah otentik.
                </p>
              </div>

              <ul className="text-[11px] font-bold text-slate-500 space-y-1.5 pt-1">
                <li className="flex items-center gap-1.5 text-purple-900">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                  <span>20 Soal Foto Sejarah Acak</span>
                </li>
                <li className="flex items-center gap-1.5 text-purple-900">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                  <span>Petunjuk Asal Wilayah & Era</span>
                </li>
                <li className="flex items-center gap-1.5 text-purple-900">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                  <span>Pilihan Ganda 4 Opsi</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 relative z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectGameMode('wajah');
                }}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 group-hover:from-purple-700 group-hover:to-indigo-700 text-white font-black text-sm py-3 px-4 rounded-2xl shadow-md shadow-purple-600/30 group-hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Mainkan Mode Ini</span>
                <Play className="w-4 h-4 fill-white" />
              </button>
            </div>
          </div>

          {/* KARTU 2: TEBAK KARYA & PENEMUAN */}
          <div
            onClick={() => handleSelectGameMode('pengaruh')}
            className="group relative bg-white rounded-3xl border-2 border-amber-200 hover:border-amber-500 p-6 shadow-md hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100/50 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-md shadow-amber-500/30 group-hover:scale-110 transition-transform">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                  💡 Mode Wawasan
                </span>
              </div>

              <div>
                <h3 className="font-serif text-xl font-black text-slate-900 group-hover:text-amber-900 transition-colors">
                  Tebak Karya & Penemuan
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Uji wawasan sains & sejarahmu! Diberikan deskripsi kontribusi sains atau teori peradaban, tebak siapa tokoh jeniusnya.
                </p>
              </div>

              <ul className="text-[11px] font-bold text-slate-500 space-y-1.5 pt-1">
                <li className="flex items-center gap-1.5 text-amber-950">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>20 Soal Kutipan Karya & Sains</span>
                </li>
                <li className="flex items-center gap-1.5 text-amber-950">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>Asah Logika & Wawasan Sejarah</span>
                </li>
                <li className="flex items-center gap-1.5 text-amber-950">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>Pilihan Ganda 4 Opsi</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 relative z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectGameMode('pengaruh');
                }}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 group-hover:from-amber-600 group-hover:to-orange-700 text-white font-black text-sm py-3 px-4 rounded-2xl shadow-md shadow-amber-500/30 group-hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Mainkan Mode Ini</span>
                <Play className="w-4 h-4 fill-white" />
              </button>
            </div>
          </div>

          {/* KARTU 3: TANTANGAN CAMPURAN */}
          <div
            onClick={() => handleSelectGameMode('campuran')}
            className="group relative bg-white rounded-3xl border-2 border-emerald-300 hover:border-emerald-500 p-6 shadow-md hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/50 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center shadow-md shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                  ⚡ Paling Seru 🔥
                </span>
              </div>

              <div>
                <h3 className="font-serif text-xl font-black text-slate-900 group-hover:text-emerald-900 transition-colors">
                  Tantangan Campuran
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Tantangan komprehensif! Kombinasi seimbang antara tebak wajah visual dan kutipan karya penemuan secara acak bergantian.
                </p>
              </div>

              <ul className="text-[11px] font-bold text-slate-500 space-y-1.5 pt-1">
                <li className="flex items-center gap-1.5 text-emerald-950">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>20 Soal Mix Wajah & Karya</span>
                </li>
                <li className="flex items-center gap-1.5 text-emerald-950">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Tantangan Paling Dinamis</span>
                </li>
                <li className="flex items-center gap-1.5 text-emerald-950">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Raih Gelar Tertinggi Grade S</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 relative z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectGameMode('campuran');
                }}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-700 group-hover:from-emerald-700 group-hover:to-teal-800 text-white font-black text-sm py-3 px-4 rounded-2xl shadow-md shadow-emerald-600/30 group-hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Mainkan Mode Ini</span>
                <Play className="w-4 h-4 fill-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Info Banner Footer */}
        <div className="bg-purple-50/80 border border-purple-200/80 rounded-2xl p-4 flex items-center justify-between gap-3 text-xs text-purple-950">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-purple-600 shrink-0" />
            <span>
              Setiap sesi berdurasi <strong>20 soal acak unik</strong> dari total 82 tokoh dunia Michael H. Hart. Capai streak tertinggi untuk gelar Master Sejarah!
            </span>
          </div>
        </div>
      </div>
    );
  }

  /* ==========================================================
     LAYAR 3: HASIL AKHIR KUIS (SELESAI 20 SOAL)
     ========================================================== */
  if (isQuizFinished) {
    const grade = getGradeEvaluation(score.correct);
    const scorePercentage = Math.round((score.correct / TOTAL_QUESTIONS) * 100);

    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-in zoom-in-95 duration-300">
        <div className="bg-white rounded-3xl border border-[#c4ecd3] p-6 sm:p-10 shadow-2xl shadow-emerald-950/10 text-center space-y-6">
          {/* Trophy Header */}
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center mx-auto shadow-xl shadow-amber-400/30">
            <Trophy className="w-10 h-10" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-900 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-2">
              <User className="w-3.5 h-3.5 text-purple-700" />
              <span>Pemain: {playerName}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-emerald-950">
              Hasil Kuis 82 Tokoh Dunia
            </h2>
          </div>

          {/* Grade Badge */}
          <div className={`inline-block px-4 py-2 rounded-2xl border font-black text-sm sm:text-base ${grade.color}`}>
            {grade.badge}
          </div>

          <p className="text-sm text-emerald-850 max-w-md mx-auto">
            {grade.desc}
          </p>

          {/* Score Stats Grid */}
          <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200/80">
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-black text-emerald-700">
                {score.correct} / {TOTAL_QUESTIONS}
              </span>
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                Benar ({scorePercentage}%)
              </span>
            </div>

            <div className="flex flex-col items-center border-x border-emerald-200">
              <span className="text-2xl sm:text-3xl font-black text-rose-600">
                {score.wrong}
              </span>
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                Salah
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-black text-amber-500 flex items-center gap-1">
                {maxStreak} <Flame className="w-5 h-5 fill-amber-500" />
              </span>
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                Max Streak
              </span>
            </div>
          </div>

          {/* Certificate Live Preview & Actions Section */}
          <div className="bg-emerald-50/80 rounded-3xl border-2 border-emerald-300 p-5 sm:p-6 text-left space-y-4 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-200/80 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-700" />
                  <h3 className="font-serif font-black text-lg sm:text-xl text-emerald-950">
                    Pratinjau Sertifikat Hasil Kuis
                  </h3>
                </div>
                <p className="text-xs text-emerald-800 mt-0.5">
                  Periksa pratinjau sertifikat di bawah ini sebelum Anda mengunduh (PDF/PNG) atau mencetaknya.
                </p>
              </div>

              <button
                onClick={() => setShowPreviewModal(true)}
                disabled={!previewDataUrl}
                className="inline-flex items-center gap-1.5 self-start sm:self-auto bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-black px-3.5 py-2 rounded-xl shadow transition-all hover:scale-105 cursor-pointer disabled:opacity-50"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>Lihat Layar Penuh</span>
              </button>
            </div>

            {/* Certificate Preview Image Display */}
            <div
              onClick={() => previewDataUrl && setShowPreviewModal(true)}
              className="relative group cursor-pointer overflow-hidden rounded-2xl border-2 border-emerald-200 bg-white shadow-inner flex items-center justify-center min-h-[220px]"
              title="Klik untuk memperbesar sertifikat"
            >
              {previewDataUrl ? (
                <>
                  <img
                    src={previewDataUrl}
                    alt="Pratinjau Sertifikat Nilai"
                    className="w-full h-auto object-contain rounded-xl transition-transform duration-300 group-hover:scale-[1.01]"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-emerald-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-black text-sm backdrop-blur-[2px]">
                    <Eye className="w-5 h-5" />
                    <span>Klik untuk Melihat Tampilan Penuh</span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-emerald-700 space-y-2">
                  <RefreshCw className="w-6 h-6 animate-spin text-emerald-600" />
                  <span className="text-xs font-bold">Membuat pratinjau sertifikat...</span>
                </div>
              )}
            </div>

            {/* Action Buttons inside Preview Box */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 pt-1">
              <button
                onClick={() => setShowPreviewModal(true)}
                disabled={!previewDataUrl}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-emerald-100 border border-emerald-300 text-emerald-900 font-extrabold text-xs sm:text-sm py-3 px-3 rounded-xl shadow-sm hover:scale-[1.02] transition-all cursor-pointer disabled:opacity-50"
              >
                <Eye className="w-4 h-4 text-emerald-700" />
                <span>Lihat Penuh</span>
              </button>

              <button
                onClick={handlePrintCertificate}
                disabled={isGeneratingCertificate}
                className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm py-3 px-3 rounded-xl shadow-md shadow-indigo-600/20 hover:scale-[1.02] transition-all cursor-pointer disabled:opacity-75"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak</span>
              </button>

              <button
                onClick={handleDownloadPDF}
                disabled={isGeneratingCertificate}
                className="inline-flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs sm:text-sm py-3 px-3 rounded-xl shadow-md shadow-rose-600/20 hover:scale-[1.02] transition-all cursor-pointer disabled:opacity-75"
              >
                <FileText className="w-4 h-4" />
                <span>Download PDF</span>
              </button>

              <button
                onClick={handleDownloadPNG}
                disabled={isGeneratingCertificate}
                className="inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs sm:text-sm py-3 px-3 rounded-xl shadow-md shadow-teal-600/20 hover:scale-[1.02] transition-all cursor-pointer disabled:opacity-75"
              >
                <Download className="w-4 h-4" />
                <span>Download PNG</span>
              </button>
            </div>
          </div>

          {/* Action Buttons: Main Lagi & Pilih Mode Lain */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 flex-wrap">
            <button
              onClick={() => startNewQuizSession(mode)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-extrabold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-lg shadow-purple-600/30 transition-all hover:scale-105 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Mainkan Lagi (20 Soal Acak Baru)</span>
            </button>

            <button
              onClick={handleReturnToMenu}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-600/30 transition-all hover:scale-105 cursor-pointer"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Pilih Mode Game Lain</span>
            </button>
          </div>
        </div>

        {/* MODAL PRATINJAU SERTIFIKAT FULLSCREEN */}
        {showPreviewModal && previewDataUrl && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setShowPreviewModal(false)}
          >
            <div 
              className="relative w-full max-w-5xl bg-white rounded-3xl border border-emerald-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-emerald-800 to-teal-900 text-white">
                <div className="flex items-center gap-2.5">
                  <Award className="w-5 h-5 text-emerald-300" />
                  <div>
                    <h3 className="font-serif font-black text-base sm:text-lg leading-tight">
                      Pratinjau Sertifikat Resmi Kuis
                    </h3>
                    <p className="text-[11px] text-emerald-200">
                      Sertifikat capaian atas nama: <strong className="text-white">{playerName}</strong>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Tutup Pratinjau (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body: High-Res Preview Image */}
              <div className="p-4 sm:p-6 overflow-auto bg-slate-100/80 flex items-center justify-center">
                <img
                  src={previewDataUrl}
                  alt="Sertifikat Nilai"
                  className="w-full max-h-[65vh] object-contain rounded-xl shadow-lg border border-slate-200 bg-white"
                />
              </div>

              {/* Modal Footer: Action Buttons */}
              <div className="p-4 sm:px-6 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-500 hidden sm:block">
                  💡 Anda dapat langsung mencetak sertifikat atau menyimpannya sebagai file PDF / gambar PNG.
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-wrap">
                  <button
                    onClick={handlePrintCertificate}
                    disabled={isGeneratingCertificate}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow transition-all hover:scale-105 cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Cetak</span>
                  </button>

                  <button
                    onClick={handleDownloadPDF}
                    disabled={isGeneratingCertificate}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow transition-all hover:scale-105 cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>

                  <button
                    onClick={handleDownloadPNG}
                    disabled={isGeneratingCertificate}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow transition-all hover:scale-105 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PNG</span>
                  </button>

                  <button
                    onClick={() => setShowPreviewModal(false)}
                    className="sm:flex-initial inline-flex items-center justify-center bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                  >
                    <span>Tutup</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (!currentTokoh) return null;

  const era = getEraCategory(currentTokoh.years);
  const cleanOrigin = extractCleanOrigin(currentTokoh.origin);
  const progressPercent = (questionIndex / TOTAL_QUESTIONS) * 100;

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      {/* Top Header: Mode Switcher & Stats Bar in 1 Line */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/90 backdrop-blur-md p-2 sm:p-2.5 rounded-2xl border border-[#c4ecd3] shadow-xs">
        {/* Return to Menu Button & Current Mode Tag */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleReturnToMenu}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-extrabold text-xs sm:text-sm bg-purple-100 hover:bg-purple-200 text-purple-950 border border-purple-200 transition-all cursor-pointer shadow-xs"
            title="Kembali ke Menu Pilihan Game"
          >
            <ChevronLeft className="w-4 h-4 text-purple-700" />
            <span>Menu Game</span>
          </button>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-black bg-purple-50 text-purple-900 border border-purple-200">
            {mode === 'wajah' && (
              <>
                <User className="w-3.5 h-3.5 text-purple-600" />
                <span>Mode: Tebak Wajah</span>
              </>
            )}
            {mode === 'pengaruh' && (
              <>
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                <span>Mode: Tebak Karya</span>
              </>
            )}
            {mode === 'campuran' && (
              <>
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Mode: Campuran 🔥</span>
              </>
            )}
          </div>

          {/* Player Badge */}
          <div className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-950 font-bold text-xs px-2.5 py-1 rounded-lg border border-purple-200 shadow-xs">
            <User className="w-3.5 h-3.5 text-purple-600" />
            <span>Pemain: <strong className="text-purple-800">{playerName}</strong></span>
          </div>
        </div>

        {/* Live Score Counter & 20-Question Progress */}
        <div className="flex items-center gap-2.5 sm:gap-4 px-2">
          {/* Question Index Badge / 20 */}
          <div className="flex items-center gap-1 text-xs font-black text-purple-900 bg-purple-100/90 px-3 py-1 rounded-xl border border-purple-200">
            <span>Soal {questionIndex}</span>
            <span className="text-purple-400 font-normal">/</span>
            <span>{TOTAL_QUESTIONS}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{score.correct}</span>
            </span>

            <span className="inline-flex items-center gap-1 text-xs font-black text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md">
              <XCircle className="w-3.5 h-3.5" />
              <span>{score.wrong}</span>
            </span>
          </div>

          <div
            className={`flex items-center gap-1 text-xs font-black px-2.5 py-1 rounded-lg transition-all ${
              score.streak >= 3
                ? 'bg-amber-400 text-amber-950 shadow-md shadow-amber-400/40 animate-pulse'
                : 'bg-amber-100/80 text-amber-900 border border-amber-200'
            }`}
          >
            <Flame className="w-4 h-4 fill-amber-500" />
            <span>{score.streak}</span>
            <span className="hidden sm:inline font-bold text-[10px] ml-0.5 opacity-85">
              ({getStreakTitle(score.streak)})
            </span>
          </div>

          <button
            onClick={() => startNewQuizSession(mode)}
            title="Mulai Ulang 20 Soal Acak Baru"
            className="p-1.5 text-slate-600 hover:text-emerald-950 hover:bg-emerald-100 rounded-lg transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Progress Bar of 20 Questions */}
      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Quiz Arena Card: Compact 2-Column Grid (NO VERTICAL CUTOFF) */}
      <div className="bg-white rounded-3xl border border-[#c4ecd3] shadow-xl shadow-emerald-950/5 overflow-hidden transition-all">
        {/* Animated Countdown bar during answer state */}
        {isAnswered && (
          <div className="w-full h-1.5 bg-slate-100 overflow-hidden">
            <div
              className={`h-full transition-all duration-75 ${
                isCorrect ? 'bg-emerald-500' : 'bg-rose-500'
              }`}
              style={{ width: `${countdownPercent}%` }}
            />
          </div>
        )}

        <div className="p-4 sm:p-6 lg:p-7">
          {currentQuestionType === 'wajah' ? (
            /* ================= MODE 1: TEBAK WAJAH (SIDE BY SIDE 2-COLUMN) ================= */
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-stretch">
              {/* Left Column: Portrait Showcase */}
              <div className="md:col-span-5 flex flex-col justify-between bg-gradient-to-br from-purple-50/70 to-emerald-50/70 rounded-2xl p-3 sm:p-3.5 border border-purple-200/60">
                <div className="relative w-full h-52 sm:h-64 rounded-xl overflow-hidden shadow-md border-2 border-purple-400/80 bg-slate-950 group">
                  {!imageError ? (
                    <img
                      src={currentTokoh.image}
                      alt="Wajah Tokoh Sejarah"
                      className="w-full h-full object-cover object-[center_20%] transition-transform duration-300 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-purple-100 text-purple-900 text-center p-4">
                      <div className="w-16 h-16 rounded-full bg-purple-300 flex items-center justify-center font-serif text-2xl font-bold mb-2">
                        {currentTokoh.name.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="text-xs font-bold text-purple-800">
                        Foto Arsip Historis
                      </span>
                    </div>
                  )}

                  {/* Dark gradient overlay for bottom tags */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  {/* Clues Pill integrated INSIDE image frame */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-bold text-white z-10">
                    <span className="bg-black/75 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/20 flex items-center gap-1">
                      <Globe className="w-3 h-3 text-purple-300" />
                      <span>{cleanOrigin}</span>
                    </span>

                    <span className="bg-black/75 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/20 flex items-center gap-1">
                      <Hourglass className="w-3 h-3 text-purple-300" />
                      <span>{era}</span>
                    </span>
                  </div>
                </div>

                <div className="mt-2.5 flex items-center justify-between text-[11px] text-purple-900 font-semibold px-1">
                  <span>🏛️ Arsip Foto Sejarah</span>
                  <span className="text-purple-700 font-bold">Acak 20 Tokoh</span>
                </div>
              </div>

              {/* Right Column: Question + 4 Options */}
              <div className="md:col-span-7 flex flex-col justify-between space-y-3 sm:space-y-4">
                {/* Question Prompt */}
                <div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider text-purple-700 mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Tantangan #{questionIndex} dari 20</span>
                  </span>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    Siapakah tokoh sejarah pada foto arsip di samping?
                  </h3>
                </div>

                {/* 4 Choices (2x2 Grid, Compact & Screen-Fitting) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {options.map((opt, idx) => {
                    const isThisCorrect = opt.rank === currentTokoh.rank;
                    const isThisSelected = selectedOption?.rank === opt.rank;

                    let btnClass =
                      'bg-[#fcfdfd] border-slate-200 text-slate-900 hover:bg-purple-50/70 hover:border-purple-300 hover:scale-[1.01]';

                    if (isAnswered) {
                      if (isThisCorrect) {
                        btnClass =
                          'bg-emerald-100 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/40 font-extrabold';
                      } else if (isThisSelected && !isThisCorrect) {
                        btnClass =
                          'bg-rose-100 border-rose-500 text-rose-950 ring-2 ring-rose-500/40 font-extrabold';
                      } else {
                        btnClass = 'bg-slate-50 border-slate-200 text-slate-400 opacity-50';
                      }
                    }

                    return (
                      <button
                        key={opt.rank}
                        disabled={isAnswered}
                        onClick={() => handleAnswer(opt)}
                        className={`p-3 rounded-xl border text-left font-sans text-xs sm:text-sm font-bold flex items-center justify-between gap-2.5 transition-all duration-150 shadow-xs cursor-pointer disabled:cursor-default ${btnClass}`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-900 flex items-center justify-center font-black text-xs shrink-0">
                            {alphabet[idx]}
                          </span>
                          <div className="min-w-0">
                            <span className="block truncate font-bold text-slate-900">
                              {opt.name}
                            </span>
                            <span className="text-[10px] font-normal text-slate-600">
                              {opt.years}
                            </span>
                          </div>
                        </div>

                        {/* Keyboard shortcut hint */}
                        {!isAnswered && (
                          <kbd className="hidden sm:inline text-[9px] font-mono text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200 shrink-0">
                            {idx + 1}
                          </kbd>
                        )}

                        {isAnswered && isThisCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                        {isAnswered && isThisSelected && !isThisCorrect && (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Instant Inline Feedback Bar */}
                {isAnswered ? (
                  <div
                    className={`p-3 sm:p-3.5 rounded-xl border flex items-center justify-between gap-3 animate-in fade-in duration-200 ${
                      isCorrect
                        ? 'bg-emerald-100/90 border-emerald-300 text-emerald-950'
                        : 'bg-rose-50 border-rose-200 text-rose-950'
                    }`}
                  >
                    <div className="text-xs leading-snug">
                      <span className="font-extrabold block">
                        {isCorrect ? '🎉 Tepat Sekali!' : '❌ Jawaban Kurang Tepat!'}
                      </span>
                      <p className="line-clamp-2 text-slate-900 mt-0.5">
                        Beliau adalah <strong>{currentTokoh.name}</strong> ({currentTokoh.origin}). {currentTokoh.influence}.
                      </p>
                    </div>

                    <button
                      onClick={advanceToNextQuestion}
                      className="shrink-0 inline-flex items-center gap-1.5 bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs px-3.5 py-2 rounded-lg shadow transition-all hover:scale-105 cursor-pointer"
                    >
                      <span>Lanjut ({questionIndex}/20)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="text-[11px] text-slate-600 flex items-center justify-between pt-1">
                    <span>💡 Tip: Tekan tombol [1, 2, 3, 4] di keyboard</span>
                    <span className="italic">Pemain: {playerName}</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* ================= MODE 2: TEBAK KARYA & PENGARUH (COMPACT BANNER) ================= */
            <div className="space-y-4">
              {/* Question Influence Prompt */}
              <div className="bg-gradient-to-br from-purple-50/80 to-indigo-50/80 border-2 border-purple-200 rounded-2xl p-5 text-center relative overflow-hidden shadow-inner">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 bg-purple-200 text-purple-950 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    <Sparkles className="w-3 h-3 text-purple-700" />
                    <span>Lompatan Sejarah #{questionIndex} dari 20</span>
                  </span>
                  <span className="text-xs font-bold text-purple-900">
                    &bull; Era: <strong>{era}</strong> &bull; Asal: <strong>{cleanOrigin}</strong>
                  </span>
                </div>

                <p className="font-serif text-lg sm:text-xl font-extrabold text-slate-900 max-w-2xl mx-auto leading-relaxed">
                  "{currentTokoh.influence}"
                </p>
                <p className="text-xs font-bold text-purple-800 mt-2">
                  Siapakah tokoh visioner di balik sumbangan peradaban ini?
                </p>
              </div>

              {/* 4 Choices Grid (2x2) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {options.map((opt, idx) => {
                  const isThisCorrect = opt.rank === currentTokoh.rank;
                  const isThisSelected = selectedOption?.rank === opt.rank;

                  let btnClass =
                    'bg-[#fcfdfd] border-slate-200 text-slate-900 hover:bg-purple-50/70 hover:border-purple-300 hover:scale-[1.01]';

                  if (isAnswered) {
                    if (isThisCorrect) {
                      btnClass =
                        'bg-emerald-100 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/40 font-extrabold';
                    } else if (isThisSelected && !isThisCorrect) {
                      btnClass =
                        'bg-rose-100 border-rose-500 text-rose-950 ring-2 ring-rose-500/40 font-extrabold';
                    } else {
                      btnClass = 'bg-slate-50 border-slate-200 text-slate-400 opacity-50';
                    }
                  }

                  return (
                    <button
                      key={opt.rank}
                      disabled={isAnswered}
                      onClick={() => handleAnswer(opt)}
                      className={`p-3.5 rounded-xl border text-left font-sans text-xs sm:text-sm font-bold flex items-center justify-between gap-2.5 transition-all duration-150 shadow-xs cursor-pointer disabled:cursor-default ${btnClass}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-950 flex items-center justify-center font-black text-xs shrink-0">
                          {alphabet[idx]}
                        </span>
                        <div>
                          <span className="block font-bold text-slate-900 text-sm">
                            {opt.name}
                          </span>
                          <span className="text-[10px] text-slate-600 font-medium">
                            {opt.origin} ({opt.years})
                          </span>
                        </div>
                      </div>

                      {!isAnswered && (
                        <kbd className="hidden sm:inline text-[9px] font-mono text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200">
                          {idx + 1}
                        </kbd>
                      )}

                      {isAnswered && isThisCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                      {isAnswered && isThisSelected && !isThisCorrect && (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback Bar Mode 2 */}
              {isAnswered && (
                <div
                  className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 animate-in fade-in duration-200 ${
                    isCorrect
                      ? 'bg-emerald-100/90 border-emerald-300 text-emerald-950'
                      : 'bg-rose-50 border-rose-200 text-rose-950'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={currentTokoh.image}
                      alt={currentTokoh.name}
                      className="w-10 h-10 rounded-full object-cover border border-purple-300 shadow-sm shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="text-xs leading-snug">
                      <span className="font-extrabold block">
                        {isCorrect ? '🎉 Benar Banget!' : '❌ Kurang Tepat!'}
                      </span>
                      <span>
                        Tokoh di balik karya ini adalah <strong>{currentTokoh.name}</strong> ({currentTokoh.origin}).
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={advanceToNextQuestion}
                    className="shrink-0 inline-flex items-center gap-1.5 bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs px-3.5 py-2 rounded-lg shadow transition-all hover:scale-105 cursor-pointer"
                  >
                    <span>Lanjut ({questionIndex}/20)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
