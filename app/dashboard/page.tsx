'use client'

import { ethers } from "ethers";

// react hooks for setting and changing states of variables
import { useEffect, useState } from 'react';

import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react'
import { BrowserProvider, Contract } from 'ethers'


export default function Home() {

  const [storedNumber, setStoredNumber] = useState<number>();
  const [storedString, setStoredString] = useState<string>("-");


  const [enteredNumber, setEnteredNumber] = useState<number>(0);
  const [enteredString, setEnteredString] = useState<string>("");
  

  const [storeLoader, setStoreLoader] = useState(false)
  const [storeLoaderString, setStoreLoaderString] = useState(false)

  const [retrieveLoader, setRetrieveLoader] = useState(false)
  const [retrieveLoaderString, setRetrieveLoaderString] = useState(false)


  const { address, chainId, isConnected } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()



  const contract_address = "0xB8875D4c6d0c09aa517A507d8F57829a98A07e94";
  const abi = [
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_num",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "_str",
            "type": "string"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [],
        "name": "readNum",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "readString",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_num",
            "type": "uint256"
          }
        ],
        "name": "writeNum",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_str",
            "type": "string"
          }
        ],
        "name": "writeString",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
   ]


   async function readString() {

    try {
      setRetrieveLoaderString(true)
    
      if(walletProvider !== undefined) {
          const ethersProvider = new BrowserProvider(walletProvider)
          const signer = await ethersProvider.getSigner()

          if(abi != undefined) {     
              const contract = new Contract(contract_address, abi, signer)
              const response = await contract.readString();              

              setStoredString(response)
              setRetrieveLoaderString(false)
              return
          }
      } else {
        alert("Expecting browser injected wallet, which was not found")
      }
      setRetrieveLoaderString(false)
    } catch (error) {
      setRetrieveLoaderString(false)
      return
    }



      setRetrieveLoaderString(false);

   }


  async function readNumber() {

    try {
      setRetrieveLoader(true)
    
      if(walletProvider !== undefined) {
          const ethersProvider = new BrowserProvider(walletProvider)
          const signer = await ethersProvider.getSigner()

          if(abi != undefined) {     
              const USDTContract = new Contract(contract_address, abi, signer)
              const response = await USDTContract.readNum()              

              setStoredNumber(parseInt(response))
              setRetrieveLoader(false)
              return
          }
      } else {
        alert("Expecting browser injected wallet, which was not found")
      }
      setRetrieveLoader(false)
    } catch (error) {
      setRetrieveLoader(false)
      return
    }

  }
  

  async function writeNumber() {
    try {

      setStoreLoader(true)

      if(walletProvider != null) {
          const ethersProvider = new BrowserProvider(walletProvider)
          const signer = await ethersProvider.getSigner()

          if(abi != undefined) {     
              const USDTContract = new Contract(contract_address, abi, signer)

              const writeNumTX = await USDTContract.writeNum(enteredNumber);
              const response = await writeNumTX.wait()

              setStoredNumber(parseInt(response))
              setStoreLoader(false)
              return
          }
      } else {
        alert("Expecting browser injected wallet, which was not found")
      }

      setStoreLoader(false)
      return

    } catch (error) {
      alert(error)
      setStoreLoader(false)
      return
    }
  }


  async function writeString() {
    try {

      setStoreLoaderString(true)

      if(walletProvider != null) {
          const ethersProvider = new BrowserProvider(walletProvider)
          const signer = await ethersProvider.getSigner()

          if(abi != undefined) {     
              const contract = new Contract(contract_address, abi, signer)

              const writeNumTX = await contract.writeString(enteredString);
              const response = await writeNumTX.wait()

              setStoredString(response)
              setStoreLoaderString(false)
              return
          }
      } else {
        alert("Expecting browser injected wallet, which was not found")
      }

      setStoreLoaderString(false)
      return

    } catch (error) {
      alert(error)
      setStoreLoaderString(false)
      return
    }
  }

  

  useEffect(() => {

  }, [])


  return (
    <div className='m-6 space-y-4'>
      <h1 className="text-gray-700 text-3xl font-bold">
        Storage Frontend Demo
      </h1>

      <w3m-button />
      { isConnected ? ( <span>Connnected with address {address} and Chain ID {chainId}</span> ) : ( <span>Connect with your browser wallet</span> ) }
      <br /><br />

      Sepolia testnet 
      <br />
      Deployed Smart Contract being used address - { contract_address }

      <br /><br /><hr /><br />

      <strong>
          Setting / Retriving "Number Value" from blockchain
      </strong>
      <h3>This action retrieves the saved number from smart contract. (i.e Read Operation)</h3>
      <button className='px-4 py-1 bg-slate-300 hover:bg-slate-500 flex justify-around transition-all w-32' onClick={()=>readNumber()}> { retrieveLoader ? (
                  <svg
                    className="animate-spin m-1 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75 text-gray-700"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
              ): "RETRIEVE"} </button>  

      { retrieveLoader ? ( <span>Fetching data from blockchain ....</span> ) : (<span></span>) }

      <h4>The stored number is <span className='font-bold'>{storedNumber ? storedNumber : 0}</span> </h4>
      <hr></hr>

      <h3>This action saves entered number into the smart contract. (i.e Write Operation) </h3>
      <div>
        <input onChange={(e)=>{
          setEnteredNumber( parseInt( e.target.value ) );
        }} className="placeholder:italic transition-all placeholder:text-gray-500 w-4/6 border border-gray-500 rounded-md p-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Enter a number to store" type="text" name="store"/>
      </div>
      <button onClick={writeNumber} className='px-4 py-1 bg-slate-300 flex justify-around hover:bg-slate-500 transition-all w-32'> { storeLoader ? (
                  <svg
                    className="animate-spin m-1 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75 text-gray-700"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
              ): "STORE"} </button>
      { storeLoader ? ( <span>Saving data to blockchain ....</span> ) : (<span></span>) }



      <br /><br /><hr /><br /><br />




      <strong>Setting / Retriving "String Value" from blockchain</strong>
      <h3>This action retrieves the saved string from smart contract. (i.e Read Operation)</h3>
      <button className='px-4 py-1 bg-slate-300 hover:bg-slate-500 flex justify-around transition-all w-32' onClick={()=>readString()}> { retrieveLoaderString ? (
                  <svg
                    className="animate-spin m-1 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75 text-gray-700"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
              ): "RETRIEVE"} </button>  

      { retrieveLoaderString ? ( <span>Fetching data from blockchain ....</span> ) : (<span></span>) }

      <h4>The stored string is <span className='font-bold'>{storedString ? storedString : ""}</span> </h4>
      <hr></hr>


      <h3>This action saves entered string into the smart contract. (i.e Write Operation) </h3>
      <div>
        <input onChange={(e)=>{
          setEnteredString( e.target.value );
        }} className="placeholder:italic transition-all placeholder:text-gray-500 w-4/6 border border-gray-500 rounded-md p-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Enter a string to store" type="text" name="store"/>
      </div>
      <button onClick={writeString} className='px-4 py-1 bg-slate-300 flex justify-around hover:bg-slate-500 transition-all w-32'> { storeLoaderString ? (
                  <svg
                    className="animate-spin m-1 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75 text-gray-700"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
              ): "STORE"} </button>
      { retrieveLoaderString ? ( <span>Saving data to blockchain ....</span> ) : (<span></span>) }


    </div>
  )
}