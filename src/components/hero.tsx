import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroTextMask } from "./hero-text-mask";

interface HeroProps {
  videoSrc: string;
  posterSrc?: string;
  /** Plain text above the mask, e.g. "Architecture" */
  headlineTop?: string;
  /** Text rendered through the video mask, e.g. "& Interiors." */
  headlineMasked?: string;
  subheadline?: string;
}

const PARALLAX_DISTANCES = { small: 100, medium: 200, large: 300, xlarge: 300 };

function getBreakpoint(width: number) {
  if (width < 640) return "small";
  if (width < 1024) return "medium";
  if (width < 1440) return "large";
  return "xlarge";
}

export function Hero({
  videoSrc,
  posterSrc,
  headlineTop = "Architecture",
  headlineMasked = "& Interiors.",
  subheadline,
}: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  // Parallax scroll
  const { scrollY } = useScroll();
  const [sectionHeight, setSectionHeight] = useState(1);
  const [parallaxDistance, setParallaxDistance] = useState(
    PARALLAX_DISTANCES[getBreakpoint(window.innerWidth)],
  );

  useEffect(() => {
    function measure() {
      if (sectionRef.current) {
        setSectionHeight(sectionRef.current.clientHeight);
      }
      setParallaxDistance(PARALLAX_DISTANCES[getBreakpoint(window.innerWidth)]);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const opacity = useTransform(scrollY, [0, sectionHeight], [1, 0]);
  const y = useTransform(scrollY, [0, sectionHeight], [0, parallaxDistance]);

  // Video visibility (play/pause)
  const handleVisibility = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const video = videoRef.current;
      if (!video) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    [],
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(handleVisibility, { threshold: 0 });
    observer.observe(section);
    return () => observer.disconnect();
  }, [handleVisibility]);

  const textMaskRef = useRef<HeroTextMask>(null!);

  const headlineCallbackRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (textMaskRef.current) {
        textMaskRef.current.destroy();
        textMaskRef.current = null!;
      }
      headlineRef.current = node;
      if (node && videoRef.current) {
        textMaskRef.current = new HeroTextMask(
          node,
          videoRef.current,
          headlineMasked,
        );
      }
    },
    [headlineMasked],
  );

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <section
      ref={sectionRef}
      className="relative z-[1] h-[90vh] min-h-[620px] max-h-[980px] w-full overflow-hidden bg-black max-lg:min-h-[400px] max-lg:max-h-[720px] max-sm:min-h-0 max-sm:max-h-[420px] max-sm:h-auto"
    >
      {/* Mobile square aspect ratio spacer (::before equivalent) */}
      <div className="hidden max-sm:block w-full pt-[100%]" />

      {/* hero-content — parallax target wraps BOTH video and headline.
          On small screens the section is a square made by the spacer above, so
          h-full resolves to nothing and the headline would fall out of the
          section. Filling the square absolutely is what the original does. */}
      <motion.div
        className="relative z-[1] h-full max-sm:absolute max-sm:inset-0"
        style={prefersReducedMotion ? undefined : { opacity, y }}
      >
        {/* hero-video-container */}
        <div
          className="absolute inset-0 z-[1] bg-cover bg-[center_top] transition-opacity duration-500 ease-in-out before:content-[''] before:block before:absolute before:inset-0 before:z-[2] before:bg-black/30"
          style={
            posterSrc ? { backgroundImage: `url(${posterSrc})` } : undefined
          }
          aria-hidden="true"
        >
          <video
            ref={videoRef}
            className="absolute z-[1] top-0 left-1/2 -translate-x-1/2 min-w-full min-h-full object-cover"
            /* Reduced motion keeps the still poster, so don't fetch the 8 MB
               video at all — the mask never runs for those visitors. */
            src={prefersReducedMotion ? undefined : videoSrc}
            poster={posterSrc}
            crossOrigin="anonymous"
            loop
            muted
            autoPlay
            playsInline
          />
        </div>

        {/* hero-headline-wrapper */}
        <div className="absolute z-[4] w-full top-1/2 -translate-y-1/2 text-center">
          <h1
            ref={headlineCallbackRef}
            className="mx-auto opacity-0 translate-y-[25px]"
          >
            {/* Accessible full text for screen readers */}
            <span className="sr-only">
              {headlineTop} {headlineMasked}
            </span>

            {/* Visual presentation */}
            <div role="presentation" aria-hidden="true">
              <div className="max-w-[600px] mx-auto">
                <span className="headline-top tracking-tight text-white whitespace-nowrap">
                  {headlineTop}
                </span>
              </div>
              <div className="text-mask relative z-[1] overflow-hidden min-h-[160px] max-lg:min-h-[128px]">
                {headlineMasked}
              </div>
            </div>
          </h1>
        </div>
      </motion.div>

      {subheadline && (
        <p className="absolute z-[5] bottom-[10%] w-full text-center text-lg text-white/80 sm:text-xl lg:text-2xl">
          {subheadline}
        </p>
      )}
    </section>
  );
}
