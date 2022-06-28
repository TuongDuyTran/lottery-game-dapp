import { useState } from 'react'
import styles from '../styles/Home.module.css'
import 'antd/dist/antd.css'
import Web3 from 'web3'
import { Button, Dropdown, Menu, PageHeader, Row, Tag } from "antd";
import Image from 'next/image'

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
    <div>
      <PageHeader
        title="LOTTERY GAME"
        className="site-page-header"
        subTitle="Team Chicken"
        extra={[
          <Button key="2">Lịch sử</Button>,
          <Button key="1" type="primary">
            Kết nối Wallet
          </Button>,
        ]}
        avatar={{
          src: "./images/lottery.png",
        }}
      ></PageHeader>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
