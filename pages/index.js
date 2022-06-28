import { useState } from 'react'
import styles from '../styles/Home.module.css'
import 'antd/dist/antd.css'
import Web3 from 'web3'
import { Button } from 'antd';

export default function Home() {
  const [web3, setWeb3] = useState();
  const [address, setAddress] = useState();
  
  const handleConnectWallet = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);
        const accounts = await web3.eth.getAccounts();
        setAddress(accounts[0]);
      } catch (err) {
        console.log("🚀 ~ file: index.js ~ line 20 ~ handleConnectWal ~ err", err.message);
      }
    } else {
      console.log("🚀 ~ file: index.js ~ line 23 ~ handleConnectWal ~ err", "MetaMask not found");
    }
  }

  return (
    <div className={styles.container}>
      <Button type="primary" onClick={handleConnectWallet}>Connect Wallet</Button>

      <div>Address: {address}</div>
    </div>
  )
}
