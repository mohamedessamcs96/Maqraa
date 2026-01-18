import { motion } from 'motion/react';

interface LogoProps {
  size?: number;
  showText?: boolean;
  variant?: 'light' | 'dark' | 'gradient';
}

export function Logo({ size = 120, showText = true, variant = 'light' }: LogoProps) {
  const iconSize = size;
  const textSize = size * 0.3;

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Logo Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
      >
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer glow circle */}
          <motion.circle
            cx="60"
            cy="60"
            r="55"
            fill="url(#outerGlow)"
            opacity="0.2"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Main circle background */}
          <circle cx="60" cy="60" r="50" fill="url(#mainGradient)" />

          {/* Book/Quran pages */}
          <g transform="translate(60, 60)">
            {/* Left page */}
            <motion.path
              d="M -25 -20 Q -25 -25, -20 -25 L -5 -25 L -5 20 L -20 20 Q -25 20, -25 15 Z"
              fill={variant === 'light' ? 'white' : 'url(#pageGradient)'}
              opacity="0.95"
              initial={{ x: -5, opacity: 0 }}
              animate={{ x: 0, opacity: 0.95 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
            {/* Right page */}
            <motion.path
              d="M 25 -20 Q 25 -25, 20 -25 L 5 -25 L 5 20 L 20 20 Q 25 20, 25 15 Z"
              fill={variant === 'light' ? 'white' : 'url(#pageGradient)'}
              opacity="0.95"
              initial={{ x: 5, opacity: 0 }}
              animate={{ x: 0, opacity: 0.95 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />

            {/* Center binding */}
            <rect x="-1" y="-25" width="2" height="45" fill="url(#bindingGradient)" />

            {/* Decorative lines on pages (representing Quranic text) */}
            {[-15, -10, -5, 0, 5, 10].map((y, i) => (
              <motion.g key={y}>
                <rect x="-20" y={y} width="12" height="1.5" rx="0.5" fill="url(#textGradient)" opacity="0.6" />
                <rect x="8" y={y} width="12" height="1.5" rx="0.5" fill="url(#textGradient)" opacity="0.6" />
              </motion.g>
            ))}

            {/* Light rays emanating from the book */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <motion.line
                key={angle}
                x1="0"
                y1="0"
                x2={Math.cos((angle * Math.PI) / 180) * 35}
                y2={Math.sin((angle * Math.PI) / 180) * 35}
                stroke="url(#rayGradient)"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.4 }}
                transition={{ delay: 0.6 + i * 0.05, duration: 0.8 }}
              />
            ))}
          </g>

          {/* Decorative Arabic calligraphic element at top */}
          <motion.path
            d="M 60 15 Q 55 12, 50 15 Q 48 17, 50 19 Q 52 20, 55 18 L 60 15 Z M 60 15 Q 65 12, 70 15 Q 72 17, 70 19 Q 68 20, 65 18 L 60 15 Z"
            fill="url(#accentGradient)"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          />

          {/* Gradient Definitions */}
          <defs>
            <radialGradient id="outerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#059669" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>

            <linearGradient id="pageGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f0fdf4" />
            </linearGradient>

            <linearGradient id="bindingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>

            <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#047857" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>

            <linearGradient id="rayGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Text */}
      {showText && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center"
        >
          <h1
            className={`font-bold mb-1 ${variant === 'light' ? 'text-white' : 'text-gray-800'}`}
            style={{ fontSize: textSize * 1.5 }}
          >
            مقرأة
          </h1>
          <p
            className={`${variant === 'light' ? 'text-white/90' : 'text-gray-600'}`}
            style={{ fontSize: textSize * 0.7 }}
          >
            نورٌ يُتلى
          </p>
        </motion.div>
      )}
    </div>
  );
}
