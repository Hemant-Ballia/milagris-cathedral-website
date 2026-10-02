'use client';

import { useState } from 'react';
import styles from './page.module.css';
import Navbar from '@/components/layout/Navbar';
import LegacySection from '@/components/sections/LegacySection';
import ClergySection from '@/components/sections/ClergySection';
import CommunitySection from '@/components/sections/CommunitySection';
import ExploreSection from '@/components/sections/ExploreSection';
import GuestBookFooter from '@/components/sections/GuestBookFooter';

export default function Home() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <Navbar />
      
      <div className={styles.homeContainer}>
        {/* 2. Top Video Container */}
        <div className={styles.videoContainer}>
          <video
            autoPlay
            muted
            loop
            playsInline
            className={styles.heroVideo}
            onCanPlay={() => {
              (window as any).heroVideoReady = true;
              window.dispatchEvent(new Event('hero-video-ready'));
            }}
            onError={() => {
              (window as any).heroVideoReady = true;
              window.dispatchEvent(new Event('hero-video-ready'));
            }}
          >
            <source src="/videos/hero/Hero_new_web.mp4" type="video/mp4" />
          </video>
          <div className={styles.videoGradient}></div>
        </div>

        {/* 3. Overlapping Circular Play Button & Label */}
        <div className={styles.playButtonContainer}>
          <div className={styles.hoverVideoPreview}>
            <video src="/videos/hero/play_video.mp4" muted loop playsInline autoPlay className={styles.previewVideoElement} />
          </div>
          <button className={styles.playButtonOuter} onClick={() => setIsVideoOpen(true)}>
            <div className={styles.playButtonInner}>
              <svg viewBox="0 0 24 24" fill="#092545" className={styles.playIcon}>
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
          <span className={styles.playLabel}>EXPLORE THE SANCTUARY</span>
        </div>

        {/* 4. Bottom White Title Banner */}
        <div className={styles.bottomBanner}>
          <h2 className={styles.giantHeading}>OUR LADY OF MILAGRIS CATHEDRAL</h2>
          <div className={styles.verticalHairline}></div>
        </div>
      </div>

      <main>
        <LegacySection />
        <ClergySection />
        <CommunitySection />
        <ExploreSection />
        <GuestBookFooter />
      </main>

      {/* Full-Screen Video Modal */}
      {isVideoOpen && (
        <div className={styles.videoModalOverlay} onClick={() => setIsVideoOpen(false)}>
          <button className={styles.closeBtn} onClick={() => setIsVideoOpen(false)}>✕ CLOSE</button>
          <div className={styles.videoModalContent} onClick={e => e.stopPropagation()}>
            <video 
              src="/videos/hero/play_video.mp4" 
              autoPlay 
              controls 
              className={styles.modalVideo} 
            />
          </div>
        </div>
      )}
    </>
  );
}
