import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import "antd/dist/antd.css";
import Web3 from "web3";
import { Button, PageHeader, Table, Image } from "antd";
import { HistoryOutlined, WalletOutlined, PlayCircleOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from 'next/router'
import initializeLotteryContract from "../blockchain/lottery";

export default function Home() {
  const router = useRouter();

  const [web3, setWeb3] = useState();
  const [address, setAddress] = useState();
  const [lotteryContract, set_LotteryContract] = useState();
  const [lotteryPot, set_LotteryPot] = useState();
  const [players, set_Players] = useState([]);
  const [dataSource, set_dataSource] = useState([
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
    {
      key: '4',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
    {
      key: '5',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '6',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ]);

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

        const lc = initializeLotteryContract(web3);
        set_LotteryContract(lc);
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

  useEffect(() => {
    if (lotteryContract) {
      getPot();
      getPlayers();
      set_dataSource(players.map((player, index) => {
        return {
          key: index + 1,
          name: `https://etherscan.io/address/${player}`,
          age: 20,
          address: player
        }
      }));
    }
      
  }, [lotteryContract, lotteryPot, players])

  const getPot = async () => {
    const pot = await lotteryContract.methods.getBalance().call();
    set_LotteryPot(pot);
  }

  const getPlayers = async () => {
    const players = await lotteryContract.methods.getPlayers().call();
    set_Players(players);
    
  }

  const handleEnterLottery = async () => {
    try {
      await lotteryContract.methods.enter().send({
        from: address,
        value: '10000000000000000',
        gas: 3000000,
        gasPrice: null
      })
    } catch (err) {
      console.log("🚀 ~ file: index.js ~ line 140 ~ startLottery ~ err", err)
    }
    
  }

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
          <Button key="1" type="primary" shape="round" onClick={handleConnectWallet}>
            <WalletOutlined />
            Kết nối Wallet
          </Button>,
        ]}
        avatar={{
          src: "./images/lottery.png",
        }}
      ></PageHeader>

      <h2 style={{ textAlign: 'center' }}>Pot: {lotteryPot}</h2>

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

        <Button className={styles.buttonPlayNow} 
                type="primary" 
                shape="round" 
                icon={<PlayCircleOutlined />} 
                size={'large'} 
                onClick={handleEnterLottery}>PLAY NOW</Button>

        <div className={styles.contentTable}>
          <div className={styles.tableScroll}>
            <Table dataSource={dataSource} columns={columns} />
          </div>
        </div>
      </div>

      
    </div>
  );
}
