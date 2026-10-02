'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './GuestBookFooter.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function GuestBookFooter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const footerTitleRef = useRef<HTMLHeadingElement>(null);
  const footerDividerRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const colContactRef = useRef<HTMLDivElement>(null);
  const colNavRef = useRef<HTMLDivElement>(null);
  const colLinksRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
      }
    });

    // Footer Title and Divider
    gsap.fromTo(footerTitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: {
        trigger: footerTitleRef.current,
        start: 'top 90%',
      }}
    );

    gsap.fromTo(footerDividerRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 1.2, ease: 'expo.out', transformOrigin: 'left center', scrollTrigger: {
        trigger: footerDividerRef.current,
        start: 'top 90%',
      }}
    );

    // Footer Logo reveal
    gsap.fromTo(logoWrapperRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: {
        trigger: logoWrapperRef.current,
        start: 'top 90%',
      }}
    );

    // Stagger footer columns 2, 3, 4
    gsap.fromTo([colContactRef.current, colNavRef.current, colLinksRef.current],
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.15, scrollTrigger: {
        trigger: colContactRef.current,
        start: 'top 90%',
      }}
    );
  }, { scope: sectionRef });

  return (
    <footer className={styles.footerArea} ref={sectionRef}>
      <h2 className={styles.footerTitle} ref={footerTitleRef}>OUR LADY OF MILAGRIS CATHEDRAL</h2>
      <div className={styles.footerDivider} ref={footerDividerRef}></div>
        
        <div className={styles.footerGrid}>
          {/* Col 1: Crest */}
          <div className={styles.footerCol}>
            <div className={styles.footerLogoWrapper} ref={logoWrapperRef}>
              <Image 
                src="/images/logo/Milagris_logo.png" 
                alt="Milagris Cathedral Logo" 
                width={185} 
                height={185} 
                className={styles.footerLogo}
              />
            </div>
          </div>

          {/* Col 2: Address */}
          <div className={`${styles.footerCol} ${styles.colContact}`} ref={colContactRef}>
            <span className={styles.contactText}>NEAR MOTI TALAO, SAWANTWADI</span>
            <span className={styles.contactText}>SINDHUDURG, MAHARASHTRA 416510</span>
            <span className={styles.contactText}>+91 (02363) 272-XXX</span>
            <span className={styles.contactText}>OFFICE@MILAGRISCATHEDRAL.ORG</span>
            
            <div className={styles.socialIcons}>
              {/* FB Icon */}
              <a href="https://www.facebook.com/profile.php?id=61582998884933" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
                </svg>
              </a>
              {/* Instagram Icon */}
              <a href="https://www.instagram.com/reel/DbaQPY-s9z1/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 3: Nav */}
          <div className={`${styles.footerCol} ${styles.colNav}`} ref={colNavRef}>
            <Link href="#sanctuary" className={styles.navLink}>SANCTUARY</Link>
            <Link href="#history" className={styles.navLink}>HISTORY</Link>
            <Link href="#mass-timings" className={styles.navLink}>MASS TIMINGS</Link>
            <Link href="#clergy" className={styles.navLink}>PARISH CLERGY</Link>
            <Link href="#contact" className={styles.navLink}>CONTACT</Link>
          </div>

          {/* Col 4: Links */}
          <div className={`${styles.footerCol} ${styles.colLinks}`} ref={colLinksRef}>
            <Link href="#" className={styles.extLink}>DIOCESE OF SINDHUDURG ↗</Link>
            <Link href="#" className={styles.extLink}>BISHOP'S HOUSE SAWANTWADI ↗</Link>
            <Link href="#" className={styles.extLink}>ANNUAL FEAST & NOVENA ↗</Link>
            <Link href="#" className={styles.extLink}>CATHEDRAL PRESERVATION TRUST ↗</Link>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className={styles.copyrightBar}>
          <span className={styles.copyrightText}>
            © 2026 Our Lady of Milagris Cathedral, Sawantwadi. All Rights Reserved.
          </span>
        </div>
    </footer>
  );
}
