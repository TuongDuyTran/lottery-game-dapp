import styles from "../styles/Home.module.css";
import "antd/dist/antd.css";
import { Button, PageHeader, Table } from "antd";
import { HomeOutlined, WalletOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { Footer } from "antd/lib/layout/layout";
import DataContext from "../context/dataContext";
import { useState, useContext, useEffect } from "react";
import Web3 from "web3";
import initializeLotteryContract from "../blockchain/lottery";

export default function History() {
  const router = useRouter();
  const [data, set_Data] = useContext(DataContext);
  const [web3, setWeb3] = useState();
  const [lotteryContract, set_LotteryContract] = useState();
  const [address, setAddress] = useState();
  const [error, set_error] = useState();
  const [successMsg, set_successMsg] = useState();
  const [lotteryHistory, set_LotteryHistory] = useState([]);
  const [lotteryId, set_LotteryId] = useState();

  useEffect(() => {
    if (lotteryContract || data.contract) {
      if(!lotteryContract) {
        set_LotteryContract(data.contract);
      }
      if(lotteryContract){
        getLotteryId();
        getHistory(lotteryId);
      }
    }
    if(error) {
      handleError();
    }
      
  },[lotteryContract, lotteryId]);

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
        set_Data({contract: lc});
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

  const getHistory = async (id) => {
    for (let i = parseInt(id); i > 0 ; i--) {
      const winner = await lotteryContract.methods.lotteryHistory(i).call();
      set_LotteryHistory([...lotteryHistory, {key: id-i+1, name: `https://etherscan.io/address/${winner}`, address: winner}])
    }
  }

  const getLotteryId = async() => {
    const lotteryId = await lotteryContract.methods.lotteryId().call();
    set_LotteryId(lotteryId);
  }

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
    },
    ,
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <div className={styles.mainContainer}>
      <PageHeader
        title="LOTTERY GAME"
        className="site-page-header"
        subTitle="Lịch sử người chiến thắng"
        extra={[
          <Button
            key="2"
            type="danger"
            shape="round"
            onClick={() => router.push("/")}
          >
            <HomeOutlined />
            Trang chủ
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
      <div className={styles.headerTitle}>Lịch sử người chiến thắng</div>
      <Table dataSource={lotteryHistory} columns={columns} />;
      <Footer className={styles.footerPage}>

        <div className={styles.copyRight}>
          © 2022 Copyright:
          <a className="text-white" href="#">
            Chicken.com
          </a>
        </div>
      </Footer>
    </div>
  );
}
