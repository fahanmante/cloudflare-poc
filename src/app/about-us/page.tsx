import Link from "next/link";

export const fetchCache = "force-no-store";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-16 p-24">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-5xl">About Us</h1>
        <h2 className="text-3xl">Learn more about our team and mission</h2>
      </div>
      <Link href="/" className="text-blue-500 underline">
        Back to Home
      </Link>
    </main>
  );
}
