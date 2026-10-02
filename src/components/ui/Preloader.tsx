'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import styles from './Preloader.module.css';

export default function Preloader() {
  const pathname = usePathname();
  const [progress, setProgress] = useState('00');
  const containerRef = useRef<HTMLDivElement>(null);
  
  const centerLockupRef = useRef<HTMLDivElement>(null);
  const bottomWrapperRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const loadingTextRef = useRef<HTMLSpanElement>(null);
  const percentageRef = useRef<HTMLSpanElement>(null);
  
  const ribbonAmberRef = useRef<HTMLDivElement>(null);
  const ribbonVioletRef = useRef<HTMLDivElement>(null);
  const ribbonBronzeRef = useRef<HTMLDivElement>(null);

  const wipeBarsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = 'hidden';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (prefersReducedMotion) {
             gsap.to(containerRef.current, {
               opacity: 0,
               duration: 0.5,
               ease: 'power2.inOut',
               onComplete: () => {
                 if (containerRef.current) containerRef.current.style.display = 'none';
                 document.body.style.overflow = 'auto';
               }
             });
          }
        }
      });

      const progressObj = { value: 0 };

      if (prefersReducedMotion) {
        tl.to([centerLockupRef.current, bottomWrapperRef.current], { 
          opacity: 1, 
          duration: 0.8,
          ease: 'power1.inOut'
        })
        .to(progressFillRef.current, {
          scaleX: 1,
          duration: 2,
          ease: 'none'
        }, '<')
        .to(progressObj, {
          value: 100,
          duration: 2,
          ease: 'none',
          onUpdate: () => {
            const val = Math.round(progressObj.value);
            setProgress(val < 10 ? `0${val}` : `${val}`);
          }
        }, '<')
        .to({}, { duration: 0.5 }) // stable moment
        .add(() => {
          if (pathname === '/') {
            if (!(window as any).heroVideoReady) {
              tl.pause();
              window.addEventListener('hero-video-ready', () => tl.play(), { once: true });
            }
          }
        });
      } else {
        // Continuous ambient ribbon movement
        if (ribbonAmberRef.current) {
          gsap.to(ribbonAmberRef.current, {
            x: '8vw',
            y: '4vw',
            duration: 8,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1
          });
        }
        if (ribbonVioletRef.current) {
          gsap.to(ribbonVioletRef.current, {
            x: '-6vw',
            y: '-8vw',
            duration: 10,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1
          });
        }
        if (ribbonBronzeRef.current) {
          gsap.to(ribbonBronzeRef.current, {
            x: '5vw',
            scale: 1.05,
            duration: 9,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1
          });
        }

        // 1. Ribbons fade in subtly
        tl.to([ribbonAmberRef.current, ribbonVioletRef.current, ribbonBronzeRef.current], {
          opacity: 1,
          duration: 2,
          ease: 'power2.inOut',
        });

        // 2. Lockup & Bottom Wrapper smoothly fade in while moving upward slightly
        tl.to(
          [centerLockupRef.current, bottomWrapperRef.current],
          {
            y: 0,
            opacity: 1,
            duration: 2,
            ease: 'power2.out',
            stagger: 0.1
          },
          '-=1.2'
        );

        // Run progress bar animation and percentage simultaneously
        tl.to(
          progressFillRef.current,
          {
            scaleX: 1,
            duration: 3,
            ease: 'power2.inOut'
          },
          '-=2.5'
        );

        tl.to(
          progressObj,
          {
            value: 100,
            duration: 3,
            ease: 'power2.inOut',
            onUpdate: () => {
              const val = Math.round(progressObj.value);
              setProgress(val < 10 ? `0${val}` : `${val}`);
            }
          },
          '<'
        );
        
        // 4. Stable moment holding at 100%
        tl.to({}, { duration: 0.6 });

        tl.add(() => {
          if (pathname === '/') {
            if (!(window as any).heroVideoReady) {
              tl.pause();
              window.addEventListener('hero-video-ready', () => tl.play(), { once: true });
            }
          }
        });

        // Phase 2: Stepped Block Wipe Out starts
        // Fade out Loading... text just as wipe starts
        tl.to(loadingTextRef.current, {
          opacity: 0,
          duration: 0.25,
        });

        tl.to(wipeBarsRef.current, {
          scaleX: 1,
          duration: 0.75,
          ease: 'power3.inOut',
          stagger: { each: 0.12, from: 'end' }
        }, '<');

        // Hide contents underneath instantly when covered
        tl.set([centerLockupRef.current, bottomWrapperRef.current, ribbonAmberRef.current, ribbonVioletRef.current, ribbonBronzeRef.current], { 
          opacity: 0 
        });
        tl.set(containerRef.current, { backgroundColor: 'transparent' });
        
        // Change transform origin for the exit wipe
        tl.set(wipeBarsRef.current, { transformOrigin: 'right center' });

        // Wipe out to reveal website
        tl.to(wipeBarsRef.current, {
          scaleX: 0,
          duration: 0.75,
          ease: 'power3.inOut',
          stagger: { each: 0.1, from: 'end' },
          onComplete: () => {
            if (containerRef.current) containerRef.current.style.display = 'none';
            document.body.style.overflow = 'auto';
            gsap.killTweensOf([ribbonAmberRef.current, ribbonVioletRef.current, ribbonBronzeRef.current]);
          }
        });
      }
    });

    return () => {
      ctx.revert();
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.preloaderContainer}>
      
      {/* Wipe Exit Container */}
      <div className={styles.wipeContainer}>
        {[...Array(4)].map((_, i) => (
          <div 
            key={i}
            ref={(el) => {
               if (el) wipeBarsRef.current[i] = el;
            }} 
            className={styles.wipeBar} 
          />
        ))}
      </div>

      {/* Ambient Light Ribbons */}
      <div ref={ribbonAmberRef} className={`${styles.lightRibbon} ${styles.ribbonAmber}`}></div>
      <div ref={ribbonVioletRef} className={`${styles.lightRibbon} ${styles.ribbonViolet}`}></div>
      <div ref={ribbonBronzeRef} className={`${styles.lightRibbon} ${styles.ribbonBronze}`}></div>
      
      {/* 1. Center Logo & Brand Typography Lockup */}
      <div ref={centerLockupRef} className={styles.centerLockup}>
        <Image
          src="/images/logo/Milagris_logo.png"
          alt="Milagris Cathedral Logo"
          width={165}
          height={165}
          priority
          className={styles.lockupLogo}
        />
        <h1 className={styles.lockupTitle}>MILAGRIS</h1>
        <p className={styles.lockupSubtitle}>CATHEDRAL SAWANTWADI</p>
      </div>

      {/* 2. Bottom Framed Progress Bar */}
      <div ref={bottomWrapperRef} className={styles.bottomWrapper}>
        <div className={styles.progressBarTrack}>
          <div ref={progressFillRef} className={styles.progressBarFill}></div>
        </div>
        <div className={styles.loadingTextRow}>
          <span ref={loadingTextRef} className={styles.loadingLabel}>Loading...</span>
          <span ref={percentageRef} className={styles.percentageLabel}>{progress}%</span>
        </div>
      </div>
    </div>
  );
}
