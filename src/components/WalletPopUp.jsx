import React, { useEffect } from 'react'
import { MnemonicGenerator, generateKeyPairs } from '../redux/wallet/seedGeneratorSlice'
import { useSelector, useDispatch } from 'react-redux'
import { FaPlus } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import { BsThreeDotsVertical } from "react-icons/bs";


function WalletPopUp() {
    const wallets = useSelector((state) => state.seedGenerator.wallets)
    console.log(`wallets are `, wallets);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (wallets.length < 1) {

            dispatch(generateKeyPairs())
        }
    }, [])

    const addWalletHandler = () => {
        dispatch(generateKeyPairs())
    }

    return (
        <div className='bg-black w-full h-screen flex flex-col justify-start text-white ' >
            <div className='flex flex-start'>
                <RxCross2 onClick={() => navigate('/mainscreen')} className='text-3xl cursor-pointer  ' />
            </div>
            <div className='flex justify-center flex-col w-full items-center '>
                <h1 >Wallets</h1>
                <select className='bg-neutral-800 rounded-md m-2 p-2 text-white' name="" id="">
                    <option value="">Solana</option>
                    <option value="">Ethereum</option>
                </select>
            </div>

            {wallets.map((data, index) => {
                return <div className='bg-gray-900 flex ml-3 mr-3 mt-2  rounded-md h-20  items-center justify-between '>

                    <div className='flex flex-row m-2 gap-2 s'>
                        <img src="src\assets\sol.png" alt="Sol" className='w-8 h-8 rounded-full' />
                        <div className='w-64 overflow-hidden'>
                            <h1>Wallet {index + 1}</h1>
                            <p className=' truncate text-sm text-gray-500  '>{data.publicKey}</p>
                            {console.log(data)}
                        </div>

                    </div>
                    <div className='mr-2 flex flex-row gap-3 cursor-pointer'>
                        <svg onClick={()=>  navigator.clipboard.writeText(data.publicKey) } xmlns="http://www.w3.org/2000/svg" fill="#808080" viewBox="0 0 24 24" width="24px" height="24px">
                            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                        </svg>
                        <BsThreeDotsVertical className='text-xl mr-2'/>

                    </div>

                </div>
            })
            }

            <div onClick={addWalletHandler} className='flex flex-row m-3 cursor-pointer w-max text-blue-500 gap-2 items-center '>
                <FaPlus />
                <h1 >Add new wallet</h1>
            </div>
        </div>
    )
}

export default WalletPopUp
