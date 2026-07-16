"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const scrambleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

type ScrambleTextProps = {
  text: string;
  duration?: number;
};

export default function ScrambleText({
  text,
  duration = 1100,
}: ScrambleTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const timerRef = useRef<number | null>(null);

  const startScramble = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
    }

    if (prefersReducedMotion) {
      setDisplayText(text);
      setIsScrambling(false);
      return;
    }

    const frameDuration = 32;
    const totalFrames = Math.max(1, Math.ceil(duration / frameDuration));
    let frame = 0;

    setIsScrambling(true);

    timerRef.current = window.setInterval(() => {
      frame += 1;
      const revealedCharacters = Math.floor((frame / totalFrames) * text.length);

      setDisplayText(
        [...text]
          .map((character, index) => {
            if (character === " " || character === ".") {
              return character;
            }

            if (index < revealedCharacters) {
              return character;
            }

            return scrambleCharacters[
              Math.floor(Math.random() * scrambleCharacters.length)
            ];
          })
          .join(""),
      );

      if (frame >= totalFrames) {
        if (timerRef.current !== null) {
          window.clearInterval(timerRef.current);
          timerRef.current = null;
        }

        setDisplayText(text);
        setIsScrambling(false);
      }
    }, frameDuration);
  }, [duration, prefersReducedMotion, text]);

  useEffect(() => {
    const initialAnimationFrame = window.requestAnimationFrame(startScramble);

    return () => {
      window.cancelAnimationFrame(initialAnimationFrame);

      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [startScramble]);

  return (
    <motion.span
      aria-hidden="true"
      className="scrambleText"
      onHoverStart={startScramble}
      animate={{
        opacity: isScrambling ? 0.82 : 1,
      }}
      transition={{ duration: 0.14 }}
    >
      {displayText}
    </motion.span>
  );
}
