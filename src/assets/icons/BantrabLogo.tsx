import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

interface BantrabLogoProps {
  size?: number;
}

export const BantrabLogo: React.FC<BantrabLogoProps> = ({ size = 100 }) => {
  const scale = size / 100;

  return (
    <Svg width={size} height={size * 0.4} viewBox="0 0 250 100">
      {/* Pinwheel Logo */}
      <G transform="translate(10, 10)">
        {/* Gray triangle (top-left) */}
        <Path d="M40 0 L40 40 L0 40 Z" fill="#9E9E9E" />
        {/* Cyan triangle (top) */}
        <Path d="M40 0 L80 40 L40 40 Z" fill="#00BCD4" />
        {/* Blue triangle (top-right) */}
        <Path d="M80 40 L40 40 L80 0 Z" fill="#2196F3" />
        {/* Gray triangle (right) */}
        <Path d="M80 40 L80 80 L40 40 Z" fill="#757575" />
        {/* Yellow triangle (bottom-left) */}
        <Path d="M0 40 L40 40 L40 80 Z" fill="#FFEB3B" />
        {/* Orange triangle (left) */}
        <Path d="M0 40 L0 0 L40 40 Z" fill="#FF9800" />
        {/* Magenta triangle (bottom) */}
        <Path d="M40 40 L40 80 L0 80 Z" fill="#E91E63" />
        {/* Red triangle (bottom-right) */}
        <Path d="M40 80 L80 80 L80 40 L40 40 Z" fill="#F44336" />
      </G>

      {/* BANTRAB Text */}
      <G transform="translate(100, 30)">
        <Path
          d="M0 0 L0 50 L20 50 C30 50 35 45 35 35 C35 28 32 24 27 22 C31 20 33 16 33 10 C33 3 28 0 18 0 Z M10 8 L17 8 C22 8 24 10 24 14 C24 18 22 20 17 20 L10 20 Z M10 28 L18 28 C24 28 26 31 26 36 C26 41 24 43 18 43 L10 43 Z"
          fill="#1A1A1A"
        />
        <Path
          d="M45 0 L55 0 L70 38 L85 0 L95 0 L75 50 L65 50 Z"
          fill="#1A1A1A"
          transform="translate(-5, 0)"
        />
        <Path
          d="M95 0 L105 0 L130 50 L120 50 L115 40 L90 40 L85 50 L75 50 Z M92 32 L113 32 L102.5 8 Z"
          fill="#1A1A1A"
          transform="translate(-10, 0)"
        />
      </G>
    </Svg>
  );
};
