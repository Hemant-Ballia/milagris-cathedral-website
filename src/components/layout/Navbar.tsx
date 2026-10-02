'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import MenuDrawer from './MenuDrawer';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`${styles.topHeader} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.headerLeft}>
          <h1 className={styles.brandTitle}>MILAGRIS</h1>
          <p className={styles.brandSubtitle}>CATHEDRAL SAWANTWADI</p>
        </div>
        
        <div className={styles.headerCenter}>
          <Image 
            src="/images/logo/Milagris_logo.png" 
            alt="Milagris Cathedral Logo" 
            width={96} 
            height={48} 
            className={styles.headerLogo}
            priority
          />
        </div>
        
        <div className={styles.headerRight}>
          <button type="button" className={styles.hamburgerBtn} onClick={() => setIsMenuOpen(true)}>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>
        </div>
      </header>

      <MenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
