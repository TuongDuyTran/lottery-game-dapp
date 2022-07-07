import { useState, useEffect, useContext } from "react";
import styles from "../styles/Home.module.css";
import "antd/dist/antd.css";
import Web3 from "web3";
import { Button, PageHeader, Table, Image, message } from "antd";
import { HistoryOutlined, WalletOutlined, PlayCircleOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from 'next/router'
import initializeLotteryContract from "../blockchain/lottery";
import DataContext from "../context/dataContext";
import LayoutHeader from "../components/header";

export default function Home() {
  const router = useRouter();
  const [data, set_Data] = useContext(DataContext);
  const [web3, setWeb3] = useState();
  const [address, setAddress] = useState();
  const [lotteryContract, set_LotteryContract] = useState();
  const [lotteryPot, set_LotteryPot] = useState();
  const [players, set_Players] = useState([]);
  const [dataSource, set_dataSource] = useState([]);
  const [error, set_error] = useState();
  const [successMsg, set_successMsg] = useState();

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

  const handleError = () => {
    if(error){
      message.error(error);
      set_error('');
    }
  };

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
        set_Data({contract: lc, address: accounts[0]});
        window.ethereum.on('accountsChanged', async() => {
          const accounts = await web3.eth.getAccounts();
          setAddress(accounts[0]);
        });
      } catch (err) {
        set_error(err.message);
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
    if (lotteryContract || data.contract) {
      if(!lotteryContract) {
        set_LotteryContract(data.contract);
      }
      updateState();
    }
    if(error) {
      handleError();
    }
      
  }, [lotteryContract, lotteryPot, players, error]);

  const updateState = ()=> {
    if(lotteryContract){
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
  }

  const getPot = async () => {
    if(lotteryContract){
      const pot = await lotteryContract.methods.getBalance().call();
      set_LotteryPot(pot);
    }
  }

  const getPlayers = async () => {
    if(lotteryContract){
      const players = await lotteryContract.methods.getPlayers().call();
      set_Players(players);
    }
    
  }

  const handleEnterLottery = async () => {
    try {
      await lotteryContract.methods.enter().send({
        from: address,
        value: '2000000000000000',
        gas: 3000000,
        gasPrice: null
      });
      updateState();
    } catch (err) {
      message.error(err.message);
      console.log("🚀 ~ file: index.js ~ line 140 ~ startLottery ~ err", err)
    }
    
  }

  return (
    <div className={styles.mainContainer}>
      <LayoutHeader data={data} handleConnectWallet={handleConnectWallet} />

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
