import DotLottiePlayerAnimation from "@/components/DotLottiePlay";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl">My Cloudflare POC</h1>
      <DotLottiePlayerAnimation />
    </main>
  );
}
