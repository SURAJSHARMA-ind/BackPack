import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreatePass() {
  const [isChecked, setIsChecked] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
    } else {
      localStorage.setItem('pass', password);
      navigate('/allset');
    }
  };

  return (
    <div className='bg-black min-h-screen flex flex-col justify-center items-center text-white p-4 md:p-6 lg:p-8'>
      <div className='flex flex-col items-center mb-6'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-3'>Create a Password</h1>
        <p className='text-gray-400 text-sm md:text-base lg:text-lg mb-2'>It should be at least 8 characters.</p>
        <p className='text-gray-400 text-sm md:text-base lg:text-lg'>You'll need this to unlock the Backpack.</p>
      </div>

      <form className='w-full max-w-md flex flex-col gap-4 text-center' onSubmit={handleSubmit}>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          placeholder='Password'
          className='w-full bg-neutral-900 text-gray-200 px-4 py-3 border-none rounded focus:outline-dashed'
          required
          value={password}
          minLength="8"
        />

        <input
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          name="confirmPassword"
          placeholder='Confirm Password'
          className='w-full bg-neutral-900 text-gray-200 px-4 py-3 border-none rounded focus:outline-dashed'
          required
          value={confirmPassword}
          minLength="8"
        />

        <div className='flex flex-col gap-4 items-center'>
          <div className="flex items-center text-sm md:text-base lg:text-lg">
            <input
              type="checkbox"
              id="checkbox"
              className="mr-2 h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500 rounded"
              checked={isChecked}
              onChange={handleCheckboxChange}
              required
            />
            <label htmlFor="checkbox" className="text-gray-300">
              I agree to <a href="https://support.backpack.exchange/en/articles/1030529" className='text-blue-400' target='_blank' rel="noopener noreferrer">Terms of Service</a>
            </label>
          </div>
          <button
            type='submit'
            className={`w-full sm:w-3/4 md:w-1/2 lg:w-1/6 py-2 px-4 rounded-md text-black ${isChecked ? 'bg-white hover:bg-gray-200' : 'bg-gray-600 cursor-not-allowed'}`}
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
