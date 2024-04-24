import Image from "next/image";
import Box from "./components/Box";

export default function Home() {
  const logFunction = () => {
    console.log("Test");
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Box onclick={logFunction} content="Alt + F4" />
        {/*Example Component, pls remove before Build*/}
      </div>
    </main>
  );
}
