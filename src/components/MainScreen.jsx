import React from 'react'
import { IoMdSwap } from "react-icons/io";
import { FaArrowDown } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa6";
import { LuPanelRight } from "react-icons/lu";

function MainScreen() {
  let username = "Animal";
  let WalletNo = "1";
  let Amount = "20.00";
  let PercentInc = '5%';
  return (
    <div className='h-screen bg-black text-white flex flex-col gap-10 w-full'>

      <div className=' bg-black  text-white flex-wrap justify-between gap-2  w-full flex flex-row '>

        <div className='w-12  h-12 cursor-pointer bg-red-800 text-center  mt-3 justify-center item-center rounded-full'>
          <h1 className='text-2xl  text-red-400 '>{username.slice(0, 1)}1</h1>
        </div>

        <div className='bg-neutral-800 border border-gray-600 mr-30 text-center cursor-pointer items-center overflow-hidden rounded-2xl flex flex-row gap-10  mt-4 w-1/4 h-12'>

          <img src="src\assets\sol.png" className=' ml-4  rounded-full block w-10 h-10' alt="currencyS" />

          <select name="" id=""    className='bg-neutral-800 text-center font-medium border-gray-600 w-1/2  cursor-pointer  h-12 border p-2 '>
            <option value="">Wallet {WalletNo}</option>
            <option value="">Wallet {WalletNo}</option>
          </select>

          <svg xmlns="http://www.w3.org/2000/svg" fill="#808080" viewBox="0 0 24 24" width="24px" height="24px">
            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
          </svg>

        </div>
      
        <LuPanelRight   className=' w-8 h-8 mr-2 cursor-pointer mt-2 '/>

      </div>

      <div className='justify-center text-center flex gap-2 flex-col'>
        <h1 className='text-4xl font-bold'>${Amount}</h1>
        <div className=' justify-center text-l text-gray-400 font-light gap-3 flex-row flex'>
          <h1>${Amount} </h1>
          <h1>{PercentInc}</h1>
        </div>
      </div>

      <div className='flex flex-row justify-center gap-4  text-center cursor-pointer w-full '>
        <div>
          <FaArrowDown className='bg-neutral-800 rounded-full p-3 w-10 h-10 text-blue-400' />
          <p className=' font-thin text-sm text-gray-300'>Receive</p>
        </div>
        <div>
          <FaArrowUp  className='bg-neutral-800 rounded-full p-3 w-10 h-10 text-blue-400' />
          <p className=' font-thin text-sm text-gray-300'>Send</p>
        </div>
        <div>
          <IoMdSwap  className='bg-neutral-800 rounded-full p-3  w-10 h-10 text-blue-400 ' />
          <p className=' font-thin text-sm text-gray-300'>Swap</p>
        </div>
      </div>

      <div className='flex flex-row justify-between hover:bg-gray-900 transition-all  cursor-pointer p-2'>
      <img src="src\assets\sol.png" className=' ml-4  rounded-full block w-10 h-10' alt="currencyS" />
      <div>

      <h1>${Amount} </h1>
      <h1>{PercentInc}</h1>
      </div>
      </div>

    </div>
  )
}

export default MainScreen
