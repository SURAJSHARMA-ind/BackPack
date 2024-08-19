import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function CreatePass() {
  const [isChecked, setIsChecked] = useState(false);
  const [password, setpassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const navigate = useNavigate();

  const passwordHandler = (e) => {
    setpassword(e.target.value)
  }
  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
   if(password!=confirmPassword){
    alert("Password not matched")
  }else{
     
    navigate('/allset');
    localStorage.setItem('pass',password)
   }
  };

  return (
    <div className='bg-black h-screen flex gap-20 flex-col justify-center items-center text-white'>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='text-4xl font-bold mb-3'>Create a Password</h1>
        <p className='text-gray-400'>It should be at least 8 characters.</p>
        <p className='text-gray-400'>You'll need this to unlock the Backpack.</p>
      </div>

      <form className='w-full items-center flex flex-col gap-4 text-center' onSubmit={handleSubmit}>
        <input
          onChange={passwordHandler}
          type="password"
          name="password"
          placeholder='Password'
          className='w-1/3 bg-neutral-900 text-gray-200 px-4 py-3 border-none rounded focus:outline-dashed'
          required
          value={password}
          minLength="8"
        />

        <input
          onChange={confirmPasswordHandler}
          value={confirmPassword}
          type="password"
          name="confirmPassword"
          placeholder='Confirm Password'
          className='w-1/3 bg-neutral-900 text-gray-200 px-4 py-3 border-none rounded focus:outline-dashed'
          required
          minLength="8"
        />

        <div className='flex flex-col gap-2 w-full items-center'>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="checkbox"
              className="mr-2 h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500 rounded"
              checked={isChecked}
              onChange={handleCheckboxChange}
              required
            />
            <label htmlFor="checkbox" className="text-sm">
              I agree to <a href="https://support.backpack.exchange/en/articles/1030529" className='text-blue-400' target='_blank' rel="noopener noreferrer">Term of Services</a>
            </label>
          </div>
          <button
            type='submit'
            className={`w-1/6 py-2 px-4 rounded-md text-black ${isChecked ? 'bg-white hover:bg-gray-200' : 'bg-gray-600 cursor-not-allowed'}`}
            disabled={!isChecked}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePass;
