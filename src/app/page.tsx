import DotLottiePlayerAnimation from "@/components/DotLottiePlay";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-16 p-24">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl">Stutify App</h1>
        <h2 className="text-2xl">A Cloudflare POC</h2>
      </div>
      <DotLottiePlayerAnimation />
    </main>
  );
}
