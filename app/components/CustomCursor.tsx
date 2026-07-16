"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

const interactiveSelector =
  "a, button, [role='button'], input, textarea, select, label";

export default function CustomCursor() {
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const springX = useSpring(pointerX, {
    stiffness: 700,
    damping: 45,
    mass: 0.15,
  });
  const springY = useSpring(pointerY, {
    stiffness: 700,
    damping: 45,
    mass: 0.15,
  });
  const cursorOpacity = useMotionValue(0);
  const cursorScale = useMotionValue(1);
  const springScale = useSpring(cursorScale, {
    stiffness: 520,
    damping: 32,
    mass: 0.16,
  });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const forcedColors = window.matchMedia("(forced-colors: active)");

    if (!finePointer.matches || forcedColors.matches || prefersReducedMotion) {
      return;
    }

    const root = document.documentElement;
    root.classList.add("custom-cursor-enabled");

    const handlePointerMove = (event: PointerEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      cursorOpacity.set(1);
    };

    const handlePointerOver = (event: PointerEvent) => {
      const target = event.target;
      const isOverInteractiveElement =
        target instanceof Element && Boolean(target.closest(interactiveSelector));

      cursorScale.set(isOverInteractiveElement ? 2.4 : 1);
    };

    const hideCursor = () => cursorOpacity.set(0);
    const handlePointerLeave = (event: MouseEvent) => {
      if (!event.relatedTarget) {
        hideCursor();
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerover", handlePointerOver, { passive: true });
    window.addEventListener("mouseout", handlePointerLeave);
    window.addEventListener("blur", hideCursor);

    return () => {
      root.classList.remove("custom-cursor-enabled");
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("mouseout", handlePointerLeave);
      window.removeEventListener("blur", hideCursor);
    };
  }, [cursorOpacity, cursorScale, pointerX, pointerY, prefersReducedMotion]);

  return (
    <motion.div
      aria-hidden="true"
      className="customCursor"
      style={{
        x: prefersReducedMotion ? pointerX : springX,
        y: prefersReducedMotion ? pointerY : springY,
        opacity: cursorOpacity,
        scale: prefersReducedMotion ? cursorScale : springScale,
      }}
    />
  );
}
