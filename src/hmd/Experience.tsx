import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AnimatePresence, motion, useMotionValue,
  useReducedMotion, useScroll, useSpring, useTransform,
} from "framer-motion";
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Check, Copy, Menu, X } from "lucide-react";
import { IMAGES, LOOKBOOK, MATERIAL_TEXTURES, MATERIALS, PROCESS, SERVICES, type MaterialId } from "./content";
import "./styles.css";

/* Motion is part of the art direction, but never a prerequisite for reading. */
const ease = [0.22, 1, 0.36, 1] as const;

function ScrollRestoration() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash && pathname === "/") {
      const timer = window.setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" }), 100);
      return () => window.clearTimeout(timer);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <span className={"hmd-reveal-mask " + className}>
      <motion.span
        className="hmd-reveal-inside"
        initial={reduced ? false : { y: "115%", rotate: 2 }}
        whileInView={{ y: "0%", rotate: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.95, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function Overline({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <span className={"hmd-overline " + (light ? "hmd-overline-light" : "")}><span className="hmd-overline-star">✳</span>{children}</span>;
}

function RoundLink({ to, children, light = false }: { to: string; children: ReactNode; light?: boolean }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 190, damping: 17, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 190, damping: 17, mass: 0.4 });
  const reduced = useReducedMotion();
  return (
    <Link
      className={"hmd-round-link " + (light ? "hmd-round-link-light" : "")}
      to={to}
      onMouseMove={(event) => {
        if (reduced) return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.16);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.16);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      <span>{children}</span>
      <motion.span style={reduced ? undefined : { x: springX, y: springY }} className="hmd-round-icon"><ArrowUpRight size={20} strokeWidth={1.5} /></motion.span>
    </Link>
  );
}

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/materials", label: "Materials" },
  { to: "/#lookbook", label: "Inspiration" },
  { to: "/about", label: "About" },
];

function Nav() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 36);
    handle();
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);
  useEffect(() => { setMenuOpen(false); }, [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const escape = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", escape);
    return () => { document.body.style.overflow = old; window.removeEventListener("keydown", escape); };
  }, [menuOpen]);

  return (
    <>
      <motion.div className="hmd-scroll-line" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      <header className={"hmd-nav " + (scrolled || pathname !== "/" ? "hmd-nav-solid" : "")}>
        <Link className="hmd-logo" to="/" aria-label="HMD Stone home">
          <span className="hmd-logo-symbol" aria-hidden="true"><span /><span /><span /></span>
          <span>HMD<span className="hmd-logo-thin">STONE</span></span>
        </Link>
        <nav className="hmd-nav-links" aria-label="Main navigation">
          {links.map((item) => <Link key={item.label} className={pathname === item.to ? "is-active" : ""} to={item.to}>{item.label}</Link>)}
        </nav>
        <Link className="hmd-nav-quote" to="/contact">START A PROJECT <ArrowUpRight size={16} /></Link>
        <button type="button" className="hmd-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}>
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </header>
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="hmd-menu-overlay" role="dialog" aria-modal="true" aria-label="Site navigation"
            initial={reduced ? false : { clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.68, ease }}>
            <div className="hmd-menu-inner">
              <Overline light>FIND YOUR WAY</Overline>
              {links.map((item, i) => (
                <motion.div key={item.label} initial={reduced ? false : { opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.16 + i * 0.08, duration: 0.5 }}>
                  <Link onClick={() => setMenuOpen(false)} to={item.to}><span>0{i + 1}</span>{item.label}<ArrowUpRight size={24} /></Link>
                </motion.div>
              ))}
              <Link className="hmd-menu-cta" to="/contact" onClick={() => setMenuOpen(false)}>LET'S MAKE SOMETHING REMARKABLE <ArrowUpRight /></Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Intro() {
  const [visible, setVisible] = useState(() => !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), 1150);
    return () => window.clearTimeout(timeout);
  }, []);
  return <AnimatePresence>{visible && (
    <motion.div className="hmd-intro" initial={{ opacity: 1 }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.9, ease }} aria-hidden="true">
      <motion.span initial={{ opacity: 0, letterSpacing: "0.48em" }} animate={{ opacity: 1, letterSpacing: "0.14em" }} transition={{ duration: 0.55 }}>
        HMD <em>STONE</em>
      </motion.span>
      <div className="hmd-intro-track"><motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.86, ease: "easeInOut" }} /></div>
      <small>AN EXPLORATION IN STONE</small>
    </motion.div>
  )}</AnimatePresence>;
}

