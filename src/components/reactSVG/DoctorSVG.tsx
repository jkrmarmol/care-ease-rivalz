import { View, Text } from "react-native";
import React from "react";
import Svg, { G, Path } from "react-native-svg";

export default function DoctorSVG({ color }: { color: string }) {
  return (
    <Svg
      id="Icons"
      viewBox="0 0 32 32"
      width="40px"
      height="40px"
      fill="#000000"
    >
      <G id="SVGRepo_bgCarrier" stroke-width="0" />

      <G
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <G id="SVGRepo_iconCarrier">
        <Path d="M26,12.8l-1.8-7.3c-0.1-0.3-0.3-0.5-0.5-0.7c-4.8-2.3-10.4-2.3-15.3,0C8.1,4.9,7.9,5.1,7.8,5.4L6,12.8C6,13,6,13.3,6.2,13.5 c0.1,0.2,0.4,0.4,0.6,0.4c3.1,0.7,6.1,1,9.2,1s6.2-0.3,9.2-1c0.3-0.1,0.5-0.2,0.6-0.4C26,13.3,26,13,26,12.8z M18,10h-1v1 c0,0.6-0.4,1-1,1s-1-0.4-1-1v-1h-1c-0.6,0-1-0.4-1-1s0.4-1,1-1h1V7c0-0.6,0.4-1,1-1s1,0.4,1,1v1h1c0.6,0,1,0.4,1,1S18.6,10,18,10z" />
        <Path d="M26.3,15.7c-0.2,0.1-0.4,0.2-0.6,0.2C22.5,16.6,19.2,17,16,17s-6.5-0.4-9.7-1.1c-0.2,0-0.4-0.1-0.6-0.2 c-0.8,0.9-1,2.5-0.4,4.2c0.4,1.3,1.2,2.4,2.2,2.9C7.7,22.9,8,23,8.2,23c1.2,3.6,4.2,6,7.8,6s6.6-2.4,7.8-6c0.3,0,0.5-0.1,0.8-0.2 c0.9-0.4,1.8-1.5,2.2-2.9C27.2,18.2,27,16.6,26.3,15.7z" />
      </G>
    </Svg>
  );
}
