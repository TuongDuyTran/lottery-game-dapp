import styles from "../styles/Home.module.css";
import "antd/dist/antd.css";
import { Table } from "antd";
import DataContext from "../context/dataContext";
import { useState, useContext, useEffect } from "react";
import LayoutHeader from "../components/header";
import random from 'random-key-generator' 

export default function History() {
  const [data, set_Data] = useContext(DataContext);
  const [lotteryContract, set_LotteryContract] = useState();
  const [error, set_error] = useState();
  const [lotteryHistory, set_LotteryHistory] = useState([]);
  const [lotteryId, set_LotteryId] = useState();
  const [isFirstCall, set_IsFirstCall] = useState(false);

  useEffect(() => {
    if (lotteryContract || data.contract) {
      if(!lotteryContract) {
        set_LotteryContract(data.contract);
      }
      if(lotteryContract && !isFirstCall){
        getLotteryId();
        getHistory(lotteryId);
      }
    }
    if(error) {
      handleError();
    }
      
  },[lotteryContract, lotteryId]);

  const getHistory = async (id) => {
    for (let i = parseInt(id) - 1; i > 0 ; i--) {
      const winner = await lotteryContract.methods.lotteryHistory(i).call();
      set_LotteryHistory(lotteryHistory => [...lotteryHistory, { key: random(10).toString(), address: winner }]);
      if (i - 1 == 0) {
        set_IsFirstCall(true);
      }
    }
  }

  const getLotteryId = async() => {
    const lotteryId = await lotteryContract.methods.lotteryId().call();
    set_LotteryId(lotteryId);
  }

  const columns = [
    {
      title: "Winner",
      dataIndex: "address",
      key: "address",
      render: text => {
        const href = `https://etherscan.io/address/${text}`;
        return <a href={href}>{text}</a>
      }
    },
  ];

  return (
    <div className={styles.mainContainer}>
      <LayoutHeader data={data} handleConnectWallet={{}} />
      <div className={styles.contentHistory}>
        <Table dataSource={lotteryHistory} columns={columns}  />
      </div>
    </div>
  );
}
