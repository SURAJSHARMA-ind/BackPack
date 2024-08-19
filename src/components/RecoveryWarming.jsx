import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function RecoveryWarming() {
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const warningText = [
        "I understand that I am responsible for saving my",
        "secret recovery phrase, and that it is the only way",
        "to recover my wallet."
    ];

    return (
        <div className="flex flex-col items-center justify-start gap-3 min-h-screen bg-black text-white p-6">
            <h2 className="text-4xl font-bold mb-4">Secret Recovery Phrase Warning</h2>
            <div className="mb-6 text-center">
                <p>On the next page, you will receive your secret recovery phrase.</p>
            </div>

            <div className="bg-gray-800 p-4 flex gap-3 rounded mb-4 w-full max-w-md">
                <img src="src/assets/warning.png" className="inline h-6" alt="Warning Icon" />
                <span>This is the ONLY way to recover your account if you lose access to your device or password.</span>
            </div>

            <div className="bg-gray-800 p-4 rounded flex gap-3 mb-6 w-full max-w-md">
                <img src="src/assets/lock.png" className="inline h-6" alt="Lock Icon" />
                <span>Write it down, store it in a safe place, and NEVER share it with anyone.</span>
            </div>

            <div className="flex items-center mb-6">
                <input
                    type="checkbox"
                    id="checkbox"
                    className="mr-4 h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500 rounded"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <div className="text-gray-200 text-lg">
                    {warningText.map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                </div>
            </div>

            <button
                onClick={() => { navigate('/secretphrase'); }}
                className={`w-1/4 py-2 px-4 rounded-md text-black ${isChecked ? 'bg-white hover:bg-gray-200' : 'bg-gray-600 cursor-not-allowed'}`}
                disabled={!isChecked}
            >
                Next
            </button>
        </div>
    );
}

export default RecoveryWarming;
