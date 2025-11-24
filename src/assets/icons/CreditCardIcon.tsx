import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

export const CreditCardIcon = ({ color, size }: { color: string; size: number }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="6" width="18" height="12" rx="2" stroke={color} strokeWidth="2" />
      <Path d="M3 10H21" stroke={color} strokeWidth="2" />
      <Path d="M7 14H9" stroke={color} strokeWidth="2" />
    </Svg>
  );
};
