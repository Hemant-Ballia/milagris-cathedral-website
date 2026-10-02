'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useGsapScroll } from '@/hooks/use-gsap';
import styles from './ClergySection.module.css';

export default function ClergySection() {
  const containerRef = useRef<HTMLElement>(null);
  const frontCardRef = useRef<HTMLImageElement>(null);

  useGsapScroll((gsap, ScrollTrigger) => {
    if (containerRef.current && frontCardRef.current) {
      gsap.fromTo(frontCardRef.current,
        { y: 35 },
        {
          y: -35,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          }
        }
      );
    }
  });

  return (
    <section ref={containerRef} className={styles.section}>
      <div className={styles.grid}>
        {/* Left Column (Layered Visuals) */}
        <div className={styles.leftCol}>
          <div className={styles.leftCollage}>
            {/* Back Layer 1 — Light Slate-Blue */}
            <div className={styles.backCard1}></div>
            
            {/* Back Layer 2 — Monochrome Flush-Left Card */}
            <Image 
              src="/images/interior/inner2.jpg"
              alt="Architectural detail"
              width={600}
              height={800}
              className={styles.backCard2}
            />
            
            {/* Front Layer 3 — Main Foreground Image Card */}
            <Image 
              ref={frontCardRef}
              src="/images/gallery/milagris1.jpg"
              alt="Milagris Cathedral Exterior"
              width={800}
              height={700}
              className={styles.mainImage}
            />
            
            {/* Cursive 'Legacy' Script in Front */}
            <div className={styles.legacyScript}>Legacy</div>
          </div>
        </div>

        {/* Right Column (Typography) */}
        <div className={styles.rightCol}>
          <h2 className={styles.heading}>Meet Our Parish Clergy</h2>
          <div className={styles.divider}></div>
          
          <p className={styles.leadParagraph}>
            Under the spiritual leadership of the Bishop of Sindhudurg and our dedicated Parish Priest, Milagris Cathedral continues its mission of spreading love, hope, and the teachings of Christ.
          </p>
          
          <p className={styles.bodyParagraph}>
            The clergy team works hand-in-hand with the local community to organize daily masses, sacraments, and pastoral care. Their unwavering dedication ensures that the Cathedral remains not just a historic monument, but a vibrant, living sanctuary for all who seek spiritual nourishment.
          </p>
        </div>
      </div>
    </section>
  );
}
