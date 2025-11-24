import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const CheckingAccountIcon = ({ color, size }: { color: string; size: number }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 6V4.5C3 3.67157 3.67157 3 4.5 3H19.5C20.3284 3 21 3.67157 21 4.5V6"
        stroke={color}
        strokeWidth="2"
      />
      <Path
        d="M3 18V19.5C3 20.3284 3.67157 21 4.5 21H19.5C20.3284 21 21 20.3284 21 19.5V18"
        stroke={color}
        strokeWidth="2"
      />
      <Path d="M3 12H21" stroke={color} strokeWidth="2" />
      <Path d="M10 9L12 12L10 15" stroke={color} strokeWidth="2" />
    </Svg>
  );
};
