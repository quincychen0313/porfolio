"use client";

import { useEffect, useRef, useState } from "react";

type Language = "zh" | "en";

type SandParticle = {
  targetX: number;
  targetY: number;
  startX: number;
  startY: number;
  size: number;
  alpha: number;
  drift: number;
  phase: number;
  delay: number;
  arrival: number;
  tail: number;
};

const milestones = [
  {
    icon: "◇",
    title: { zh: "設計與視覺內容創作", en: "Design & Visual Content" },
    copy: {
      zh: "從版面、視覺語言到內容企劃，把抽象想法整理成清楚、有辨識度、能被理解的作品。",
      en: "From layout and visual language to content planning, I turn abstract ideas into clear, distinctive work people can understand.",
    },
  },
  {
    icon: "◉",
    title: { zh: "攝影與影像敘事", en: "Photography & Visual Storytelling" },
    copy: {
      zh: "用人像、場景與光影捕捉真實感，讓照片不只好看，也能承載個人風格與故事。",
      en: "I use portraits, places, and light to capture something real—images that carry both personal style and story.",
    },
  },
  {
    icon: "〈/〉",
    title: { zh: "AI 整合與 vibe coding", en: "AI Integration & Vibe Coding" },
    copy: {
      zh: "把 AI 導入設計、內容與開發流程，用 vibe coding 快速驗證想法，將創意做成能使用的成果。",
      en: "I bring AI into design, content, and development workflows, using vibe coding to rapidly turn ideas into usable outcomes.",
    },
  },
  {
    icon: "✦",
    title: { zh: "設計、AI 與英語教學", en: "Design, AI & English Education" },
    copy: {
      zh: "用清楚易懂的方式拆解複雜概念，教授設計、AI 整合、vibe coding 與英語。",
      en: "I make complex ideas approachable when teaching design, AI integration, vibe coding, and English.",
    },
  },
];

const works = [
  {
    image: "/work-codex.jpg",
    eyebrow: { zh: "AI 開發實戰", en: "AI Development" },
    title: { zh: "Codex 實作筆記", en: "Codex Field Notes" },
    copy: {
      zh: "關於 AI 工作流、AI Coding 與 SaaS 產品開發的實戰筆記。",
      en: "Practical notes on AI workflows, AI coding, and SaaS product development.",
    },
  },
  {
    image: "/work-company.jpg",
    eyebrow: { zh: "一人公司", en: "Solo Business" },
    title: { zh: "給新手 AI 一人公司實戰", en: "AI Solo Business for Beginners" },
    copy: {
      zh: "從內容、產品到自動化的完整路線，讓一個人也能把想法推進市場。",
      en: "A complete path from content and products to automation, helping one person bring an idea to market.",
    },
  },
  {
    image: "/work-codex.jpg",
    eyebrow: { zh: "生成式 AI", en: "Generative AI" },
    title: { zh: "產品化教學系列", en: "From Prototype to Product" },
    copy: {
      zh: "把原型變成真實產品，聚焦可維護的系統、流程與使用者體驗。",
      en: "Turning prototypes into real products with maintainable systems, workflows, and user experiences.",
    },
  },
];

const content = {
  zh: {
    languageLabel: "切換語言",
    role: "設計・攝影・AI 內容創作・教學",
    introOne: "擅長結合設計、攝影與 AI 進行內容創作，",
    introTwo: "並用清楚易懂的方式教授 設計、AI 整合、vibe coding 與英語。",
    viewWork: "看實戰成果",
    readBlog: "閱讀部落格",
    experienceLabel: "專業經歷",
    proof: ["TEDxNCU 講者", "技術書作者", "1,000+ 位學員", "15k+ Threads"],
    storyTitle: "我的故事",
    storySubtitle: "從設計與攝影出發，把 AI 變成創作與教學的方法",
    petLabel: "Vision Mate 舉手打招呼動畫角色",
    worksTitle: "精選作品",
    worksSubtitle: "已完成、已出版、已被真實使用的成果",
    previousWork: "上一個作品",
    nextWork: "下一個作品",
    visit: "了解更多",
    contactOne: "把夢想換成",
    contactTwo: "你的想法",
    startChat: "開始聊聊",
    scroll: "向下瀏覽",
  },
  en: {
    languageLabel: "Switch language",
    role: "Design · Photography · AI Content · Teaching",
    introOne: "I combine design, photography, and AI to create content,",
    introTwo: "and teach design, AI integration, vibe coding, and English in a clear, approachable way.",
    viewWork: "View selected work",
    readBlog: "Read the blog",
    experienceLabel: "Professional highlights",
    proof: ["TEDxNCU Speaker", "Technical Author", "1,000+ Students", "15k+ Threads"],
    storyTitle: "My Story",
    storySubtitle: "Starting with design and photography, I turn AI into a method for creating and teaching.",
    petLabel: "Vision Mate animated character waving hello",
    worksTitle: "Selected Work",
    worksSubtitle: "Finished, published, and used in the real world.",
    previousWork: "Previous work",
    nextWork: "Next work",
    visit: "Learn more",
    contactOne: "Turn dreams into",
    contactTwo: "your ideas",
    startChat: "Let's talk",
    scroll: "Scroll down",
  },
} as const;

function QVisionSparkIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path
        d="M24 3c1.8 12 8.2 18.2 21 21-12.8 2.8-19.2 9-21 21-1.8-12-8.2-18.2-21-21C15.8 21.2 22.2 15 24 3Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [progress, setProgress] = useState(0);
  const [activeWork, setActiveWork] = useState(0);
  const [introStep, setIntroStep] = useState(0);
  const [heroTextProgress, setHeroTextProgress] = useState(0);
  const [heroExit, setHeroExit] = useState(0);
  const [petWaving, setPetWaving] = useState(false);
  const [qVisionIntroPhase, setQVisionIntroPhase] = useState<"playing" | "leaving" | "done">("playing");
  const raf = useRef<number | null>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const storyPetRef = useRef<HTMLDivElement | null>(null);
  const text = content[language];

  useEffect(() => {
    const normalizedLocale = navigator.language.toLowerCase();
    const usesTaiwanTraditionalChinese = normalizedLocale === "zh-tw" || normalizedLocale === "zh-hant-tw";
    const localeFrame = requestAnimationFrame(() => {
      setLanguage(usesTaiwanTraditionalChinese ? "zh" : "en");
    });
    return () => cancelAnimationFrame(localeFrame);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-Hant-TW" : "en";
  }, [language]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const leaveIntro = window.setTimeout(
      () => setQVisionIntroPhase("leaving"),
      reducedMotion ? 220 : 2250,
    );
    const finishIntro = window.setTimeout(
      () => {
        setQVisionIntroPhase("done");
        document.body.style.overflow = previousOverflow;
      },
      reducedMotion ? 360 : 2950,
    );

    return () => {
      window.clearTimeout(leaveIntro);
      window.clearTimeout(finishIntro);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (qVisionIntroPhase !== "done") return;
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    const controlsIn = window.setTimeout(() => setIntroStep(1), 100);
    const contentIn = window.setTimeout(() => setIntroStep(2), 480);
    const introDone = window.setTimeout(() => setIntroStep(3), 2100);
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      const isMobile = window.innerWidth < 700;
      const convergenceEnd = window.innerHeight * (isMobile ? 2.5 : 3);
      const textStart = convergenceEnd;
      const textDistance = window.innerHeight * (isMobile ? 2 : 2.25);
      const textEnd = textStart + textDistance;
      const exitStart = textEnd + window.innerHeight * (isMobile ? 0.3 : 0.35);
      const exitDistance = window.innerHeight * (isMobile ? 1.05 : 1.3);
      setHeroTextProgress(Math.max(0, Math.min(1, (window.scrollY - textStart) / textDistance)));
      setHeroExit(Math.max(0, Math.min(1, (window.scrollY - exitStart) / exitDistance)));
      raf.current = null;
    };
    const onScroll = () => {
      if (raf.current === null) raf.current = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.clearTimeout(controlsIn);
      window.clearTimeout(contentIn);
      window.clearTimeout(introDone);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, [qVisionIntroPhase]);

  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let particles: SandParticle[] = [];
    let particleFrame = 0;
    let resizeTimer = 0;
    let disposed = false;
    const image = new window.Image();
    let drawParticles = () => {};
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const buildParticles = () => {
      if (disposed || !image.complete || image.naturalWidth === 0) return;
      const bounds = canvas.getBoundingClientRect();
      if (bounds.width < 2 || bounds.height < 2) return;

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(bounds.width * pixelRatio);
      canvas.height = Math.round(bounds.height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const isMobile = window.innerWidth < 700;
      // Sample close to the source image's native resolution so facial
      // features, fabric folds, hands, and accessories survive the particle
      // conversion instead of being averaged into larger blocks.
      const sampleWidth = isMobile ? 520 : 860;
      const sampleHeight = Math.round(sampleWidth * (image.naturalHeight / image.naturalWidth));
      // Keep the subject's proportions stable in short browser windows. Once
      // the viewport is shorter than this visual baseline, the portrait is
      // cropped vertically instead of being scaled down or squashed.
      const minimumPortraitHeight = isMobile ? 700 : 900;
      const availablePortraitHeight = Math.max(bounds.height, minimumPortraitHeight);
      const portraitScale = Math.min(bounds.width / sampleWidth, availablePortraitHeight / sampleHeight);
      const portraitWidth = sampleWidth * portraitScale;
      const portraitHeight = sampleHeight * portraitScale;
      const portraitOffsetX = (bounds.width - portraitWidth) * 0.5;
      const portraitOffsetY = (bounds.height - portraitHeight) * 0.5;
      const grainScale = Math.max(0.72, Math.min(1.45, portraitHeight / 900));
      const sampleCanvas = document.createElement("canvas");
      sampleCanvas.width = sampleWidth;
      sampleCanvas.height = sampleHeight;
      const sampleContext = sampleCanvas.getContext("2d", { willReadFrequently: true });
      if (!sampleContext) return;
      sampleContext.filter = "grayscale(1) contrast(1.18) brightness(1.12)";
      sampleContext.drawImage(image, 0, 0, sampleWidth, sampleHeight);
      const pixels = sampleContext.getImageData(0, 0, sampleWidth, sampleHeight).data;
      const upperBodyCandidates: SandParticle[] = [];
      const lowerBodyCandidates: SandParticle[] = [];
      const faceCandidates: SandParticle[] = [];
      const centerX = portraitOffsetX + portraitWidth * 0.5;
      const centerY = portraitOffsetY + portraitHeight * 0.5;
      const portraitRadius = Math.hypot(portraitWidth, portraitHeight) * 0.43;
      const maxUpperBodyParticles = isMobile ? 7000 : 17000;
      const maxLowerBodyParticles = isMobile ? 5500 : 12000;
      const maxFaceParticles = 29000;
      let acceptedUpperBodyCandidates = 0;
      let acceptedLowerBodyCandidates = 0;
      let acceptedFaceCandidates = 0;

      for (let y = 0; y < sampleHeight; y += 1) {
        for (let x = 0; x < sampleWidth; x += 1) {
          const pixelIndex = (y * sampleWidth + x) * 4;
          const brightness = (pixels[pixelIndex] + pixels[pixelIndex + 1] + pixels[pixelIndex + 2]) / 3;
          const normalizedX = x / sampleWidth;
          const normalizedY = y / sampleHeight;
          const isFaceZone = normalizedY > 0.045 && normalizedY < 0.265 && normalizedX > 0.29 && normalizedX < 0.71;
          const isHandZone = normalizedY > 0.335 && normalizedY < 0.49
            && ((normalizedX > 0.2 && normalizedX < 0.45) || (normalizedX > 0.55 && normalizedX < 0.8));
          const isFineDetailZone = isFaceZone || isHandZone;
          const isBodyDetailZone = normalizedY < 0.97 && normalizedX > 0.1 && normalizedX < 0.9;
          const samplingFloor = isFineDetailZone ? 0.96 : isBodyDetailZone ? 0.82 : 0.2;
          const samplingDivisor = isFineDetailZone ? 68 : isBodyDetailZone ? 82 : 128;
          const samplingChance = Math.min(0.995, Math.max(samplingFloor, brightness / samplingDivisor));
          if (brightness < (isFineDetailZone ? 2 : 4) || Math.random() > samplingChance) continue;

          const targetX = portraitOffsetX + normalizedX * portraitWidth;
          const targetY = portraitOffsetY + normalizedY * portraitHeight;
          const distanceFromCenter = Math.hypot(targetX - centerX, targetY - centerY);
          const targetDepth = Math.min(1, distanceFromCenter / portraitRadius);
          // Opening positions are fully independent from the portrait. This
          // guarantees the first frame is only a field of sand; the subject
          // exists visually only after the grains travel to their targets.
          const startX = bounds.width * (0.18 + Math.random() * 1.05);
          const startY = bounds.height * (-0.08 + Math.random() * 1.16);
          // The outside edge starts moving on the very first scroll input;
          // inner details retain a short stagger so the portrait still forms
          // from the outside toward the centre.
          const delay = Math.max(
            0,
            (1 - targetDepth) * 0.028 + Math.random() * 0.004 - 0.004,
          );
          const candidate: SandParticle = {
            targetX,
            targetY,
            startX,
            startY,
            size: (isFineDetailZone ? 0.11 + Math.random() * 0.3 : 0.15 + Math.random() * 0.42) * grainScale,
            alpha: Math.min(1, Math.max(isFineDetailZone ? 0.085 : 0.05, brightness / (isFineDetailZone ? 132 : 145))),
            drift: (10 + Math.random() * 28 + distanceFromCenter * 0.012) * grainScale,
            phase: Math.random() * Math.PI * 2,
            delay,
            arrival: Math.min(0.98, delay + 0.46 + Math.random() * 0.2),
            tail: isFaceZone || Math.random() > 0.16 ? 0 : (7 + Math.random() * 17) * grainScale,
          };

          const isUpperBody = normalizedY < 0.58;
          const bucket = isFaceZone ? faceCandidates : isUpperBody ? upperBodyCandidates : lowerBodyCandidates;
          const bucketLimit = isFaceZone ? maxFaceParticles : isUpperBody ? maxUpperBodyParticles : maxLowerBodyParticles;
          const acceptedCount = isFaceZone
            ? ++acceptedFaceCandidates
            : isUpperBody
              ? ++acceptedUpperBodyCandidates
              : ++acceptedLowerBodyCandidates;
          if (bucket.length < bucketLimit) {
            bucket.push(candidate);
          } else {
            const replacementIndex = Math.floor(Math.random() * acceptedCount);
            if (replacementIndex < bucketLimit) bucket[replacementIndex] = candidate;
          }
        }
      }

      particles = [...upperBodyCandidates, ...lowerBodyCandidates, ...faceCandidates];

      cancelAnimationFrame(particleFrame);
      particleFrame = 0;

      drawParticles = () => {
        if (disposed) return;
        const convergenceDistance = window.innerHeight * (window.innerWidth < 700 ? 2.5 : 3);
        const rawProgress = Math.max(0, window.scrollY / convergenceDistance);
        // Keep the top frame empty, then give the first scroll input a tiny
        // head start so every device shows visible grains immediately.
        const adjusted = reducedMotion
          ? 1
          : rawProgress <= 0
            ? 0
            : Math.min(1, 0.032 + rawProgress * 0.968);
        context.clearRect(0, 0, bounds.width, bounds.height);
        context.fillStyle = "#f7f3ea";

        for (const particle of particles) {
          const localProgress = Math.max(0, Math.min(1, (adjusted - particle.delay) / (particle.arrival - particle.delay)));
          const smoothProgress = localProgress * localProgress * localProgress * (localProgress * (localProgress * 6 - 15) + 10);
          const localEased = localProgress * 0.18 + smoothProgress * 0.82;
          const arc = Math.sin(localProgress * Math.PI);
          const flutter = Math.sin(particle.phase + localProgress * 7.4) * particle.drift * arc;
          const cross = Math.cos(particle.phase + localProgress * 5.6) * particle.drift * 0.62 * arc;
          const x = particle.startX + (particle.targetX - particle.startX) * localEased + flutter;
          const y = particle.startY + (particle.targetY - particle.startY) * localEased + cross;
          const inwardX = particle.targetX - x;
          const inwardY = particle.targetY - y;
          const inwardLength = Math.max(1, Math.hypot(inwardX, inwardY));
          const trailStrength = Math.sin(localProgress * Math.PI);

          if (trailStrength > 0.04 && particle.tail > 0.5) {
            const unitX = inwardX / inwardLength;
            const unitY = inwardY / inwardLength;
            context.globalAlpha = particle.alpha * trailStrength * 0.2;
            context.fillRect(x - unitX * particle.tail, y - unitY * particle.tail, particle.size * 0.72, particle.size * 0.72);
            context.globalAlpha = particle.alpha * trailStrength * 0.1;
            context.fillRect(x - unitX * particle.tail * 1.75, y - unitY * particle.tail * 1.75, particle.size * 0.5, particle.size * 0.5);
          }

          context.globalAlpha = localProgress <= 0 ? 0 : particle.alpha * (0.12 + localEased * 0.88);
          const stretch = 1 + Math.sin(localProgress * Math.PI) * 1.8;
          context.fillRect(x, y, particle.size * stretch, particle.size);
        }

        context.globalAlpha = 1;
      };

      drawParticles();
    };

    image.onload = buildParticles;
    image.src = "/hero-sand-ray.png";
    // Cached images can already be complete before the load callback is
    // observed after a refresh or hot reload. Build once explicitly so the
    // particle canvas can never remain blank in that case.
    if (image.complete && image.naturalWidth > 0) {
      requestAnimationFrame(buildParticles);
    }
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(buildParticles, 180);
    };
    const resizeObserver = typeof ResizeObserver === "undefined"
      ? null
      : new ResizeObserver(onResize);
    resizeObserver?.observe(canvas);
    const onParticleScroll = () => {
      if (particleFrame) return;
      particleFrame = requestAnimationFrame(() => {
        particleFrame = 0;
        if (!disposed && image.complete) drawParticles();
      });
    };
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("scroll", onParticleScroll, { passive: true });

    return () => {
      disposed = true;
      cancelAnimationFrame(particleFrame);
      window.clearTimeout(resizeTimer);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onParticleScroll);
    };
  }, []);

  useEffect(() => {
    const pet = storyPetRef.current;
    if (!pet || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(([entry]) => {
      setPetWaving(entry.isIntersecting);
    }, { threshold: 0.18 });

    observer.observe(pet);
    return () => observer.disconnect();
  }, []);

  const moveWork = (direction: number) => {
    setActiveWork((current) => (current + direction + works.length) % works.length);
  };

  const animatedHeroLineCount = 7;
  const getHeroLineProgress = (index: number) => index === 0
    ? 1
    : Math.max(0, Math.min(1, heroTextProgress * animatedHeroLineCount - (index - 1)));
  const heroLineStyle = (index: number) => {
    const lineProgress = getHeroLineProgress(index);
    return {
      "--line-progress": lineProgress,
      visibility: lineProgress > 0 ? "visible" : "hidden",
    } as React.CSSProperties;
  };
  const heroLineClass = (index: number, base = "") => {
    const lineProgress = getHeroLineProgress(index);
    return `${base}${base ? " " : ""}hero-typed-line${lineProgress > 0 && lineProgress < 1 ? " is-typing" : ""}`;
  };

  return (
    <main className={`portfolio intro-step-${introStep}`} style={{ "--page-progress": progress } as React.CSSProperties}>
      {qVisionIntroPhase !== "done" && (
        <div
          className={`qvision-intro${qVisionIntroPhase === "leaving" ? " is-leaving" : ""}`}
          aria-hidden="true"
        >
          <div className="qvision-intro-flare" />
          <div className="qvision-intro-brand">
            <span className="qvision-intro-symbol"><QVisionSparkIcon /></span>
            <span className="qvision-intro-word">qVsion</span>
          </div>
          <div className="qvision-intro-line"><i /></div>
          <span className="qvision-intro-caption">AI CREATIVE STUDIO</span>
        </div>
      )}
      <div className="screen-lines" aria-hidden="true" />
      <div className="intro-scan" aria-hidden="true" />
      <div className="progress-track" aria-hidden="true">
        <span style={{ height: `${Math.max(progress * 100, 7)}%` }} />
      </div>
      <div className="language-toggle" role="group" aria-label={text.languageLabel}>
        <button type="button" className={language === "zh" ? "is-active" : ""} aria-pressed={language === "zh"} onClick={() => setLanguage("zh")}>中</button>
        <span aria-hidden="true">/</span>
        <button type="button" className={language === "en" ? "is-active" : ""} aria-pressed={language === "en"} onClick={() => setLanguage("en")}>EN</button>
      </div>
      <section className="hero" id="top">
        <div
          className="cloud-wrap"
          aria-hidden="true"
          style={{
            transform: `translate3d(${heroExit * 125}vw, 0, 0) scale(${1 - heroExit * 0.08})`,
            opacity: 1 - heroExit,
            filter: `blur(${heroExit * 6}px)`,
          }}
        >
          <canvas ref={particleCanvasRef} className="particle-canvas" />
        </div>
        <div className="hero-copy">
          <p className={heroLineClass(0, "eyebrow")} style={heroLineStyle(0)}>/ Portfolio</p>
          <h1 className={heroLineClass(1)} style={heroLineStyle(1)}>Quincy Chen</h1>
          <p className={heroLineClass(2, "real-name")} style={heroLineStyle(2)}>陳宏瑋</p>
          <p className={heroLineClass(3, "role")} style={heroLineStyle(3)}>{text.role}</p>
          <p
            className="intro"
            style={{ borderLeftColor: `rgba(100, 100, 97, ${Math.max(getHeroLineProgress(4), getHeroLineProgress(5))})` }}
          >
            <span className={heroLineClass(4)} style={heroLineStyle(4)}>{text.introOne}</span>
            <span className={heroLineClass(5)} style={heroLineStyle(5)}>{text.introTwo}</span>
          </p>
          <div className={heroLineClass(6, "hero-actions")} style={heroLineStyle(6)}>
            <a className="button button-light" href="#works">{text.viewWork} <span>↓</span></a>
            <a className="button button-dark" href="#story">▤&nbsp; {text.readBlog}</a>
          </div>
          <div className={heroLineClass(7, "mini-proof")} style={heroLineStyle(7)} aria-label={text.experienceLabel}>
            {text.proof.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
      </section>

      <section className="story section-grid" id="story">
        <div className="section-heading">
          <p className="eyebrow">/ Beyond the Code</p>
          <h2>{text.storyTitle}</h2>
          <p>{text.storySubtitle}</p>
        </div>
        <div ref={storyPetRef} className="story-pet-stage" role="img" aria-label={text.petLabel}>
          <div
            className={`story-pet-sprite${petWaving ? " is-waving" : ""}`}
            aria-hidden="true"
            onPointerEnter={() => setPetWaving(true)}
            onAnimationEnd={() => setPetWaving(false)}
          />
        </div>
        <div className="timeline">
          {milestones.map((item) => (
            <article className="milestone" key={item.title.zh}>
              <div className="milestone-icon" aria-hidden="true">{item.icon}</div>
              <div>
                <h3>{item.title[language]}</h3>
                <p>{item.copy[language]}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="works" id="works">
        <div className="section-heading works-heading">
          <p className="eyebrow">/ Selected Work</p>
          <h2>{text.worksTitle}</h2>
          <p>{text.worksSubtitle}</p>
        </div>

        <div className="work-stage">
          <button className="work-arrow previous" onClick={() => moveWork(-1)} aria-label={text.previousWork}>←</button>
          <article className="work-card" key={activeWork}>
            <div className="work-image-shell">
              <img src={works[activeWork].image} alt="" />
            </div>
            <div className="work-caption">
              <p>{works[activeWork].eyebrow[language]}</p>
              <h3>{works[activeWork].title[language]}</h3>
              <span>{works[activeWork].copy[language]}</span>
            </div>
          </article>
          <button className="work-arrow next" onClick={() => moveWork(1)} aria-label={text.nextWork}>→</button>
        </div>

        <div className="work-controls">
          <button onClick={() => moveWork(-1)} aria-label={text.previousWork}>←</button>
          <a href="#contact">{text.visit} ↗</a>
          <button onClick={() => moveWork(1)} aria-label={text.nextWork}>→</button>
        </div>
      </section>

      <section className="contact" id="contact">
        <p className="eyebrow">/ Let&apos;s build something</p>
        <h2>{text.contactOne}<br />{text.contactTwo}</h2>
        <a className="button button-light" href="mailto:hello@example.com">{text.startChat} ↗</a>
        <p className="footer-note">QUINCY CHEN © 2026</p>
      </section>

      <a className="scroll-wheel" href="#works" aria-label={text.scroll}>
        <span>↓</span>
        <small>{language === "zh" ? "向下瀏覽" : "SCROLL DOWN"}</small>
      </a>
    </main>
  );
}
