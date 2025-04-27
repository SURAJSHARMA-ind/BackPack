import { createSlice } from "@reduxjs/toolkit";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";


const initialState = {
  mnemonic: "",
  wallets: [],
  count: 0,
};

export const seedGeneratorSlice = createSlice({
  name: "seedGenerator",
  initialState,
  reducers: { 
    MnemonicGenerator: (state) => {
      const mnemonicphrase = generateMnemonic();
      state.mnemonic = mnemonicphrase;
      // console.log(`Generated mnemonic: ${mnemonicphrase}`);
      // localStorage.setItem("mnemonic", mnemonicphrase);  // for testing purpose
    },

    updateMnemonics: (state, actions) => {
      state.mnemonic = actions.payload
      console.log('update Mnemonics', state.mnemonic)
    },

    generateKeyPairs: (state) => {
      const mnemonic = state.mnemonic
      if (typeof mnemonic !== "string" || mnemonic.trim() === "") {
        console.error("Invalid mnemonic:", mnemonic);
        return; 
      }
      const seed = mnemonicToSeedSync(mnemonic);
      console.log('Seed is ',seed)
      const path = `m/44'/501'/${state.count}'/0'`;
      const derivedSeed = derivePath(path, seed.toString("hex")).key;
      const keypair = nacl.sign.keyPair.fromSeed(derivedSeed);

      const publicKey = Keypair.fromSecretKey(
        keypair.secretKey
      ).publicKey.toBase58();
      const privateKey = Buffer.from(keypair.secretKey).toString("hex");

      state.wallets.push({ publicKey, privateKey });
      // const wallets = state.wallets;
      // localStorage.setItem("wallets", wallets);  for testing will remove

      state.count += 1;
    },

  },
});

export const { MnemonicGenerator, generateKeyPairs, updateMnemonics } =
  seedGeneratorSlice.actions;
export default seedGeneratorSlice.reducer;
