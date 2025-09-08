import DotLottiePlayerAnimation from "@/components/DotLottiePlay";
import Image from "next/image";
import BG_IMG from "./bg_img.jpg";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-16 p-24">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-5xl">Stutify App</h1>
        <h2 className="text-3xl">A Cloudflare POC</h2>
      </div>
      <DotLottiePlayerAnimation />
      <Image
        src="https://shift-boolean-dev.s3.ap-south-1.amazonaws.com/public/Future_Of_Web_Development_355c2adc14.webp"
        alt="Deer Image"
        className="rounded-lg shadow-lg"
        width={200}
        height={200}
      />
      <Image
        src={BG_IMG}
        alt="Background Image"
        className="rounded-lg shadow-lg absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-50"
      />
    </main>
  );
}
