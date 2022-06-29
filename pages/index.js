import { useState } from "react";
import styles from "../styles/Home.module.css";
import "antd/dist/antd.css";
import Web3 from "web3";
import { Button, PageHeader, Table, Image } from "antd";
import { HistoryOutlined, WalletOutlined, PlayCircleOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from 'next/router'

export default function Home() {
  const [web3, setWeb3] = useState();
  const [address, setAddress] = useState();
  const router = useRouter();

  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
    {
      key: '3',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    // {
    //   key: '4',
    //   name: 'John',
    //   age: 42,
    //   address: '10 Downing Street',
    // },
    // {
    //   key: '5',
    //   name: 'Mike',
    //   age: 32,
    //   address: '10 Downing Street',
    // },
    // {
    //   key: '6',
    //   name: 'John',
    //   age: 42,
    //   address: '10 Downing Street',
    // },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

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
    <div className={styles.mainContainer}>
      <PageHeader
        title="LOTTERY GAME"
        className="site-page-header"
        subTitle="Team Chicken"
        extra={[
          <Button key="3" type="primary" shape="round" onClick={() => router.push('/admin')}>
            <UserOutlined />
            Quản lý
          </Button>,
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

      <div className={styles.contentLottery}>
        <div className={styles.imageLogo}>
          <Image
            src="/images/hinh2.jpg"
            alt="Vercel Logo"
            width={'100%'}
            height={'100%'}
            preview={false}
          />
        </div>

        <Button className={styles.buttonPlayNow} type="primary" shape="round" icon={<PlayCircleOutlined />} size={'large'} >PLAY NOW</Button>

      

        <div className={styles.contentTable}>
          <Table dataSource={dataSource} columns={columns} />
        </div>
      </div>


    </div>
  );
}
