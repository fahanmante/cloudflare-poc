"use client";
import { DotLottiePlayer } from "@dotlottie/react-player";

const DotLottiePlayerAnimation = () => {
  return (
    <div className="flex flex-row gap-5">
      {/* taking path from public folder or locally served */}
      <DotLottiePlayer
        src="/lotties/onesample.lottie"
        style={{
          height: 350,
          width: 350,
        }}
        loop
        autoplay
      />
      {/* taking path from external url */}
      <DotLottiePlayer
        src={
          "https://lottie.host/138051fd-70a3-40f3-8939-b5a7ae8c6a04/B0xz2h3pRf.lottie"
        }
        style={{
          height: 350,
          width: 350,
        }}
        loop
        autoplay
      />
    </div>
  );
};

export default DotLottiePlayerAnimation;
