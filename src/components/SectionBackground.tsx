import { useEffect, useRef } from "react";

/* Shared animated section background:
   - Subtle dot grid
   - Two blurred gradient orbs that slowly follow the mouse
   Runs entirely via RAF + direct DOM refs — zero React re-renders. */

interface Props {
  orbColor?: string;
}

export function SectionBackground({ orbColor = "#2563EB" }: Props) {
  const orb1 = useRef<HTMLDivElement>(null);
  const orb2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raw = { x: 0.5, y: 0.5 };
    const smooth = { x: 0.5, y: 0.5 };
    let raf: number;

    const onMove = (e: MouseEvent) => {
      raw.x = e.clientX / window.innerWidth;
      raw.y = e.clientY / window.innerHeight;
    };

    const tick = () => {
      smooth.x += (raw.x - smooth.x) * 0.028;
      smooth.y += (raw.y - smooth.y) * 0.028;

      const dx = (smooth.x - 0.5) * 70;
      const dy = (smooth.y - 0.5) * 50;

      if (orb1.current) {
        orb1.current.style.transform = `translate(${dx}px, ${dy}px)`;
      }
      if (orb2.current) {
        orb2.current.style.transform = `translate(${-dx * 0.55}px, ${-dy * 0.55}px)`;
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
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      style={{ zIndex: 0 }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(rgba(37,99,235,0.22) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Orb 1 — cobalt, top-left */}
      <div
        ref={orb1}
        className="absolute"
        style={{
          top: "-15%",
          left: "-8%",
          width: "65%",
          paddingBottom: "55%",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${orbColor}30 0%, ${orbColor}10 40%, transparent 70%)`,
          filter: "blur(56px)",
          willChange: "transform",
        }}
      />

      {/* Orb 2 — amber, bottom-right */}
      <div
        ref={orb2}
        className="absolute"
        style={{
          bottom: "-15%",
          right: "-8%",
          width: "60%",
          paddingBottom: "50%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,158,11,0.18) 0%, rgba(245,158,11,0.06) 40%, transparent 70%)",
          filter: "blur(56px)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
