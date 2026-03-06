"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenis = useLenis();
  
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
    // Ensure ScrollTrigger refreshes when Lenis scrolls
    ScrollTrigger.refresh();
  }, [pathname, lenis]);

  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.05,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
        syncTouch: true,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
    >
      {children}
    </ReactLenis>
  );
}