function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const reduced = useReducedMotion();
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.31]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "34%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.74], [1, 0]);
  const imageRadius = useTransform(scrollYProgress, [0, 0.8], ["0px", "48px"]);
  return (
    <section className="hmd-hero" ref={heroRef}>
      <motion.div className="hmd-hero-image-wrap" style={reduced ? undefined : { borderRadius: imageRadius }}>
        <motion.div className="hmd-hero-image" style={reduced ? undefined : { scale, y: imageY }}>
          <img src={IMAGES.hero} alt="AI-generated kitchen with pale stone island and dark oak cabinetry" />
        </motion.div>
        <div className="hmd-hero-shade" />
        <div className="hmd-hero-grid" aria-hidden="true"><span /><span /><span /></div>
      </motion.div>
      <motion.div className="hmd-hero-copy" style={reduced ? undefined : { y: textY, opacity: textOpacity }}>
        <motion.p className="hmd-hero-eyebrow" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.25, duration: 0.8 }}>COUNTERTOPS, RECONSIDERED. <span>✳</span> MATERIALS THAT MOVE YOU.</motion.p>
        <h1 aria-label="The art of stone">
          <Reveal delay={1.07}>THE ART</Reveal>
          <span className="hmd-hero-line-2"><Reveal delay={1.19}>OF <i>STONE.</i></Reveal></span>
        </h1>
        <div className="hmd-hero-bottom">
          <p>Beautifully considered surfaces.<br />Made for the spaces we live in.</p>
          <RoundLink to="/contact">EXPLORE YOUR PROJECT</RoundLink>
        </div>
      </motion.div>
      <div className="hmd-hero-edge">HMD / DESIGN-LED STONE SURFACES</div>
      <a className="hmd-hero-scroll" href="#manifesto" aria-label="Scroll to discover"><span>SCROLL TO EXPLORE</span><ArrowDown size={16} /></a>
      <motion.svg className="hmd-hero-vein" viewBox="0 0 360 600" fill="none" aria-hidden="true">
        <motion.path d="M20 -10 C130 80 50 140 175 216 S310 365 184 442 S216 530 320 630" stroke="currentColor" strokeWidth=".6" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: .65 }} transition={{ duration: 2.4, delay: 1.5, ease }} />
      </motion.svg>
    </section>
  );
}

function Marquee() {
  return <div className="hmd-marquee" aria-label="Quartz, marble, quartzite, granite">
    <div className="hmd-marquee-track" aria-hidden="true">
      {Array.from({ length: 4 }, (_, i) => <span key={i}>QUARTZ <b>✳</b> MARBLE <b>✳</b> QUARTZITE <b>✳</b> GRANITE <b>✳</b></span>)}
    </div>
  </div>;
}

