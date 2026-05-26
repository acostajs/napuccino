import type React from "react";
import type { HTMLAttributes } from "react";

type DoodleProps = HTMLAttributes<HTMLDivElement> & { className?: string };

export function CoffeeRing({ className = "", ...props }: DoodleProps): React.ReactElement {
  return (
    <div className={`pointer-events-none select-none ${className}`} {...props}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full text-primary/10 dark:text-primary/10 transition-colors duration-300"
      >
        <title>Coffee Ring doodle</title>
        <path
          d="M 50, 10 C 75, 12 92, 28 90, 50 C 88, 72 70, 90 50, 90 C 28, 88 10, 72 10, 50 C 12, 28 25, 12 50, 10 Z"
          strokeDasharray="95 5 45 3"
        />
        <path
          d="M 52, 13 C 72, 16 87, 30 86, 48 C 85, 66 69, 83 51, 84 C 33, 83 18, 68 17, 50 C 18, 32 32, 15 52, 13 Z"
          opacity="0.65"
          strokeDasharray="3 3 15 2"
        />
        <circle cx="25" cy="78" r="2.5" fill="currentColor" opacity="0.6" />
        <circle cx="78" cy="22" r="1.5" fill="currentColor" opacity="0.5" />
        <circle cx="48" cy="88" r="1" fill="currentColor" opacity="0.4" />
      </svg>
    </div>
  );
}

export function SleepingSloth({ className = "", ...props }: DoodleProps): React.ReactElement {
  return (
    <div className={`pointer-events-none select-none ${className}`} {...props}>
      <svg
        viewBox="0 0 120 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full text-accent/15 dark:text-accent/15 transition-colors duration-300"
      >
        <title>Sleeping Sloth illustration</title>
        {/* Tree branch */}
        <path d="M 10,60 Q 60,55 110,65" strokeWidth="2.5" />
        <path d="M 90,58 Q 95,45 105,40" strokeWidth="1.2" />
        {/* Branch leaves */}
        <path d="M 105,40 Q 110,35 108,32 Q 103,35 105,40 Z" fill="currentColor" opacity="0.15" />
        <path d="M 98,48 Q 105,48 103,45 Q 98,45 98,48 Z" fill="currentColor" opacity="0.15" />

        {/* Sloth body hanging below branch */}
        {/* Head */}
        <circle cx="42" cy="72" r="11" />
        {/* Face mask sketch */}
        <path d="M 33,72 Q 42,75 51,72" opacity="0.65" />
        <circle cx="36" cy="72" r="1" fill="currentColor" />
        <circle cx="48" cy="72" r="1" fill="currentColor" />
        {/* Sleeping eyelids */}
        <path d="M 34,71 Q 37,73 39,71" strokeWidth="0.8" />
        <path d="M 45,71 Q 47,73 49,71" strokeWidth="0.8" />
        {/* Cute smile */}
        <path d="M 40,77 Q 42,79 44,77" strokeWidth="0.8" />

        {/* Sloth wobbly back/tummy */}
        <path d="M 53,72 C 65,75 85,70 85,58 C 85,48 70,45 53,48" strokeWidth="2.2" />

        {/* Curved wobbly legs hanging onto branch */}
        {/* Front arm */}
        <path d="M 48,58 C 48,50 35,46 38,58" />
        {/* Back arm */}
        <path d="M 44,58 C 44,52 38,48 40,58" opacity="0.65" />
        {/* Front leg */}
        <path d="M 75,58 C 75,48 85,45 82,58" />
        {/* Back leg */}
        <path d="M 79,58 C 79,50 87,48 85,58" opacity="0.65" />

        {/* zZz rising */}
        <path d="M 23,45 L 27,45 L 23,49 L 27,49" strokeWidth="0.8" opacity="0.5" />
        <path d="M 15,30 L 21,30 L 15,36 L 21,36" strokeWidth="1.2" opacity="0.75" />
      </svg>
    </div>
  );
}

