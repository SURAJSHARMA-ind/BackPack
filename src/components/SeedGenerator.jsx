import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MnemonicGenerator, generateKeyPairs } from '../redux/wallet/seedGeneratorSlice';

function SeedGenerator() {
  const dispatch = useDispatch();
  const mnemonic = useSelector((state) => state.seedGenerator.mnemonic);
  

  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [coppytoggle, setcoppytoggle] = useState("Click anywhere on this card to copy");

  // Dispatch to generate a mnemonic if not generated yet
  if (!mnemonic) {
    dispatch(MnemonicGenerator());
    dispatch(generateKeyPairs())
  }
 

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const copytoClipboard = () => {
    navigator.clipboard.writeText(mnemonic);
    setcoppytoggle("Copied");
  };

  const mnemonicArray = mnemonic.split(' ');
  console.log(mnemonicArray);

  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-black text-white p-4 md:p-6 lg:p-8'>
      <div className='flex flex-col items-center mb-6'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-center'>Secret Recovery Phrase</h1>
        <p className='text-gray-400 text-sm md:text-base lg:text-lg text-center'>Save these words in a safe place.</p>
        <Link to='/warning'>
          <p className='text-blue-500 text-sm md:text-base lg:text-lg mt-2'>Read the warnings again</p>
        </Link>
      </div>

      <div onClick={copytoClipboard} className="bg-neutral-800 cursor-pointer text-white p-2 md:p-6 lg:p-8 mt-8 rounded-lg shadow-md w-full max-w-lg md:max-w-xl lg:max-w-2xl">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 mb-4">
          {mnemonicArray.map((word, index) => (
            <div key={index} className="flex items-center text-sm md:text-base lg:text-lg">
              <span className="mr-2 text-gray-400">{index + 1}</span>
              <span>{word}</span>
            </div>
          ))}
        </div>
        <hr className="my-2" />
        <div className="text-center text-gray-300 text-sm md:text-base lg:text-lg">
          {coppytoggle}
        </div>
      </div>

      <div className="flex items-center mt-6 text-sm md:text-base lg:text-lg">
        <input
          type="checkbox"
          id="checkbox"
          className="mr-2 h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500 rounded"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="checkbox" className="text-gray-300">
          I saved my recovery phrase.
        </label>
      </div>

      <button
        onClick={() => navigate('/createpass')}
        className={`mt-6 py-2 px-4 w-1/6 rounded-md text-black ${isChecked ? 'bg-white hover:bg-gray-200' : 'bg-gray-600 cursor-not-allowed'}`}
        disabled={!isChecked}
      >
        Next
      </button>
    </div>
  );
}

export default SeedGenerator;
