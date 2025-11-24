import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

export const DumbbellIcon = ({ color, size }: { color: string; size: number }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M2 12H6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18 12H22"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Rect
        x="6"
        y="9"
        width="12"
        height="6"
        rx="1"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
       <Rect
        x="3"
        y="7"
        width="3"
        height="10"
        rx="1"
        fill={color}
      />
       <Rect
        x="18"
        y="7"
        width="3"
        height="10"
        rx="1"
        fill={color}
      />
    </Svg>
  );
};
