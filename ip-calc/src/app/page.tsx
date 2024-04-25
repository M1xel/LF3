"use client";
import Box from "./components/Box";
import InputField from "./components/InputField";

export default function Home() {
  const logFunction = () => {
    console.log("Test");
  };
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div>
        <Box onclick={logFunction} content='Alt + F4' />
        {/*Example Component, pls remove before Build*/}
        <InputField content='IP-Address' maxLength={15}/>
        <InputField content='CIDR' maxLength={2} />

      </div>
    </main>
  );
}
