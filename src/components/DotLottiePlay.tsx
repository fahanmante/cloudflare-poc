"use client";
import { DotLottiePlayer } from "@dotlottie/react-player";

const DotLottiePlayerAnimation = () => {
  return (
    <DotLottiePlayer
      src="/lotties/sample.lottie"
      style={{
        height: 350,
        width: 350,
      }}
      loop
    />
  );
};

export default DotLottiePlayerAnimation;
