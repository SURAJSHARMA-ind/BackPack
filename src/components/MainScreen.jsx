import React, { useEffect, useState } from 'react';
import { IoMdSwap } from "react-icons/io";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { LuPanelRight } from "react-icons/lu";
import { useSelector, useDispatch } from 'react-redux';
import { MnemonicGenerator, generateKeyPairs } from '../redux/wallet/seedGeneratorSlice';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const apiKey = import.meta.env.VITE_API_KEY;

function MainScreen() {
  const [copy, setCopy] = useState(null);
  const [amount, setAmount] = useState("0.0");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [price, setPrice] = useState(0);
  const [highPrice, setHighPrice] = useState(0)
  const [lowPrice, setlowPrice] = useState(0)
  const [percentVariation, setPercentVariation] = useState(0)
  const [changeinPrice, setChangeinPrice] = useState(0)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let username = "Animal";

  const wallets = useSelector((state) => state.seedGenerator.wallets);
  const walletno = useSelector((state) => state.navigator.wallet);
  const publicKey = wallets[walletno]?.publicKey || '';

  useEffect(() => {
    if (wallets.length === 0) {
      dispatch(generateKeyPairs());
    }
  }, [wallets, dispatch]);

  useEffect(() => {
    fetchSolPriceInUSD();
  }, []);

  useEffect(() => {
    handlePostRequest();
  }, [publicKey]);

  const fetchSolPriceInUSD = async () => {
    try {
      const response = await axios.get('https://api.kraken.com/0/public/Ticker?pair=SOLUSD');
      const data = response.data.result.SOLUSD;
      const highPrice = data.h[0]
      setHighPrice(highPrice)
      console.log('HighPrice is ', highPrice)
      const lowPrice = data.l[0]
      setlowPrice(lowPrice)
      console.log('lowPrice is ', lowPrice)
      setExchangeRate(data);
      console.log('exchangeRate is ', data);
    } catch (error) {
      console.error('Error fetching SOL price:', error);
    }
  };

  const handlePostRequest = async () => {
    const postData = {
      "jsonrpc": "2.0",
      "id": 1,
      "method": "getBalance",
      "params": [`${publicKey}`] 
    };
    try {
      const response = await axios.post(`https://solana-devnet.g.alchemy.com/v2/${apiKey}`, postData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const filterdata = response.data.result.value;
      const convertData = parseInt(filterdata) / 1e9;
      setAmount(convertData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const copyHandler = async () => {
    try {
      await navigator.clipboard.writeText(publicKey);
      setCopy('Copied!');
      setTimeout(() => {
        setCopy(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  useEffect(() => {
    if (exchangeRate) {
      const currentRate = exchangeRate.c[0];
      const calculatedPrice = amount * currentRate;
      setPrice(calculatedPrice); 
    }
  }, [exchangeRate, amount]);

  useEffect(() => {
    if (highPrice && lowPrice) {

      const percentage = ((highPrice - lowPrice) / lowPrice) * 100
      setPercentVariation(percentage);
      setChangeinPrice(highPrice-lowPrice)
    }
  }, [lowPrice, highPrice, percentVariation])

  return (
    <div className='max-h-full min-h-screen bg-black text-white flex flex-col gap-6 p-4 md:gap-8 lg:gap-10 w-min-full'>
      <div className='bg-black text-white flex flex-wrap justify-between gap-4 md:gap-6 lg:gap-8 w-full'>
        <div className='w-12 h-12 cursor-pointer bg-red-800 text-center mt-3 justify-center items-center rounded-full'>
          <h1 className='text-2xl text-red-400'>{username.slice(0, 1)}1</h1>
        </div>

        <div className='bg-neutral-800 hover:bg-neutral-900 border border-gray-600 justify-center text-center cursor-pointer items-center overflow-hidden rounded-2xl flex flex-col md:flex-row gap-4 md:gap-8 mt-4 w-full md:w-1/2 lg:w-1/3 h-12'>
          <div className='rounded-full bg-sol w-10 h-10 ' />
          <select onClick={() => navigate('/walletpopup')} name="" id="" className='bg-neutral-800 text-center hover:bg-neutral-900 cursor-pointer font-medium border-gray-600 w-full md:w-1/2 h-12 border p-2'>
            <option>wallet{walletno + 1}</option>
          </select>

          <div className='flex flex-row' onClick={copyHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="#808080" viewBox="0 0 24 24" width="24px" height="24px">
              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
            </svg>
            <p className='text-sm text-gray-500 ml-2 transition-opacity duration-300 ease-in-out opacity-100'>
              {copy}
            </p>
          </div>

        </div>
        <LuPanelRight className='w-6 h-6 cursor-pointer mt-2' />
      </div>

      <div className='flex flex-col items-center gap-2 text-center'>
        <h1 className='text-3xl md:text-4xl font-bold'>${price.toFixed(3)}</h1>
        <div className='flex gap-3 text-gray-400 font-light'>
          <h1>${changeinPrice.toFixed(2)}</h1>
          <h1>{percentVariation.toFixed(1)}%</h1>
        </div>
      </div>

      <div className='flex flex-row justify-center gap-4 text-center'>
        <Link target='_blank' to={'https://faucet.solana.com'}>
          <div className='flex flex-col items-center'>
            <FaArrowDown className='bg-neutral-800 cursor-pointer rounded-full p-3 w-10 h-10 text-blue-400' />
            <p className='font-thin text-sm cursor-pointer text-gray-300'>Receive</p>
          </div>
        </Link>
        <Link target='_blank' to={'https://faucet.solana.com'} >
          <div className='flex flex-col items-center'>
            <FaArrowUp className='bg-neutral-800 cursor-pointer rounded-full p-3 w-10 h-10 text-blue-400' />
            <p className='font-thin text-sm text cursor-pointer text-gray-300'>Send</p>
          </div>
        </Link>
        <div className='flex flex-col items-center'>
          <IoMdSwap className='bg-neutral-800 cursor-pointer rounded-full p-3 w-10 h-10 text-blue-400' />
          <p className='font-thin text-sm text cursor-pointer text-gray-300'>Swap</p>
        </div>
      </div>

      <div className='bg-black h-14 mt-16 rounded-md text-center flex justify-between items-center  cursor-pointer hover:bg-neutral-900 m-0 p-0 text-white w-full'>
        <div className='flex flex-row justify-center gap-2 items-center '>
          <img className='rounded-full w-10 h-10 ml-2' src="src\assets\sol.png" alt="sol" />
          <div>
            <h1 className=' font-bold'>Solana</h1>
            <h1 className=' text-lg text-gray-500 '>{amount} Sol</h1>
          </div>

        </div>
        <div className='mr-2'>
          <h1>${price.toFixed(5)}</h1>
          <h1 className='text-green-300'>{percentVariation.toFixed(1)}%</h1>
        </div>
      </div>
    </div>
  );
}

export default MainScreen;
