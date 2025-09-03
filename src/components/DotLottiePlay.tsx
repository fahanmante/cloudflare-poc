"use client";
import { DotLottiePlayer } from "@dotlottie/react-player";

const DotLottiePlayerAnimation = () => {
  return (
    <DotLottiePlayer
      src={
        "https://lottie.host/863f36c0-f4d7-4ba3-a87f-262a214ba7d6/HZdnggOmdW.lottie"
      }
      style={{
        height: 250,
        width: 250,
      }}
      loop
    />
  );
};

export default DotLottiePlayerAnimation;
