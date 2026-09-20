import { useState } from 'react';
import { TabType, Tokoh } from './types/tokoh';
import { Navbar } from './components/Navbar';
import { GalleryView } from './components/GalleryView';
import { QuizView } from './components/QuizView';
import { MethodologyView } from './components/MethodologyView';
import { TokohDetailModal } from './components/TokohDetailModal';
import { OnboardingModal } from './components/OnboardingModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('galeri');
  const [selectedTokoh, setSelectedTokoh] = useState<Tokoh | null>(null);

  // Disclaimer Agreement state: SELALU WAJIB muncul di awal setiap kali refresh / dibuka
  const [hasUserAgreedDisclaimer, setHasUserAgreedDisclaimer] = useState<boolean>(false);
  const [isDisclaimerModalOpen, setIsDisclaimerModalOpen] = useState<boolean>(true);
  const [isManualReopen, setIsManualReopen] = useState<boolean>(false);

  const handleAgreeDisclaimer = () => {
    setHasUserAgreedDisclaimer(true);
    setIsDisclaimerModalOpen(false);
    setIsManualReopen(false);
  };

  const handleOpenDisclaimerManual = () => {
    setIsManualReopen(true);
    setIsDisclaimerModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f2fbf5] text-emerald-950 font-sans selection:bg-emerald-200 selection:text-emerald-950">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenOnboarding={handleOpenDisclaimerManual}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'galeri' && (
          <div className="animate-in fade-in duration-300">
            <GalleryView onSelectTokoh={(tokoh) => setSelectedTokoh(tokoh)} />
          </div>
        )}

        {activeTab === 'kuis' && (
          <div className="animate-in fade-in duration-300">
            <QuizView />
          </div>
        )}

        {activeTab === 'metodologi' && (
          <div className="animate-in fade-in duration-300">
            <MethodologyView />
          </div>
        )}
      </main>

      {/* Interactive Detail Modal */}
      <TokohDetailModal
        tokoh={selectedTokoh}
        onClose={() => setSelectedTokoh(null)}
      />

      {/* Mandatory Red Disclaimer Modal */}
      <OnboardingModal
        isOpen={isDisclaimerModalOpen || !hasUserAgreedDisclaimer}
        onClose={handleAgreeDisclaimer}
        canDismissWithoutAgree={isManualReopen && hasUserAgreedDisclaimer}
      />

      {/* App Footer */}
      <Footer />
    </div>
  );
}
