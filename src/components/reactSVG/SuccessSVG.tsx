import { View, Text } from "react-native";
import React from "react";
import Svg, { G, Path } from "react-native-svg";

export default function SuccessSVG({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 1024 1024" fill="#000000">
      <G id="SVGRepo_bgCarrier" stroke-width="0" />

      <G
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <G id="SVGRepo_iconCarrier">
        <Path
          fill={color}
          d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"
        />
      </G>
    </Svg>
  );
}
