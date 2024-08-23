import { useState, React } from 'react'
import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
import { Keypair } from '@solana/web3.js';
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl"
import { Outlet } from 'react-router-dom';

function App() {
  
  return (
    <>
    <Outlet />
    </>
    
  )
}

export default App;
