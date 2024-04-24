import Image from "next/image";
import Box from "./components/Box";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Box content="Alt + F4" />
      </div>
    </main>
  );
}
