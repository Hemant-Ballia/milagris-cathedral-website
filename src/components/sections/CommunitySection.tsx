'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './CommunitySection.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function CommunitySection() {
  const frontCardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const el = frontCardRef.current;
    if (el) {
      gsap.fromTo(el, 
        { y: 40 },
        { 
          y: -40, 
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2
          }
        }
      );
    }
  }, []);

  return (
    <section className={styles.section}>
      {/* Archive Watermark across the split */}
      <div className={styles.archiveWatermark}>
        "I will give you shepherds
        <br />after my own heart,
        <br />who will feed you with
        <br />knowledge and understanding."
        <br />— Jeremiah 3:15
      </div>
      
      <div className={styles.grid}>
        {/* Left Column (Typography) */}
        <div className={styles.leftCol}>
          <p className={styles.eyebrow}>OUR LADY OF MILAGRIS PARISH COMMUNITY</p>
          <h2 className={styles.heading}>A Living Sanctuary of Faith</h2>
          <div className={styles.divider}></div>
          
          <p className={styles.leadParagraph}>
            The true beauty of Milagris Cathedral lies in its devoted parishioners. United by a shared heritage and profound devotion, our community breathes life into these historic walls.
          </p>
          
          <p className={styles.bodyParagraph}>
            Throughout the year, the Cathedral comes alive with vibrant novenas, choir hymns, and grand feast day celebrations. It is a place where generations of families have celebrated sacraments and found communal harmony, embodying the very spirit of Sawantwadi.
          </p>
        </div>

        {/* Right Column (Image + Circle CTA) */}
        <div className={styles.rightCol}>
          <div className={styles.rightCollageWrapper}>
            {/* Background offset card */}
            <div className={styles.backCard}>
              <Image 
                src="/images/interior/inner3.jpg"
                alt="Architectural detail"
                fill
                className={styles.backCardImage}
              />
            </div>

            {/* Main foreground image */}
            <div className={styles.mainImageWrapper} ref={frontCardRef}>
              <Image 
                src="/images/father.jpg"
                alt="Parish Priest"
                fill
                className={styles.mainImage}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
