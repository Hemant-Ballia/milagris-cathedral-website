'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import styles from './MenuDrawer.module.css';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_ITEMS = [
  { label: 'Sanctuary', href: '#' },
  { label: 'History', href: '#' },
  { label: 'Mass & Services', href: '#' },
  { label: 'Preserve', href: '#' },
  { label: 'Contact', href: '#' },
  { label: 'LOGIN', href: '/login' },
];

export default function MenuDrawer({ isOpen, onClose }: MenuDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* 2. Page Dimming Backdrop */}
      <div 
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ''}`} 
        onClick={onClose}
      />

      {/* 2. Drawer Container */}
      <div 
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}
      >
        {/* 3. Top-Right Thin 'X' Close Button */}
        <button type="button" onClick={onClose} className={styles.closeBtn} aria-label="Close menu">
          <div className={styles.closeLines}>
            <div className={styles.closeLine1}></div>
            <div className={styles.closeLine2}></div>
          </div>
        </button>

        {/* 4. Faint Architectural Background Illustration */}
        <div className={styles.watermarkContainer}>
          <Image 
            src="/images/logo/Milagris_logo.png" 
            alt="" 
            width={600} 
            height={600} 
            className={styles.watermark}
          />
        </div>

        {/* 5. 5 Church Navigation Links */}
        <nav className={styles.navContainer}>
          <ul className={styles.menuList}>
            {MENU_ITEMS.map((item, index) => (
              <li key={index} className={styles.menuItem}>
                <div className={styles.hoverIconWrapper}>
                  <svg viewBox="0 0 24 24" fill="currentColor" className={styles.starIcon}>
                    <path d="M12 0L13.8 10.2L24 12L13.8 13.8L12 24L10.2 13.8L0 12L10.2 10.2L12 0Z" />
                  </svg>
                </div>
                <a href={item.href} className={styles.menuLink}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* 6. Bottom Parish Contact Block & Social Icons */}
        <div className={styles.bottomContact}>
          <a href="tel:+9102363272015" className={styles.contactLink}>+91 (02363) 272-015</a>
          <a href="mailto:parish.office@milagriscathedral.org" className={styles.contactLink}>parish.office@milagriscathedral.org</a>
          <p className={styles.addressText}>Near Moti Talao, Sawantwadi, Maharashtra 416510</p>
          
          <div className={styles.socialIcons}>
            <a href="#" className={styles.socialIconLink} aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="#092545" className={styles.socialSvg}>
                 <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z" fillRule="evenodd" clipRule="evenodd"/>
              </svg>
            </a>
            <a href="#" className={styles.socialIconLink} aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="#092545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.socialSvg}>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
