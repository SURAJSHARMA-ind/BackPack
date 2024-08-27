import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ImportWallet() {
    const [seedWord, setWordseed] = useState(12);
    const [displayseed, setDisplaySeed] = useState(24);
    const [isDisabled, setIsDisabled] = useState(true);
    const [mnemonics, setMnemonics] = useState(Array(12).fill('')); 

    const navigate = useNavigate()

    const toogleseed = () => {
        if (seedWord === 12) {
            setWordseed(24);
            setMnemonics(Array(24).fill('')); 
        } else {
            setWordseed(12);
            setMnemonics(Array(12).fill('')); 
        }
        setDisplaySeed(seedWord === 12 ? 24 : 12);
    };

   
    const handlePaste = (e, index) => {
        e.preventDefault(); 
        const pastedData = e.clipboardData.getData('text'); 
        const words = pastedData.trim().split(' '); 
        console.log(words);

        if (words.length <= seedWord) {
            const updatedMnemonics = [...mnemonics];
            words.forEach((word, idx) => {
                if (idx < seedWord) {
                    updatedMnemonics[idx] = word;
                }
            });
            setMnemonics(updatedMnemonics); 
        } else {
            alert("Pasted data exceeds the number of available input boxes.");
        }
    };

    const handleChange = (index, value) => {
        const updatedMnemonics = [...mnemonics];
        updatedMnemonics[index] = value;
        setMnemonics(updatedMnemonics);
    };

   
    useEffect(() => {
        const allFilled = mnemonics.every(word => word.trim().length>2);
        setIsDisabled(!allFilled); 
    }, [mnemonics]);

    
    const importwallet = () => {
        localStorage.setItem('mnemonic', mnemonics.join(' ')); 
        navigate('/mainscreen')
    };

    return (
        <div className='min-h-screen w-full bg-black flex flex-col items-center text-white justify-center'>
            <div className='flex gap-2 mt-4 flex-col justify-center text-center'>
                <h1 className='text-3xl md:text-4xl font-bold'>Secret Recovery Phrase</h1>
                <p className='text-gray-400 text-sm md:text-base'>Enter or paste your 12 or 24 word phrase.</p>
                <h1 onClick={toogleseed} className='text-sm md:text-lg hover:text-blue-600 font-bold cursor-pointer text-blue-500'>
                    Use {displayseed} words
                </h1>
            </div>

            <div className={`flex mt-5 flex-row overflow-y-scroll hide-scrollbar ${seedWord === 12 ? 'h-48' : 'h-56'} flex-wrap w-[90%] md:w-[70%] lg:w-[50%] min-h-[40%] justify-center gap-2`}>
                {mnemonics.map((word, index) => (
                    <div key={index} className='bg-slate-800 flex items-center flex-row h-14 rounded-md p-2 w-full sm:w-[48%] md:w-[30%] lg:w-[22%]'>
                        <span className='w-5'>{index + 1}</span>
                        <input
                            type="text"
                            value={word}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onPaste={(e) => handlePaste(e, index)}
                            className="bg-slate-800 block focus:outline-none w-full h-10 p-2 rounded"
                        />
                    </div>
                ))}
            </div>

            <button
                disabled={isDisabled}
                onClick={importwallet}
                className={` ${isDisabled ? 'bg-gray-600 hover:cursor-not-allowed' : 'cursor-pointer bg-white'} mt-16 font-medium text-black h-10 rounded-md w-[80%] sm:w-[60%] md:w-[40%] lg:w-[20%]`}>
                Import Wallet
            </button>
        </div>
    );
}

export default ImportWallet;
