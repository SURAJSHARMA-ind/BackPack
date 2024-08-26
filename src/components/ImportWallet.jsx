import React, { useState } from 'react';

function ImportWallet() {
    const [seedWord, setWordseed] = useState(12);
    const [displayseed, setDisplaySeed] = useState(24);
    const [importedSeed,SetImportedSeed] =useState('')

    const toogleseed = () => {
        seedWord === 12 ? setWordseed(24) : setWordseed(12);
        displayseed === 12 ? setDisplaySeed(24) : setDisplaySeed(12);
    };

    const seedinput = (e)=>{
        SetImportedSeed(e.target.value)
    }
    return (
        <div className='min-h-screen w-full bg-black flex flex-col items-center text-white justify-center '>
            <div className='flex gap-2 mt-4 flex-col justify-center text-center'>
                <h1 className='text-3xl md:text-4xl font-bold'>Secret Recovery Phrase</h1>
                <p className='text-gray-400 text-sm md:text-base'>Enter or paste your 12 or 24 word phrase.</p>
                <h1 onClick={toogleseed} className='text-sm md:text-lg hover:text-blue-600 font-bold cursor-pointer text-blue-500'>
                    Use {displayseed} words
                </h1>
            </div>

            <div className={`flex mt-5 flex-row overflow-y-scroll hide-scrollbar ${seedWord==12 ? 'h-22': 'h-80' }  flex-wrap w-[90%] md:w-[70%] lg:w-[50%] min-h-[40%] justify-center gap-2`}>
                {Array.from({ length: seedWord }, (_, index) => (
                    <div key={index} className='bg-slate-800 flex items-center flex-row h-14 rounded-md p-2 w-full sm:w-[48%] md:w-[30%] lg:w-[22%]'>
                        <span className='w-5'>{index + 1}</span>
                        <input
                            onChange={()=>seedinput(e)}
                            value={importedSeed}
                            type="text"
                            className="bg-slate-800 block focus:outline-none w-full h-10 p-2 rounded"
                        />
                    </div>
                ))}
            </div>

            <button className='bg-white mt-16 font-medium text-black cursor-pointer hover:bg-gray-200 h-10 rounded-md w-[80%] sm:w-[60%] md:w-[40%] lg:w-[20%]'>
                Import Wallet
            </button>
        </div>
    );
}

export default ImportWallet;
