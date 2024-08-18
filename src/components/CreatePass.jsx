import React from 'react'

function CreatePass() {
  return (
    <div className='bg-black h-screen flex  flex-col justify-center items-center text-white'>
      <div  className='flex flex-col justify-center items-center' >
        <h1 className='text-4xl font-bold mb-3'>Create a Password</h1>
        <p className='text-gray-400'>It should be of 8 characters.</p>
        <p className='text-gray-400'>You'll need this to unlock the Backpack.</p>
      </div>
      <div className=''>
        <input type="password" name="" id="" placeholder='Password' className='w- bg-neutral-600 text-white  px-4 py-2 border-none rounded focus:outline-dashed' />
      </div>
    </div>
  )
}

export default CreatePass
