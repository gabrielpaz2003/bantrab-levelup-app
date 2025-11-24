import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

export const GameControllerIcon = ({ color, size }: { color: string; size: number }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8 12H16"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 8V16"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.035 16.13a8.5 8.5 0 10-10.07 0"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="15" cy="10" r="1" fill={color} />
      <Circle cx="9" cy="10" r="1" fill={color} />
    </Svg>
  );
};
