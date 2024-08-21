import { useState, React } from 'react'
import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
import { Keypair } from '@solana/web3.js';
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl"
import { Outlet } from 'react-router-dom';
function App() {
  const [wallets, setWallets] = useState([]); // Renamed to `wallets` to reflect the array nature
  const [mnemonic, setMnemonic] = useState("");
  const [count, setCount] = useState(0);

  const MnemonicGenerator = () => {
    const mnemonicphrase = generateMnemonic();
    setMnemonic(mnemonicphrase);
    console.log(`Generated mnemonic: ${mnemonicphrase}`);
  };

  const generateKeyPairs = () => {
    const seed = mnemonicToSeedSync(mnemonic);
    const path = `m/44'/501'/${count}'/0'`; 
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const keypair = nacl.sign.keyPair.fromSeed(derivedSeed);

    const publicKey = Keypair.fromSecretKey(keypair.secretKey).publicKey.toBase58();
    const privateKey = Buffer.from(keypair.secretKey).toString('hex');

  
    setWallets([...wallets, { publicKey, privateKey }]);
    setCount(count + 1); 

    console.log("Public Key:", publicKey);
    console.log("Private Key:", privateKey);
  };

  return (
    <>
    <Outlet />
    </>
    // <div className='h-screen bg-black text-white'>
    //   <button onClick={MnemonicGenerator} className='rounded border-solid bg-gray-400 p-3'>Generate Mnemonic</button>
    //   <button onClick={generateKeyPairs} className='rounded border-solid bg-gray-400 p-3'>Generate Key Pairs</button>

    //   <div className="container">
    //     <p>Mnemonic: {mnemonic}</p>
    //     {wallets.map((wallet, index) => (
    //       <div className="container" key={index}>
    //         <p>Public Key: {wallet.publicKey}</p>
    //         <p>Private Key: {wallet.privateKey}</p>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  )
}

export default App;
