import { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, Mail } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const SPOTLIGHT_R = 280;

/* ─── Cursor spotlight reveal layer ─────────────────────────────────────────
   Draws a blue grid that is only visible inside a soft spotlight that trails
   the cursor. Uses CSS radial-gradient as a mask directly on the div — no
   canvas.toDataURL() needed, so it's GPU-accelerated and runs at 60 fps.
   The lerp is driven by its own RAF loop so no React state is touched.     */
function RevealLayer() {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raw = { x: -SPOTLIGHT_R * 3, y: -SPOTLIGHT_R * 3 };
    const smooth = { x: raw.x, y: raw.y };
    let raf: number;
    let active = false;

    const onMove = (e: MouseEvent) => {
      raw.x = e.clientX;
      raw.y = e.clientY;
      active = true;
    };

    const tick = () => {
      smooth.x += (raw.x - smooth.x) * 0.1;
      smooth.y += (raw.y - smooth.y) * 0.1;

      if (divRef.current && active) {
        const { x, y } = smooth;
        const mask =
          `radial-gradient(circle ${SPOTLIGHT_R}px at ${x}px ${y}px,` +
          ` rgba(255,255,255,1) 0%,` +
          ` rgba(255,255,255,0.95) 30%,` +
          ` rgba(255,255,255,0.55) 60%,` +
          ` rgba(255,255,255,0.1) 85%,` +
          ` transparent 100%)`;
        divRef.current.style.maskImage = mask;
        (divRef.current.style as CSSStyleDeclaration & { webkitMaskImage: string }).webkitMaskImage = mask;
      }

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={divRef}
      className="absolute inset-0 pointer-events-none"
      style={{
        zIndex: 10,
        backgroundColor: "#091428",
        backgroundImage: [
          "linear-gradient(rgba(37,99,235,0.2) 1px, transparent 1px)",
          "linear-gradient(90deg, rgba(37,99,235,0.2) 1px, transparent 1px)",
        ].join(", "),
        backgroundSize: "56px 56px",
        maskImage: "none",
        WebkitMaskImage: "none",
      }}
    />
  );
}

/* ─── 3D particle constellation ─────────────────────────────────────────────
   120 particles arranged on a sphere, connected by lines when close.
   Slowly auto-rotates; tilts on X-axis in response to cursor position.      */
function Constellation() {
  const groupRef = useRef<THREE.Group>(null);
  const cursor = useRef({ x: 0, y: 0 });
  const smoothCursor = useRef({ x: 0, y: 0 });

  const COUNT = 120;
  const { pointsGeo, linesGeo, hasLines } = useMemo(() => {
    const pts: number[] = [];
    const cols: number[] = [];

    for (let i = 0; i < COUNT; i++) {
      const r = 1.8 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pts.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      );
      // 85% electric blue, 15% amber
      if (Math.random() < 0.15) {
        cols.push(0.96, 0.62, 0.04);   // #F59E0B
      } else {
        cols.push(0.38, 0.65, 0.98);   // #60A5FA
      }
    }

    const linePts: number[] = [];
    const THRESH = 1.05;
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        const dx = pts[i * 3] - pts[j * 3];
        const dy = pts[i * 3 + 1] - pts[j * 3 + 1];
        const dz = pts[i * 3 + 2] - pts[j * 3 + 2];
        if (dx * dx + dy * dy + dz * dz < THRESH * THRESH) {
          linePts.push(pts[i*3], pts[i*3+1], pts[i*3+2]);
          linePts.push(pts[j*3], pts[j*3+1], pts[j*3+2]);
        }
      }
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pts), 3));
    pGeo.setAttribute("color",    new THREE.BufferAttribute(new Float32Array(cols), 3));

    const lGeo = new THREE.BufferGeometry();
    const hasL = linePts.length > 0;
    if (hasL) {
      lGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(linePts), 3));
    }

    return { pointsGeo: pGeo, linesGeo: lGeo, hasLines: hasL };
  }, []);

  // Dispose geometries on unmount
  useEffect(() => {
    return () => {
      pointsGeo.dispose();
      linesGeo.dispose();
    };
  }, [pointsGeo, linesGeo]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursor.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      cursor.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.07;
    smoothCursor.current.x += (cursor.current.x - smoothCursor.current.x) * 0.03;
    smoothCursor.current.y += (cursor.current.y - smoothCursor.current.y) * 0.03;
    groupRef.current.rotation.x = smoothCursor.current.y * 0.22;
  });

  return (
    <group ref={groupRef}>
      <points geometry={pointsGeo}>
        <pointsMaterial
          size={0.046}
          vertexColors
          sizeAttenuation
          transparent
          opacity={0.88}
        />
      </points>
      {hasLines && (
        <lineSegments geometry={linesGeo}>
          <lineBasicMaterial color="#1D4ED8" transparent opacity={0.2} />
        </lineSegments>
      )}
    </group>
  );
}

