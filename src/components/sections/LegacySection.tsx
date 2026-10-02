'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useGsapScroll } from '@/hooks/use-gsap';
import styles from './LegacySection.module.css';

export default function LegacySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const altarImageRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useGsapScroll((gsap, ScrollTrigger) => {
    if (sectionRef.current && altarImageRef.current && watermarkRef.current) {
      // Altar Image Movement
      gsap.fromTo(
        altarImageRef.current,
        { y: -30, scale: 1.05 },
        {
          y: 55,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          }
        }
      );

      // Watermark Counter-Movement
      gsap.fromTo(
        watermarkRef.current,
        { y: 45 },
        {
          y: -45,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          }
        }
      );
    }
  });

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Top Image & Watermark Lockup */}
      <div className={styles.topImageWrapper}>
        {/* Sacred Watermark Behind Image */}
        <div ref={watermarkRef} className={styles.watermarkCenter}>Sacred Heritage</div>
        
        {/* Altar Image In Front */}
        <div ref={altarImageRef} className={styles.imageInnerContainer}>
          <Image 
            src="/images/interior/inner1.jpg"
            alt="Sanctuary Chandelier"
            fill
            className={styles.topImage}
          />
          <div className={styles.imageMask}></div>
        </div>
      </div>

      <div className={styles.content}>
        <h2 className={styles.mainHeading}>
          The Legacy of the<br />Milagris Cathedral
        </h2>
        
        <div className={styles.divider}></div>
        
        <div className={styles.textContainer}>
          <p className={styles.leadParagraph}>
            Established as a historic beacon of faith in Sawantwadi, Our Lady of Milagris Cathedral stands as the spiritual heart of the Diocese of Sindhudurg.
          </p>
          
          <p className={styles.bodyParagraph}>
            The Cathedral&apos;s colonial-era architecture stands as a testament to the enduring faith of the parish community. Its sacred walls have witnessed countless devotions, echoing with the prayers of generations who sought solace and miracles within its embrace.
          </p>
          
          <p className={styles.bodyParagraph}>
            Guided by a profound spiritual heritage, the <a href="#" className={styles.inlineLink}>Milagris Cathedral Preservation Trust</a> works tirelessly to preserve this architectural marvel, ensuring it remains a beacon of hope and devotion for the future.
          </p>
        </div>

        <button className={styles.ctaButton}>
          <span className={styles.ctaText}>EXPLORE OUR HISTORY</span>
          <div className={styles.ctaIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7" />
            </svg>
          </div>
        </button>
      </div>

      {/* 8-Line English Quote Watermark */}
      <div className={styles.watermarkRight}>
        "I will give you shepherds
        <br />after my own heart,
        <br />who will feed you with
        <br />knowledge and understanding."
        <br />— Jeremiah 3:15
      </div>
    </section>
  );
}
