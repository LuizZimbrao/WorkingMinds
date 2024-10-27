"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={() => router.push("/pessoa")}
        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
      >
        Pessoas
      </button>
    </div>
  );
}