/* ─── Hero section ───────────────────────────────────────────────────────── */
export function HeroSection() {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  const [first, second] = portfolioData.name.split(" ");

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden"
      style={{ height: "100dvh" }}
    >
      {/* ── Base dark background ── */}
      <div
        className="absolute inset-0 hero-zoom"
        style={{
          zIndex: 0,
          background: "#06080E",
          backgroundImage: [
            "radial-gradient(ellipse at 18% 65%, rgba(30,78,216,0.08) 0%, transparent 55%)",
            "radial-gradient(ellipse at 82% 22%, rgba(245,158,11,0.05) 0%, transparent 45%)",
          ].join(", "),
        }}
      />

      {/* ── Cursor spotlight grid layer ── */}
      <RevealLayer />

      {/* ── 3D constellation — right half on md+, full on mobile (hidden) ── */}
      <div
        className="absolute inset-0 md:left-[48%] pointer-events-none"
        style={{ zIndex: 20 }}
      >
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 52 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.7} />
          <pointLight position={[4, 4, 4]} intensity={0.3} />
          <Constellation />
        </Canvas>
      </div>

      {/* ── Text content ── */}
      <div
        className="relative h-full flex flex-col justify-center px-8 sm:px-14 md:px-20 lg:px-28"
        style={{ zIndex: 30, maxWidth: "min(52rem, 58vw)" }}
      >
        {/* Eyebrow */}
        <p
          className="hero-anim hero-fade font-mono-code uppercase tracking-widest mb-6 text-xs sm:text-sm"
          style={{ animationDelay: "0.15s", color: "#60A5FA" }}
        >
          {portfolioData.title}&nbsp;·&nbsp;Lahore, PK
        </p>

        {/* First name — solid */}
        <h1
          className="hero-anim hero-reveal font-syne font-black uppercase leading-none"
          style={{
            animationDelay: "0.28s",
            fontSize: "clamp(3.2rem, 9.5vw, 8.5rem)",
            letterSpacing: "-0.03em",
            color: "#F0F4FF",
          }}
        >
          {first}
        </h1>

        {/* Last name — outlined (the typographic risk) */}
        <h1
          className="hero-anim hero-reveal font-syne font-black uppercase leading-none mb-8"
          style={{
            animationDelay: "0.42s",
            fontSize: "clamp(3.2rem, 9.5vw, 8.5rem)",
            letterSpacing: "-0.03em",
            color: "transparent",
            WebkitTextStroke: "2px rgba(240,244,255,0.35)",
          }}
        >
          {second}
        </h1>

        {/* Tagline */}
        <p
          className="hero-anim hero-fade text-base sm:text-lg leading-relaxed max-w-sm"
          style={{ animationDelay: "0.65s", color: "#7B8EAF" }}
        >
          {portfolioData.tagline}
        </p>

        {/* CTAs */}
        <div
          className="hero-anim hero-fade flex flex-wrap gap-4 mt-10"
          style={{ animationDelay: "0.82s" }}
        >
          <motion.button
            onClick={() => scrollTo("#contact")}
            className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold bg-[#2563EB] text-white"
            whileHover={{ scale: 1.04, backgroundColor: "#1D4ED8" } as any}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <Mail className="h-4 w-4" />
            Get In Touch
          </motion.button>

          <a
            href="https://drive.google.com/file/d/1qqoUKRcYOTlxpXSWh4gq3qIWCb_ngdNI/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.button
              className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold"
              style={{
                border: "1px solid rgba(240,244,255,0.18)",
                color: "#F0F4FF",
              }}
              whileHover={{
                scale: 1.04,
                borderColor: "#2563EB",
                backgroundColor: "rgba(37,99,235,0.12)",
              } as any}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Download className="h-4 w-4" />
              Download CV
            </motion.button>
          </a>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <button
        onClick={() => scrollTo("#about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
        style={{ zIndex: 30, color: "#7B8EAF" }}
      >
        <span
          className="font-mono-code uppercase tracking-widest"
          style={{ fontSize: "10px" }}
        >
          Scroll
        </span>
        <ArrowDown className="h-4 w-4 animate-[scrollBounce_1.6s_ease-in-out_infinite]" />
      </button>
    </section>
  );
}
