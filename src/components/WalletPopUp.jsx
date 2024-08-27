import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaPlus } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { generateKeyPairs } from '../redux/wallet/seedGeneratorSlice';
import { setWalletNo } from '../redux/wallet/navigateSlice';

function WalletPopUp() {
    const wallets = useSelector((state) => state.seedGenerator.wallets);
    const walletno = useSelector((state) => state.navigator.wallet)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [selectedWallet, setSelectedWallet] = useState(null);
    const [password, setPassword] = useState("");
    const [privateKey, setPrivateKey] = useState("");
    const [copyprivatekey,setCopyprivatekey] = useState('Copy private key')

    const onclickHandler = (index) => {
        dispatch(setWalletNo(index));
        navigate('/mainscreen');
    };

    const copyHandler = (data, index) => {
        navigator.clipboard.writeText(data.publicKey).then(() => {
            setCopiedIndex(index);
            setTimeout(() => {
                setCopiedIndex(null);
            }, 2000);
        });
    };

    const closeHandler = ()=>{
        setIsPopupVisible(false)
        setPassword('')
        setPrivateKey('')
        setCopyprivatekey('Copy private key')
    }

    const handlePrivateKeyClick = (data,index) => {
        setSelectedWallet(wallets[index]);
        setIsPopupVisible(true);
    };

    const storedPassword = localStorage.getItem('pass')
    const handlePasswordSubmit = () => {
        if (password == storedPassword) { 
            setPrivateKey(selectedWallet.privateKey);
        }
        else{
            alert('Enterd Wrong Password')
        }
    };

    const SelectCurrency = (e) => {
        console.log(e.target.value);
    };

    const handlecopyprivatekey =()=>{
        navigator.clipboard.writeText(privateKey)
        setCopyprivatekey('copied!')
    }

    useEffect(() => {
        if (wallets.length == 0) {
            dispatch(generateKeyPairs());
        }
    }, []);

    const addWalletHandler = () => {
        dispatch(generateKeyPairs());
    };

    return (
        <div className='max-h-full min-h-screen bg-black flex flex-col justify-start text-white'>
            <div className='flex flex-start'>
                <RxCross2 onClick={() => navigate('/mainscreen')} className='text-3xl m-3 text-gray-400 hover:text-gray-500 cursor-pointer' />
            </div>
            <div className='flex justify-center flex-col w-full items-center'>
                <h1 className='text-xl'>Wallets</h1>
                <select onChange={SelectCurrency} className='bg-neutral-800 rounded-md hover:bg-neutral-900 m-2 p-2 text-white'>
                    <option value="Solana">Solana</option>
                </select>
            </div>

            {wallets.map((data, index) => (
                <div key={index} className={`${walletno != index && 'border-gray-500'}  bg-gray-900 border border-blue-600 hover:bg-gray-950 cursor-pointer flex ml-3 mr-3 mt-2 rounded-md h-18 items-center justify-between`}>
                    <div onClick={() => onclickHandler(index)} className='flex flex-row m-2 overflow-hidden w-full gap-2 items-center'>
                        <div className='w-6 h-6 bg-sol rounded-full' />
                        <div className='w-full overflow-hidden'>
                            <h1>Wallet {index + 1}</h1>
                            <p className='truncate w-1/6 text-sm text-gray-500'>{data.publicKey}</p>
                        </div>
                    </div>

                    <div className='mr-2 flex flex-row gap-3 cursor-pointer'>
                        <div onClick={() => copyHandler(data, index)} className='flex items-center'>
                            <svg className='w-4 h-4' xmlns="http://www.w3.org/2000/svg" fill="#808080" viewBox="0 0 24 24" width="24px" height="24px">
                                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                            </svg>
                            {copiedIndex === index && (
                                <p className='text-sm text-gray-500 ml-2 transition-opacity duration-300 ease-in-out opacity-100'>
                                    Copied!
                                </p>
                            )}
                        </div>
                        <BsThreeDotsVertical className='text-xl mr-2' onClick={() => handlePrivateKeyClick(data,index)} />
                    </div>
                </div>
            ))}

            <div onClick={addWalletHandler} className='flex flex-row m-3 cursor-pointer w-max text-blue-500 gap-2 items-center'>
                <FaPlus />
                <h1>Add new wallet</h1>
            </div>

            {isPopupVisible && (
                <div className="fixed inset-1 flex items-center justify-center   bg-black bg-opacity-50">
                    <div className="bg-gray-800 p-6 rounded-lg  overflow-y-scroll hide-scrollbar  shadow-lg text-white max-w-sm w-full">
                        <h2 className="text-xl font-bold text-center mb-4">On this page, you will see your secrets</h2>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 mb-4 border rounded-md bg-gray-900  focus:outline-none text-green-400      "
                            placeholder="Enter your password"
                        />
                        <button
                            onClick={handlePasswordSubmit}
                            className="w-full bg-red-600 hover:bg-red-700 font-medium text-white p-2 rounded-md"
                        >
                            Show Secret
                        </button>
                        {privateKey && (
                            <div className="mt-4">
                                <p >Private Key:</p>
                                <p className="bg-gray-900 p-2  rounded-md text-sm text-green-400 break-all">{privateKey}</p>
                                <button
                                    onClick={handlecopyprivatekey}
                                    className="w-full mt-2 bg-white hover:bg-gray-200 text-black p-2 rounded-md"
                                >
                                    {copyprivatekey}
                                </button>
                            </div>
                        )}
                        <button
                            onClick={closeHandler}
                            className="mt-4 w-full bg-gray-500 hover:bg-gray-700 text-white p-2 rounded-md"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default WalletPopUp;
