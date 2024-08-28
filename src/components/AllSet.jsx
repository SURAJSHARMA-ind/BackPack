import React from 'react'
import { useNavigate } from 'react-router-dom';

function AllSet() {

  const copydiscord = () => {
    navigator.clipboard.writeText('surajsharma2740')
  };

  
  
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-black flex flex-col gap-6 justify-center items-center text-white p-4">
      <div className="flex justify-center items-center flex-col text-center">
        <h1 className="text-3xl md:text-4xl font-bold">You're all good!</h1>
        <p className="text-gray-400 mt-2">You can connect with me</p>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-3 justify-center items-center">
        <div className="bg-slate-900 hover:bg-slate-700 text-gray-300 text-sm w-full md:w-1/6 p-4 py-6 flex flex-col items-center rounded-lg gap-3">
          <img src="/assets/linkedin.png" width="30px" alt="LinkedIn" />
          <a href="https://www.linkedin.com/in/suraj76/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
        <div className="bg-slate-900 hover:bg-slate-700 text-gray-300 text-sm w-full md:w-1/6 p-4 py-6 flex flex-col items-center rounded-lg gap-3">
          <img src="/assets/X-Logo.png" width="30px" alt="Twitter" />
          <a href="https://x.com/Surajsharm33155" target="_blank" rel="noopener noreferrer">@Surajsharm33155</a>
        </div>
        <div onClick={copydiscord} className="bg-slate-900 hover:bg-slate-700 text-gray-300 text-sm w-full md:w-1/6 p-4 py-6 flex flex-col items-center rounded-lg gap-3 cursor-pointer">
          <img src="/assets/discord.png" width="30px" alt="Discord" />
          <p>surajsharma2740</p>
        </div>
      </div>
      <button onClick={() => navigate('/mainscreen')} className="p-2 bg-white text-black w-full md:w-1/3 text-md rounded-lg hover:bg-gray-300">
        Let's go
      </button>
    </div>
  )
}

export default AllSet;