function Manifesto({ image = IMAGES.detail }: { image?: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const reduced = useReducedMotion();
  const floatY = useTransform(scrollYProgress, [0, 1], [90, -110]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);
  return (
    <section id="manifesto" className="hmd-manifesto" ref={ref}>
      <div className="hmd-container">
        <div className="hmd-manifesto-top"><Overline>THE HMD PHILOSOPHY</Overline><span>01 / THE DIFFERENCE IS IN THE DETAILS</span></div>
        <div className="hmd-manifesto-grid">
          <div className="hmd-manifesto-head">
            <h2 className="hmd-display"><Reveal>NOT JUST</Reveal><Reveal delay={0.12}><i>A SURFACE.</i></Reveal><Reveal delay={0.24}>A FEELING.</Reveal></h2>
            <p>Stone has a presence. A way of catching the light, grounding a space, and quietly changing how it feels to be there.</p>
            <RoundLink to="/about">THE HMD APPROACH</RoundLink>
          </div>
          <motion.div className="hmd-manifesto-photo-frame" style={reduced ? undefined : { y: floatY }}>
            <motion.img src={image} alt="AI-generated stone material and design inspiration" loading="lazy" style={reduced ? undefined : { scale: imageScale }} />
            <span className="hmd-photo-index">FIG. 01 — THE MATERIAL EXPRESSION</span>
            <motion.span className="hmd-orbit-stamp" animate={reduced ? undefined : { rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>HMD STONE ✳ MADE TO MATTER ✳ </motion.span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Services({ condensed = false }: { condensed?: boolean }) {
  return (
    <section className="hmd-services" id="services">
      <div className="hmd-container">
        <div className="hmd-section-intro">
          <div><Overline light>WHAT WE DO</Overline><h2 className="hmd-display"><Reveal>CRAFTED FOR</Reveal><Reveal delay={0.12}><i>YOUR SPACE.</i></Reveal></h2></div>
          <p>From everyday countertops to unforgettable focal points. Explore the ways stone can transform your space.</p>
        </div>
        <div className="hmd-service-list">
          {SERVICES.map((service) => (
            <Link to="/contact" className="hmd-service-row" key={service.no}>
              <span className="hmd-service-no">{service.no} / 04</span>
              <div><h3>{service.name}</h3><p>{service.description}</p></div>
              <span className="hmd-service-detail">{service.detail}</span>
              <span className="hmd-service-arrow"><ArrowUpRight size={25} strokeWidth={1.25} /></span>
            </Link>
          ))}
        </div>
        {!condensed && <div className="hmd-services-bottom"><span>THE DETAILS MAKE THE DESIGN.</span><RoundLink to="/contact" light>START A PROJECT</RoundLink></div>}
      </div>
    </section>
  );
}

function MaterialExplorer({ fullPage = false }: { fullPage?: boolean }) {
  const [chosen, setChosen] = useState<MaterialId>("marble");
  const current = MATERIALS.find((material) => material.id === chosen)!;
  const reduced = useReducedMotion();
  return (
    <section id="materials" className={"hmd-materials " + (fullPage ? "hmd-materials-full" : "")}>
      <div className="hmd-container">
        <div className="hmd-materials-head">
          <div><Overline>THE MATERIAL LIBRARY</Overline><h2 className="hmd-display"><Reveal>NATURE'S</Reveal><Reveal delay={0.1}><i>PALETTE.</i></Reveal></h2></div>
          <p>Four different personalities. Endless ways to make a space your own. Select a surface to explore its character.</p>
        </div>
        <div className="hmd-material-stage">
          <div className="hmd-material-visual">
            <AnimatePresence mode="wait">
              <motion.div key={chosen} className={"hmd-slab hmd-slab-" + chosen}
                style={{ backgroundImage: `url(${MATERIAL_TEXTURES[chosen]})`, backgroundSize: "cover", backgroundPosition: "center" }}
                role="img" aria-label={`AI-generated ${current.name.toLowerCase()} surface study`}
                initial={reduced ? false : { opacity: 0, clipPath: "inset(0 100% 0 0)", scale: 1.08 }}
                animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)", scale: 1 }}
                exit={{ opacity: 0, clipPath: "inset(0 0 0 100%)", scale: 1.02 }}
                transition={{ duration: 0.8, ease }}>
                <div className="hmd-slab-sheen" />
              </motion.div>
            </AnimatePresence>
            <span className="hmd-slab-index">SURFACE STUDY / {current.no}</span>
            <span className="hmd-slab-concept">AI MATERIAL STUDY — NOT A PRODUCT SAMPLE</span>
          </div>
          <div className="hmd-material-controls">
            <div className="hmd-material-count">EXPLORE / 04 MATERIALS</div>
            <div role="group" aria-label="Select a countertop material" className="hmd-material-options">
              {MATERIALS.map((material) => (
                <button key={material.id} type="button" onClick={() => setChosen(material.id)}
                  className={"hmd-material-option " + (chosen === material.id ? "is-selected" : "")}
                  aria-pressed={chosen === material.id}>
                  <span className="hmd-material-option-num">{material.no}</span>
                  <span>{material.name}</span>
                  <ArrowUpRight size={20} strokeWidth={1.2} />
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div className="hmd-material-description" key={chosen}
                initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}>
                <span>{current.caption}</span>
                <h3>{current.mood}</h3>
                <p>{current.description}</p>
                <small>VISUAL DIRECTION: {current.surface}</small>
              </motion.div>
            </AnimatePresence>
            <RoundLink to="/contact">DISCUSS YOUR MATERIAL</RoundLink>
          </div>
        </div>
        {!fullPage && <p className="hmd-materials-footnote">A MATERIAL SHOULD MAKE YOU FEEL SOMETHING. <Link to="/materials">DISCOVER OUR MATERIALS <ArrowRight size={14} /></Link></p>}
      </div>
    </section>
  );
}

function LookbookPanel({ item, index }: { item: typeof LOOKBOOK[number]; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const px = useSpring(mouseX, { stiffness: 120, damping: 22 });
  const py = useSpring(mouseY, { stiffness: 120, damping: 22 });
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();
  return (
    <div className="hmd-look-panel" onMouseMove={event => {
      const bounds = event.currentTarget.getBoundingClientRect();
      mouseX.set(event.clientX - bounds.left);
      mouseY.set(event.clientY - bounds.top);
    }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="hmd-look-image">
        <img src={item.image} alt={item.alt} loading="lazy" />
        <div className="hmd-look-gradient" />
      </div>
      <div className="hmd-look-content">
        <span className="hmd-look-kicker">{item.no} / 04 — {item.kicker}</span>
        <h3>{item.title.split("\n").map((line, i) => <span key={line} className={i ? "hmd-look-italic" : ""}>{line}</span>)}</h3>
        <div className="hmd-look-bottom"><span>{item.category}</span><Link to="/contact">LET'S CREATE YOURS <ArrowUpRight size={17} /></Link></div>
      </div>
      <span className="hmd-look-watermark" aria-hidden="true">0{index + 1}</span>
      {!reduced && <motion.div className="hmd-cursor-view" style={{ x: px, y: py, opacity: hovered ? 1 : 0 }} aria-hidden="true">EXPLORE <ArrowUpRight size={14} /></motion.div>}
    </div>
  );
}

function Lookbook() {
  const section = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [desktop, setDesktop] = useState(() => window.innerWidth > 900);
  useEffect(() => {
    const resize = () => setDesktop(window.innerWidth > 900);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });
  return (
    <section id="lookbook" className="hmd-lookbook" ref={section}>
      <div className="hmd-look-sticky">
        <div className="hmd-look-header">
          <span>HMD STONE / INSPIRATION</span>
          <span>SPACE BY SPACE <ArrowRight size={16} /></span>
          <motion.div className="hmd-look-progress" style={{ scaleX: progress }} />
        </div>
        <motion.div className="hmd-look-track" style={desktop && !reduced ? { x } : undefined}>
          {LOOKBOOK.map((item, i) => <LookbookPanel item={item} index={i} key={item.no} />)}
        </motion.div>
        <span className="hmd-look-disclaimer">AI DESIGN INSPIRATION — NOT HMD STONE COMPLETED PROJECTS</span>
      </div>
    </section>
  );
}

function Process() {
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start 70%", "end 70%"] });
  const reduced = useReducedMotion();
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 22 });
  return (
    <section className="hmd-process" id="process" ref={section}>
      <div className="hmd-container">
        <div className="hmd-section-intro hmd-process-header">
          <div><Overline>THE JOURNEY</Overline><h2 className="hmd-display"><Reveal>FROM IDEA</Reveal><Reveal delay={0.14}><i>TO ICONIC.</i></Reveal></h2></div>
          <p>Good spaces don't happen by accident. They emerge from thoughtful choices, precise planning, and an eye for detail.</p>
        </div>
        <div className="hmd-process-timeline">
          <div className="hmd-process-line"><motion.div style={reduced ? { scaleY: 1 } : { scaleY }} /></div>
          {PROCESS.map((step) => <motion.div className="hmd-process-step" key={step.no}
            initial={reduced ? false : { opacity: .25, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.7, once: true }} transition={{ duration: .8, ease }}>
            <span>{step.no}</span><div><h3>{step.title}</h3><p>{step.detail}</p></div><ArrowDownRight size={25} strokeWidth={1.2} />
          </motion.div>)}
        </div>
      </div>
    </section>
  );
}

function Closing({ image = IMAGES.atmosphere }: { image?: string }) {
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start end", "end start"] });
  const reduced = useReducedMotion();
  const scale = useTransform(scrollYProgress, [0, 1], [1.22, 1]);
  return (
    <section className="hmd-closing" ref={section}>
      <motion.div className="hmd-closing-bg" style={reduced ? undefined : { scale }}><img src={image} alt="AI-generated stone interior inspiration" loading="lazy" /></motion.div>
      <div className="hmd-closing-overlay" />
      <div className="hmd-container hmd-closing-copy">
        <Overline light>YOUR NEXT CHAPTER BEGINS HERE</Overline>
        <h2><Reveal>LET'S MAKE</Reveal><Reveal delay={0.12}><i>IT MATTER.</i></Reveal></h2>
        <p>Tell us what you're imagining. We'll start with a conversation.</p>
        <RoundLink to="/contact" light>START YOUR PROJECT</RoundLink>
      </div>
    </section>
  );
}

function Footer() {
  return <footer className="hmd-footer"><div className="hmd-container">
    <div className="hmd-footer-top"><p>EXTRAORDINARY SPACES START WITH<br />THE RIGHT SURFACE.</p><Link to="/contact">LET'S TALK <ArrowUpRight size={19} /></Link></div>
    <Link to="/" className="hmd-footer-wordmark" aria-label="HMD Stone home">HMD<span>STONE</span></Link>
    <div className="hmd-footer-bottom"><span>© {new Date().getFullYear()} HMD STONE</span><span>COUNTERTOPS & STONE INSTALLATION</span><Link to="/contact">BEGIN A PROJECT <ArrowUpRight size={13} /></Link></div>
  </div></footer>;
}

function Shell({ children }: { children: ReactNode }) {
  return <div className="hmd-site"><ScrollRestoration /><Nav />{children}<Footer /></div>;
}

export function Home() {
  return <Shell><Intro /><main><Hero /><Marquee /><Manifesto /><Services /><MaterialExplorer /><Lookbook /><Process /><Closing /></main></Shell>;
}

function InteriorHero({ eyebrow, first, second, description }: { eyebrow: string; first: string; second: string; description: string }) {
  return <section className="hmd-interior-hero"><div className="hmd-container">
    <Overline light>{eyebrow}</Overline>
    <h1 className="hmd-display"><Reveal>{first}</Reveal><Reveal delay={0.14}><i>{second}</i></Reveal></h1>
    <p>{description}</p>
    <div className="hmd-interior-number">HMD / STONE STUDIO</div>
  </div></section>;
}

export function ServicesPage() {
  return <Shell><main><InteriorHero eyebrow="WHAT WE CAN CREATE" first="STONE FOR" second="LIVING." description="Explore installation services shaped around real spaces, real routines, and individual design ideas." /><Services condensed /><Process /><Closing image={IMAGES.installation} /></main></Shell>;
}

export function MaterialsPage() {
  return <Shell><main><InteriorHero eyebrow="A WORLD OF MATERIALS" first="LET STONE" second="SPEAK." description="Every material has a character. Explore what makes each surface unique and find a direction that feels like yours." /><MaterialExplorer fullPage /><Closing image={IMAGES.charcoal} /></main></Shell>;
}

export function AboutPage() {
  return <Shell><main><InteriorHero eyebrow="INTRODUCING HMD STONE" first="THE ART IS" second="IN THE DETAIL." description="A countertop shouldn't simply fill a space. It should elevate it." />
    <section className="hmd-about-story"><div className="hmd-container hmd-about-grid"><Overline>OUR POINT OF VIEW</Overline><div><h2><Reveal>LESS ORDINARY.</Reveal><Reveal><i>MORE YOU.</i></Reveal></h2><p>HMD Stone is a countertop and stone-installation service with an appreciation for considered design. We believe the best surface is one that belongs to the architecture, responds to the way you live, and feels right long after the first impression.</p><p>Whether you're planning a new kitchen, refreshing a bathroom, or imagining a statement feature, the starting point is the same: listen, explore the possibilities, and get the details right.</p><RoundLink to="/contact">TELL US YOUR IDEA</RoundLink></div></div></section>
    <Manifesto image={IMAGES.selection} /><Closing image={IMAGES.customStonework} />
  </main></Shell>;
}

const initialBrief = { name: "", email: "", service: "", material: "", timing: "", message: "" };

export function ContactPage() {
  const [brief, setBrief] = useState(initialBrief);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const briefText = [
    "HMD Stone — New Project Inquiry", "",
    "Name: " + brief.name,
    "Email: " + brief.email,
    "Project type: " + (brief.service || "To discuss"),
    "Material: " + (brief.material || "Open to recommendations"),
    "Timeline: " + (brief.timing || "To discuss"),
    "Project details: " + (brief.message || "Not specified"),
  ].join("\n");
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await navigator.clipboard.writeText(briefText);
      setCopied(true); setCopyError(false);
    } catch {
      setCopied(false); setCopyError(true);
    }
  };
  const change = (key: keyof typeof initialBrief, value: string) => {
    setBrief(old => ({ ...old, [key]: value }));
    setCopied(false); setCopyError(false);
  };
  return <Shell><main>
    <InteriorHero eyebrow="HAVE SOMETHING IN MIND?" first="LET'S START" second="SOMETHING." description="Tell us about the space you have in mind. A remarkable result starts with the right conversation." />
    <section className="hmd-contact-area"><div className="hmd-container hmd-contact-grid">
      <div className="hmd-contact-aside"><Overline>YOUR PROJECT BEGINS HERE</Overline><h2>GREAT SPACES<br /><i>START HERE.</i></h2><p>From the first material choice to the finishing detail, we're interested in what makes your project yours.</p><img className="hmd-contact-inspiration" src={IMAGES.vanityDetail} alt="AI-generated quartzite vanity design inspiration" loading="lazy" /><div className="hmd-contact-aside-note">01 / SHARE YOUR IDEA<br />02 / CHOOSE YOUR DIRECTION<br />03 / CONNECT WITH HMD STONE</div></div>
      <form className="hmd-contact-form" onSubmit={submit}>
        <p className="hmd-form-intro">A FEW DETAILS ABOUT YOUR PROJECT <span>✳</span></p>
        <div className="hmd-form-two">
          <label>Your name <input required autoComplete="name" placeholder="How should we address you?" value={brief.name} onChange={e => change("name", e.target.value)} /></label>
          <label>Email address <input required type="email" autoComplete="email" placeholder="you@example.com" value={brief.email} onChange={e => change("email", e.target.value)} /></label>
        </div>
        <label>What are you planning?<select value={brief.service} onChange={e => change("service", e.target.value)}><option value="">Select your project</option>{SERVICES.map(s => <option key={s.name}>{s.name}</option>)}</select></label>
        <div className="hmd-form-two">
          <label>Material preference<select value={brief.material} onChange={e => change("material", e.target.value)}><option value="">Let's explore</option>{MATERIALS.map(m => <option key={m.name}>{m.name}</option>)}</select></label>
          <label>Ideal timeline<select value={brief.timing} onChange={e => change("timing", e.target.value)}><option value="">Not sure yet</option><option>As soon as practical</option><option>Within 1–3 months</option><option>3+ months</option><option>Just exploring</option></select></label>
        </div>
        <label>Tell us your vision <textarea rows={4} placeholder="Dimensions, ideas, inspiration, or anything we should know..." value={brief.message} onChange={e => change("message", e.target.value)} /></label>
        <button type="submit" className="hmd-submit">{copied ? "PROJECT BRIEF COPIED" : "COPY MY PROJECT BRIEF"} {copied ? <Check size={18} /> : <Copy size={18} />}</button>
        {copied && <p className="hmd-form-feedback" role="status">Your brief is copied. Share it with HMD Stone through your preferred contact channel to request a quote.</p>}
        {copyError && <div className="hmd-copy-fallback" role="status"><p>Clipboard access isn't available here. Copy the text below and share it with HMD Stone:</p><textarea readOnly rows={10} value={briefText} onFocus={e => e.target.select()} /></div>}
        <p className="hmd-form-disclaimer">This site is currently a design preview. The form prepares and copies your inquiry; it does not send it or store personal data. Direct submissions will be connected once HMD Stone's verified contact details or CRM endpoint are provided.</p>
      </form>
    </div></section>
  </main></Shell>;
}
