import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGsapScroll(
  callback: (gsapInstance: typeof gsap, scrollTrigger: typeof ScrollTrigger) => void,
  dependencies: unknown[] = []
) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      callback(gsap, ScrollTrigger);
    });
    
    return () => ctx.revert(); // Cleanup on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
