'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './ExploreSection.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function ExploreSection() {
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const colFarLeftRef = useRef<HTMLDivElement>(null);
  const colInnerLeftRef = useRef<HTMLDivElement>(null);
  const colCenterRef = useRef<HTMLDivElement>(null);
  const colInnerRightRef = useRef<HTMLDivElement>(null);
  const colFarRightRef = useRef<HTMLDivElement>(null);
  const centerImageRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    if (!pinWrapperRef.current) return;

    // Phase 1: Entry Stagger
    gsap.fromTo(
      [colFarLeftRef.current, colFarRightRef.current],
      { y: 60 },
      {
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: pinWrapperRef.current,
          start: 'top 85%',
          end: 'top top',
          scrub: 1,
        }
      }
    );
    gsap.fromTo(
      [colInnerLeftRef.current, colInnerRightRef.current],
      { y: 30 },
      {
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: pinWrapperRef.current,
          start: 'top 85%',
          end: 'top top',
          scrub: 1,
        }
      }
    );

    // Phase 2: Pin & Expand Center
    gsap.to(colCenterRef.current, {
      width: '84vw',
      height: '80vh',
      ease: 'none',
      scrollTrigger: {
        trigger: pinWrapperRef.current,
        start: 'top top',
        end: '+=100%',
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
      },
    });
  }, { scope: pinWrapperRef });

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <h2 className={styles.mainHeading}>Enter the Sacred Sanctuary</h2>
        
        <div className={styles.divider}></div>
        
        <p className={styles.description}>
          Step through the doors of Our Lady of Milagris Cathedral to behold the main altar, sacred stained-glass windows, and tranquil prayer aisles. Experience the spiritual heritage, solemn liturgy, and centuries of Marian devotion in Sawantwadi.
        </p>
        
        <button className={styles.ctaButton}>
          <span className={styles.ctaText}>VIEW SANCTUARY & MASS TIMINGS</span>
          <div className={styles.ctaIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7" />
            </svg>
          </div>
        </button>
      </div>

      <div className={styles.galleryPinWrapper} ref={pinWrapperRef}>
        <div className={styles.galleryGrid}>
          {/* Column 1 (Far Left) */}
          <div className={styles.colFarLeft} ref={colFarLeftRef}>
            <Image 
              src="/images/gallery/milagris1.jpg" 
              alt="Milagris Detail" 
              fill
              className={styles.fillImage} 
            />
          </div>

          {/* Column 2 (Inner Left) */}
          <div className={styles.colInnerLeft} ref={colInnerLeftRef}>
            <div className={styles.colInnerLeftTop}>
              <Image 
                src="/images/interior/inner3.jpg" 
                alt="Sanctuary Window" 
                fill
                className={styles.fillImage} 
              />
            </div>
            <div className={styles.colInnerLeftBottom}>
              <Image 
                src="/images/interior/inner2.jpg" 
                alt="Altar Detail" 
                fill
                className={styles.fillImage} 
              />
            </div>
          </div>

          {/* Column 3 (Center Expanding Hero) */}
          <div className={styles.colCenter} ref={colCenterRef}>
            <Image 
              src="/images/interior/inner1.jpg" 
              alt="Milagris Main Altar" 
              fill
              className={styles.fillImage}
            />
          </div>

          {/* Column 4 (Inner Right) */}
          <div className={styles.colInnerRight} ref={colInnerRightRef}>
            <div className={styles.colInnerRightTop}>
              <Image 
                src="/images/gallery/milagris2.jpg" 
                alt="Cathedral Night View" 
                fill
                className={styles.fillImage} 
              />
            </div>
            <div className={styles.colInnerRightBottom}>
              <Image 
                src="/images/interior/inner1.jpg" 
                alt="Sanctuary Ambience" 
                fill
                className={styles.fillImage} 
              />
            </div>
          </div>

          {/* Column 5 (Far Right) */}
          <div className={styles.colFarRight} ref={colFarRightRef}>
            <Image 
              src="/images/interior/inner3.jpg" 
              alt="Historic Pillar" 
              fill
              className={styles.fillImage} 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
