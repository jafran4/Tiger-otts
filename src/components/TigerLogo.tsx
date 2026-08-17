import React from "react";

interface TigerLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "hero";
  glow?: boolean;
}

export const TigerLogo: React.FC<TigerLogoProps> = ({
  className = "",
  size = "md",
  glow = true,
}) => {
  // Height & scale presets
  const sizeClasses = {
    sm: "h-6 sm:h-7",
    md: "h-8 sm:h-10",
    lg: "h-11 sm:h-14",
    xl: "h-14 sm:h-18",
    hero: "h-16 sm:h-24 md:h-28",
  };

  return (
    <div
      className={`inline-flex items-center select-none ${sizeClasses[size]} ${className} ${
        glow ? "drop-shadow-[0_0_14px_rgba(255,230,0,0.45)]" : ""
      } transition-transform duration-200`}
      aria-label="TIGER OTT"
    >
      <svg
        viewBox="0 0 540 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto max-w-full overflow-visible"
      >
        <defs>
          <linearGradient id="tigerYellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF200" />
            <stop offset="60%" stopColor="#FFE000" />
            <stop offset="100%" stopColor="#FFCC00" />
          </linearGradient>
          <filter id="yellowGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g fill="url(#tigerYellowGrad)">
          {/* === T with Tiger Claws / Speed Streaks === */}
          {/* Top Left Speed Claws */}
          <path d="M125 18 L195 18 L188 38 L142 38 L137 54 L175 54 L168 74 L131 74 L114 128 L82 128 L101 74 L88 74 L70 96 L82 74 L60 74 L40 92 L54 62 L32 62 L15 78 L28 48 L118 48 L125 18 Z" />
          
          {/* Extra Speed Slash Details for claw effect on left */}
          <path d="M4 88 L38 52 L18 84 L4 88 Z" />
          <path d="M22 108 L52 74 L32 102 L22 108 Z" />
          <path d="M42 126 L68 94 L50 120 L42 126 Z" />
          <polygon points="58,136 78,106 66,132 58,136" />

          {/* === I === */}
          <polygon points="186,18 218,18 183,128 151,128" />

          {/* === G === */}
          <path d="M226 18 L284 18 L277 40 L248 40 L241 62 L274 62 L267 84 L252 84 L246 106 L278 106 L271 128 L211 128 L226 18 Z" />
          {/* G inward hook */}
          <polygon points="262,72 290,72 284,94 256,94" />

          {/* === E === */}
          <path d="M292 18 L348 18 L342 38 L314 38 L310 58 L338 58 L332 78 L304 78 L300 106 L332 106 L326 128 L270 128 L292 18 Z" />

          {/* === R === */}
          <path d="M352 18 L400 18 C416 18 424 26 421 44 C419 58 410 68 395 72 L414 128 L382 128 L368 80 L358 80 L342 128 L312 128 L352 18 Z M366 40 L360 60 L382 60 C388 60 392 56 393 50 C394 44 391 40 384 40 L366 40 Z" />

          {/* === UNDERLINE BAR === */}
          <polygon points="160,138 335,138 330,150 148,150" />

          {/* === OTT === */}
          {/* O */}
          <path d="M346 136 L368 136 C374 136 378 140 376 148 C375 156 370 162 364 162 L342 162 C336 162 332 158 334 150 C335 142 340 136 346 136 Z M350 144 C348 148 347 151 349 154 C350 155 352 156 354 156 C357 156 359 153 360 150 C361 147 360 144 357 144 L350 144 Z" />

          {/* First T in OTT */}
          <polygon points="380,136 410,136 407,144 398,144 393,162 384,162 389,144 378,144" />

          {/* Second T in OTT */}
          <polygon points="414,136 444,136 441,144 432,144 427,162 418,162 423,144 412,144" />
        </g>
      </svg>
    </div>
  );
};

export default TigerLogo;
