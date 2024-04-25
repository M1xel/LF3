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
        <InputField content='IP-Address' maxLength={15} providedRegex={/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/}/>
        <InputField content='CIDR' maxLength={2} providedRegex={/\b([1-9]|[12][0-9]|3[0-2])\b/}/>
        <InputField content="Hosts" maxLength={6} providedRegex={undefined}/>
        <br/> {/*Probably could be done in a better style with CSS still not a clue what I am doing*/}
        <InputField content="Amount Networks" maxLength={2} providedRegex={undefined}/>
      </div>
    </main>
  );
}
