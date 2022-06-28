import { useState } from "react";
import styles from "../styles/Home.module.css";
import "antd/dist/antd.css";
import Web3 from "web3";
import { Button, PageHeader, Carousel, Image } from "antd";
import { HistoryOutlined, WalletOutlined } from "@ant-design/icons";
import { useRouter } from 'next/router'

const contentStyle = {
  height: "240px",
  color: "#fff",
  lineHeight: "240px",
  textAlign: "center",
  background: "#364d79",
};

export default function Home() {
  const [web3, setWeb3] = useState();
  const [address, setAddress] = useState();
  const router = useRouter()

  const handleConnectWallet = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);
        const accounts = await web3.eth.getAccounts();
        setAddress(accounts[0]);
      } catch (err) {
        console.log(
          "🚀 ~ file: index.js ~ line 20 ~ handleConnectWal ~ err",
          err.message
        );
      }
    } else {
      console.log(
        "🚀 ~ file: index.js ~ line 23 ~ handleConnectWal ~ err",
        "MetaMask not found"
      );
    }
  };

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  return (
    <div>
      <PageHeader
        title="LOTTERY GAME"
        className="site-page-header"
        subTitle="Team Chicken"
        extra={[
          <Button key="2" type="danger" shape="round" onClick={() => router.push('/history')}>
            <HistoryOutlined />
            Lịch sử
          </Button>,
          <Button key="1" type="primary" shape="round">
            <WalletOutlined />
            Kết nối Wallet
          </Button>,
        ]}
        avatar={{
          src: "./images/lottery.png",
        }}
      ></PageHeader>

      <Carousel afterChange={onChange}>
        <div>
          <Image
            src="/images/hinh1.jpg"
            alt="Vercel Logo"
            width={'100%'}
            height={'360px'}
            preview={false}
          />
        </div>
        <div>
          <Image
            src="/images/hinh2.jpg"
            alt="Vercel Logo"
            width={'100%'}
            height={'360px'}
            preview={false}
          />
        </div>
        <div>
          <Image
            src="/images/hinh3.jpg"
            alt="Vercel Logo"
            width={'100%'}
            height={'360px'}
            preview={false}
          />
        </div>
      </Carousel>

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
