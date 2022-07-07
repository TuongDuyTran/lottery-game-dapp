import styles from "../styles/Home.module.css";
import "antd/dist/antd.css";
import { Table } from "antd";
import DataContext from "../context/dataContext";
import { useState, useContext, useEffect } from "react";
import LayoutHeader from "../components/header";

export default function History() {
  const [data, set_Data] = useContext(DataContext);
  const [lotteryContract, set_LotteryContract] = useState();
  const [error, set_error] = useState();
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

  const getHistory = async (id) => {
    for (let i = parseInt(id); i > 0 ; i--) {
      const winner = await lotteryContract.methods.lotteryHistory(i).call();
      set_LotteryHistory(lotteryHistory => [...lotteryHistory, {key: parseInt(id) - i + 1, name: `https://etherscan.io/address/${winner}`, address: winner}])
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
      <LayoutHeader data={data} handleConnectWallet={{}} />

      <div className={styles.headerTitle}>Lịch sử người chiến thắng</div>
      <Table dataSource={lotteryHistory} columns={columns} />
      
    </div>
  );
}
