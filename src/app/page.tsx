"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  router.push("/dashboard");

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[100dvh] w-full">
          <p>If you are not redirected to dashboard, please <Link href={"/dashboard"}>click here</Link></p>
      </div>
    </>
  );
}
