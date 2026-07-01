import { useEffect, useRef, useState } from "react";

/* Premium custom cursor:
   – Small filled dot that snaps to cursor position exactly
   – Larger ring that trails behind (RAF lerp)
   – Ring scales up and turns cobalt when over any clickable element
   – Only active on fine-pointer (mouse) devices            */

export function GlobalCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const raw    = { x: -100, y: -100 };
    const smooth = { x: -100, y: -100 };
    let raf: number;

    const onMove = (e: MouseEvent) => {
      raw.x = e.clientX;
      raw.y = e.clientY;

      /* Snap the dot immediately */
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${raw.x}px, ${raw.y}px)`;
      }

      /* Detect hover over interactive elements */
      const target = e.target as Element;
      const clickable =
        target.matches("a, button, input, textarea, select, label, [role='button']") ||
        !!target.closest("a, button, [role='button']");
      setHovered(clickable);
    };

    const tick = () => {
      smooth.x += (raw.x - smooth.x) * 0.12;
      smooth.y += (raw.y - smooth.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${smooth.x}px, ${smooth.y}px)`;
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
    <>
      {/* Outer ring — trails behind */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          zIndex: 99999,
          width:  hovered ? 40 : 28,
          height: hovered ? 40 : 28,
          marginLeft: hovered ? -20 : -14,
          marginTop:  hovered ? -20 : -14,
          borderRadius: "50%",
          border: `1.5px solid ${hovered ? "rgba(37,99,235,0.7)" : "rgba(240,244,255,0.3)"}`,
          transition: "width 0.25s ease, height 0.25s ease, margin 0.25s ease, border-color 0.25s ease",
          willChange: "transform",
        }}
      />
      {/* Inner dot — snaps instantly */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          zIndex: 99999,
          width:  hovered ? 6 : 4,
          height: hovered ? 6 : 4,
          marginLeft: hovered ? -3 : -2,
          marginTop:  hovered ? -3 : -2,
          borderRadius: "50%",
          background: hovered ? "#2563EB" : "rgba(240,244,255,0.85)",
          transition: "width 0.2s ease, height 0.2s ease, margin 0.2s ease, background 0.2s ease",
          willChange: "transform",
        }}
      />
    </>
  );
}
