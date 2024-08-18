import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
import { useNavigate } from 'react-router-dom';

function SeedGenerator() {
  const navigate = useNavigate()
  const [isChecked, setIsChecked] = useState(false);
  const [coppytoggle, setcoppytoggle] = useState("Click anywhere on this card to copy")

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const [mnemonic, setMnemonic] = useState("");
  const MnemonicGenerator = () => {
    const mnemonicphrase = generateMnemonic();
    setMnemonic(mnemonicphrase);
    console.log(`Generated mnemonic: ${mnemonicphrase}`);
  };
  useEffect(() => {
    MnemonicGenerator()
  }, [])

  const copytoClipboard = () => {
    navigator.clipboard.writeText(mnemonic)
    setcoppytoggle("Copied")
      
  };

  const mnemonicArray = mnemonic.split(' ')
  console.log(mnemonicArray);
  return (
    <div className='h-screen bg-black flex flex-col justify-center items-center text-white'>
      <div className="1st items-center justify-center flex flex-col">
        <h1 className='text-4xl p-2 font-bold'>Secret Recovery Phrase</h1>
        <p className=' text-gray-400 -2 '>Save these words in a safe place.</p>
        <Link to={'/warning'} > <p className='text-blue-500 p-2'>Read the warnings again</p></Link>
      </div>

      <div onClick={copytoClipboard} className="bg-neutral-800 cursor-pointer text-white p-6 mt-8 rounded-lg shadow-md w-full max-w-xl">
        <div  className="grid cursor-pointer grid-cols-3 gap-4 mb-4">
          {mnemonicArray.map((word, index) => (
            <div key={index}  className="flex items-center">
              <span className="mr-2 text-gray-400">{index + 1}</span>
              <span>{word}</span>
            </div>
          ))}
        </div>
        <hr />
        <div className="text-center mt-3 text-gray-300 text-sm">
          {coppytoggle}
        </div>
      </div>

      <div className="flex items-center m-2">
        <input
          type="checkbox"
          id="checkbox"
          className="mr-2 h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500 rounded"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="checkbox" className="text-sm">
          I saved my recovery phrase.
        </label>
      </div>

      <button
        onClick={() => { navigate('/createpass') }}
        className={`w-1/6 py-2 px-4 rounded-md text-black ${isChecked ? 'bg-white hover:bg-gray-200' : 'bg-gray-600 cursor-not-allowed'}`}
        disabled={!isChecked}
      >
        Next
      </button>
    </div>


  )
}

export default SeedGenerator
