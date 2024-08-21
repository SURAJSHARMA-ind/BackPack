import React, { useEffect, useState } from 'react';
import { IoMdSwap } from "react-icons/io";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { LuPanelRight } from "react-icons/lu";
import { useSelector, useDispatch } from 'react-redux';
import { MnemonicGenerator, generateKeyPairs } from '../redux/wallet/seedGeneratorSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const apiKey = import.meta.env.Apikey;


function MainScreen() {
  let username = "Animal";
  let WalletNo = "1";
  let PercentInc = '5%';

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const mnemonic = useSelector((state) => state.seedGenerator.mnemonic);
  console.log(`mnemonic is `, mnemonic);

  const wallets = useSelector((state) => state.seedGenerator.wallets);
  console.log(`wallets are `, wallets);

  const [Amount, setAmount] = useState("0.0");

  const handlePostRequest = async () => {
    const postData = {
      "jsonrpc": "2.0",
      "id": 1,
      "method": "getBalance",
      "params": apiKey
    };
    console.log('POSTData is ', postData);
    try {
      const response = await axios.post('https://solana-mainnet.g.alchemy.com/v2/1SEhrahH3UqRPtrQKfigCSLqM1Kej6sy', postData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const filterdata = response.data.result.value;
      const convertData = parseInt(filterdata) / 1e9;
      setAmount(convertData);
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    handlePostRequest();
  }, []);


  return (
    <div className=' max-h-full min-h-screen bg-black text-white flex flex-col gap-6 p-4 md:gap-8 lg:gap-10  w-min-full'>
      <div className='bg-black text-white flex flex-wrap justify-between gap-4 md:gap-6 lg:gap-8 w-full'>
        <div className='w-12 h-12 cursor-pointer bg-red-800 text-center mt-3 justify-center items-center rounded-full'>
          <h1 className='text-2xl text-red-400'>{username.slice(0, 1)}1</h1>
        </div>

        <div className='bg-neutral-800 border border-gray-600 justify-center text-center cursor-pointer items-center overflow-hidden rounded-2xl flex flex-col md:flex-row gap-4 md:gap-8 mt-4 w-full md:w-1/2 lg:w-1/3 h-12'>
          <div className='ml-2 bg-sol rounded-full w-10 h-10'></div>

          <select onClick={() => navigate('/walletpopup')} name="" id="" className='bg-neutral-800 text-center cursor-pointer font-medium border-gray-600 w-full md:w-1/2 h-12 border p-2'>
            <option>wallet {1}</option>
          </select>

          <svg xmlns="http://www.w3.org/2000/svg" fill="#808080" viewBox="0 0 24 24" width="24px" height="24px">
            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
          </svg>
        </div>

        <LuPanelRight className='w-6 h-6 cursor-pointer mt-2' />
      </div>

      <div className='flex flex-col items-center gap-2 text-center'>
        <h1 className='text-3xl md:text-4xl font-bold'>${Amount}</h1>
        <div className='flex gap-3 text-gray-400 font-light'>
          <h1>${Amount}</h1>
          <h1>{PercentInc}</h1>
        </div>
      </div>

      <div className='flex flex-row justify-center gap-4 text-center'>
        <div className='flex flex-col items-center'>
          <FaArrowDown className='bg-neutral-800 cursor-pointer rounded-full p-3 w-10 h-10 text-blue-400' />
          <p className='font-thin text-sm cursor-pointer text-gray-300'>Receive</p>
        </div>
        <div className='flex flex-col items-center'>
          <FaArrowUp className='bg-neutral-800 cursor-pointer rounded-full p-3 w-10 h-10 text-blue-400' />
          <p className='font-thin text-sm text cursor-pointer text-gray-300'>Send</p>
        </div>
        <div className='flex flex-col items-center'>
          <IoMdSwap className='bg-neutral-800 cursor-pointer rounded-full p-3 w-10 h-10 text-blue-400' />
          <p className='font-thin text-sm cursor-pointer text-gray-300'>Swap</p>
        </div>
      </div>

    </div>

  );
}

export default MainScreen;
