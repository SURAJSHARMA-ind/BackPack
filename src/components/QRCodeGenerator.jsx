import React, { useState } from "react";
import QRCode from "react-qr-code";
import toast, { Toaster } from "react-hot-toast";

const QRCodeGenerator = ({ publicKey }) => {

  const pub1 = publicKey.slice(0, 26)
  const pub2 = publicKey.slice(26, 44)

  const copyBtn = () => {
    navigator.clipboard.writeText(publicKey)
    toast('Copied!', {
      icon: '📋',
    });
  }


  return (
    <div className={`text-white h-screen flex-col text-center flex fixed  w-full bg-black  `} >
      <div><Toaster /></div>

      <div className="flex h-[50%]  flex-col items-center justify-center w-full ">

        <QRCode className=" h-44  bg-white w-max p-2 rounded-md" value={publicKey} size={256} />
        <div className="text-center mt-4 items-center overflow-clip font-medium  ">
          <h1 className="text-white  ">{pub1}</h1>
          <h1 className="text-white  ">{pub2}</h1>
        </div>
      </div>
      <div className=" flex flex-col items-center justify-center text-center gap-2">
        <button onClick={copyBtn} className="bg-[#070f22] cursor-pointer hover:bg-[#0a1634] w-44 p-3 rounded-md font-medium text-[#3D8BFF]">Copy address</button>

        <div className="text-gray-400">
          <p>This address can only receive </p>
          <p>assets on Solana</p>
        </div>
      </div>

    </div>
  );
};

export default QRCodeGenerator;
