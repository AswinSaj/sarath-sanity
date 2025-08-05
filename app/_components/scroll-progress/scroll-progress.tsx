"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import "./scroll-progress.css";

const ScrollProgress = () => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      gsap.to(progressRef.current, {
        height: `${progress * 100}%`,
        duration: 0.3,
        ease: "power2.out",
      });
    };
    window.addEventListener("scroll", handleScroll);
    // Set initial state
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="scroll-progress-container">
      <div className="scroll-progress-bar" ref={progressRef} />
    </div>
  );
};

export default ScrollProgress;