export function ZZzCloud({ className = "", ...props }: DoodleProps): React.ReactElement {
  return (
    <div className={`pointer-events-none select-none ${className}`} {...props}>
      <svg
        viewBox="0 0 100 80"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full text-accent/15 dark:text-accent/15 transition-colors duration-300"
      >
        <title>Sleeping Cloud doodle</title>
        <path
          d="M 25,55 C 10,55 10,40 22,35 C 18,20 38,15 48,25 C 55,10 75,12 75,28 C 88,28 88,45 78,50 C 82,62 65,65 55,58 C 45,68 28,65 25,55 Z"
          fill="currentColor"
          fillOpacity="0.02"
        />
        {/* Sleepy eyes */}
        <path d="M 38,38 Q 41,41 44,38" strokeWidth="1.2" />
        <path d="M 52,38 Q 55,41 58,38" strokeWidth="1.2" />
        <path d="M 46,45 Q 48,47 50,45" strokeWidth="1" />

        {/* zZz floating up */}
        <path d="M 68,20 Q 75,12 82,18" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.4" />
        <text
          x="75"
          y="15"
          fontFamily="sans-serif"
          fontSize="9"
          fontWeight="bold"
          fill="currentColor"
          opacity="0.7"
          transform="rotate(10 75 15)"
        >
          z
        </text>
        <text
          x="83"
          y="9"
          fontFamily="sans-serif"
          fontSize="12"
          fontWeight="bold"
          fill="currentColor"
          opacity="0.85"
          transform="rotate(15 83 9)"
        >
          Z
        </text>
      </svg>
    </div>
  );
}

export function CrescentMoon({ className = "", ...props }: DoodleProps): React.ReactElement {
  return (
    <div className={`pointer-events-none select-none ${className}`} {...props}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full text-accent/15 dark:text-accent/15 transition-colors duration-300"
      >
        <title>Sleeping Crescent Moon doodle</title>
        <path
          d="M 50,15 C 28,15 20,38 25,62 C 30,80 50,85 70,80 C 50,78 40,60 45,40 C 48,28 58,20 70,18 C 63,16 56,15 50,15 Z"
          fill="currentColor"
          fillOpacity="0.02"
        />

        {/* Night cap */}
        <path d="M 50,15 C 52,8 65,2 72,12 C 70,14 62,13 54,17" />
        <circle cx="72" cy="11" r="2.5" fill="currentColor" />

        {/* Closed eye */}
        <path d="M 33,48 C 36,51 39,51 42,48" strokeWidth="1.5" />
        <path d="M 32,46 L 30,49" strokeWidth="0.8" />
        <path d="M 43,46 L 45,49" strokeWidth="0.8" />

        {/* Smiling mouth */}
        <path d="M 35,56 Q 37,58 39,55" strokeWidth="1" />

        {/* zZz rising */}
        <text x="56" y="41" fontFamily="sans-serif" fontSize="9" fontWeight="bold" fill="currentColor" opacity="0.65">
          z
        </text>
        <text x="64" y="30" fontFamily="sans-serif" fontSize="13" fontWeight="bold" fill="currentColor" opacity="0.8">
          Z
        </text>

        {/* Tiny stars */}
        <path
          d="M 15,25 L 16.5,27 L 19,27 L 17,28.5 L 18,31 L 15,29.5 L 12,31 L 13,28.5 L 11,27 L 13.5,27 Z"
          fill="currentColor"
          opacity="0.35"
        />
        <path
          d="M 80,65 L 81,66.5 L 83,66.5 L 81.5,67.5 L 82,69.5 L 80,68.5 L 78,69.5 L 78.5,67.5 L 77,66.5 L 79,66.5 Z"
          fill="currentColor"
          opacity="0.25"
        />
      </svg>
    </div>
  );
}

export function CoffeeBeans({ className = "", ...props }: DoodleProps): React.ReactElement {
  return (
    <div className={`pointer-events-none select-none ${className}`} {...props}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full text-primary/10 dark:text-primary/10 transition-colors duration-300"
      >
        <title>Coffee Beans doodle</title>
        {/* Bean 1 */}
        <g transform="translate(15, 20) rotate(-25)">
          <path d="M 10,25 C 5,12 25,5 30,15 C 35,28 15,35 10,25 Z" fill="currentColor" fillOpacity="0.02" />
          <path d="M 11,23 C 14,21 21,17 29,13" strokeWidth="1.2" strokeDasharray="1.5 1" />
        </g>
        {/* Bean 2 */}
        <g transform="translate(62, 45) rotate(35)">
          <path d="M 8,20 C 3,10 20,3 25,12 C 30,22 13,30 8,20 Z" fill="currentColor" fillOpacity="0.02" />
          <path d="M 9,18 C 12,16 17,13 24,9" strokeWidth="1" strokeDasharray="2 1" />
        </g>
        {/* Bean 3 */}
        <g transform="translate(25, 65) rotate(10)">
          <path d="M 10,22 C 5,11 22,4 27,13 C 32,24 15,31 10,22 Z" fill="currentColor" fillOpacity="0.02" />
          <path d="M 11,20 C 14,18 20,15 26,11" strokeWidth="1.2" />
        </g>
      </svg>
    </div>
  );
}
