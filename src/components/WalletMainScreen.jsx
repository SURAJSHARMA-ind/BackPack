import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function WalletMainScreen() {

    const navigate = useNavigate()

    const CreateWallet = () => {
        navigate('/warning')
    };


    return (
        <div className='h-screen bg-black flex flex-col gap-6  justify-center items-center text-white'>

            <div className="scontainer flex mb-10 flex-col justify-center items-center">
                <img src="/assets/image.png" width={'180px'} alt="BackPack Logo" />
                <h1 className='text-4xl font-bold '>Welcome to Backpack</h1>
                <p className='text-gray-400'>Let's get started</p>
            </div>

            <div className="btns flex mt-8 flex-col justify-center items-center">
                <button onClick={CreateWallet} className='bg-white mb-1 font-medium rounded-lg hover:bg-gray-200 px-8 py-2 text-black'>Create a new wallet</button>
                <button onClick={()=>navigate('/importwallet')} className='bg-gray-700 mt-1 w-full font-medium rounded-lg hover:bg-gray-800 px-8 py-2 text-white'>Import wallet</button>
            </div>


        </div>
    )
}

export default WalletMainScreen
