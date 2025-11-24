import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const BookIcon = ({ color, size }: { color: string; size: number }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 19.5A2.5 2.5 0 016.5 17H20"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.5 2H20v15H6.5A2.5 2.5 0 014 14.5v-9A2.5 2.5 0 016.5 3h0zm0 0V17"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
