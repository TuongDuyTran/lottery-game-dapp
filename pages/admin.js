import styles from "../styles/Home.module.css";
import "antd/dist/antd.css";
import { Button, Image, Col, Row, Card, message } from "antd";
import { GiftOutlined, SelectOutlined } from "@ant-design/icons";
import { Footer } from "antd/lib/layout/layout";
import DataContext from "../context/dataContext";
import { useState, useContext, useEffect } from "react";
import LayoutHeader from "../components/header";
import Swal from 'sweetalert2'

export default function Admin() {
  const [data, set_Data] = useContext(DataContext);
  const [lotteryContract, set_LotteryContract] = useState();
  const [address, setAddress] = useState();
  const [error, set_error] = useState();
  const [lotteryId, set_LotteryId] = useState();
  const [lotteryHistory, set_LotteryHistory] = useState([]);

  useEffect(() => {
    if (data.contract) {
      if (!lotteryContract || !address) {
        set_LotteryContract(data.contract);
        setAddress(data.address);
      }
      if (lotteryContract && address) {
        getLotteryId();
        getHistory(lotteryId);
      }
    }
    if (error) {
      handleError();
    }
  }, [lotteryContract, lotteryId, address, lotteryHistory]);

  const handlePickWinner = async () => {
    try {
      if (address) {
        await lotteryContract.methods.pickWinner().send({
          from: address,
          gas: 300000,
          gasPrice: null,
        });
        await lotteryContract.methods.lotteryHistory(lotteryId).call();
      }
    } catch (err) {
      message.error(err.message);
      console.log("🚀 ~ file: index.js ~ line 140 ~ startLottery ~ err", err);
    }
  };

  const handlePayWinner = async () => {
    try {
      if (address) {
        await lotteryContract.methods.payWinner().send({
          from: address,
          gas: 300000,
          gasPrice: null,
        });
        const winnerPay = await lotteryContract.methods
          .lotteryHistory(lotteryId)
          .call();
        Swal.fire({
          imageUrl: 'https://img.favpng.com/20/14/17/emoji-trophy-medal-computer-icons-png-favpng-jweW9nbsUNctL2mYF4VWV8qbC.jpg',
          imageWidth: 400,
          imageHeight: 200,
          title: `Winner`,
          text: `${winnerPay}`,
          showConfirmButton: false,
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        });
      }
    } catch (err) {
      message.error(err.message);
      console.log("🚀 ~ file: index.js ~ line 140 ~ startLottery ~ err", err);
    }
  };

  const getHistory = async (id) => {
    for (let i = parseInt(id); i > 0; i--) {
      const winner = await lotteryContract.methods.lotteryHistory(i).call();
      set_LotteryHistory([
        ...lotteryHistory,
        {
          key: id - i + 1,
          name: `https://etherscan.io/address/${winner}`,
          address: winner,
        },
      ]);
    }
  };

  const getLotteryId = async () => {
    const lotteryId = await lotteryContract.methods.lotteryId().call();
    set_LotteryId(lotteryId);
  };

  return (
    <div className={styles.mainContainer}>
      <LayoutHeader data={data} handleConnectWallet={{}} />

      <div className={styles.contentAdmin}>
        <Row gutter={12}>
          <Col span={6} offset={6}>
            <Card title="PICK WINNER" bordered={true} style={{ width: 400 }}>
              <div className={styles.cardAdmin}>
                <Image
                  src="/images/hinh3.jpg"
                  alt="Vercel Logo"
                  width={"100%"}
                  height={"100%"}
                  preview={false}
                />
                <div className={styles.buttonAdmin}>
                  <Button
                    className={styles.buttonPlayNow1}
                    type="danger"
                    shape="round"
                    icon={<SelectOutlined />}
                    size={"large"}
                    onClick={handlePickWinner}
                  >
                    PICK WINNER
                  </Button>
                </div>
              </div>
            </Card>
          </Col>
          <Col span={6} offset={1}>
            <Card title="PAY WINNER" bordered={true} style={{ width: 400 }}>
              <div className={styles.cardAdmin}>
                <Image
                  src="/images/hinh1.jpg"
                  alt="Vercel Logo"
                  width={"100%"}
                  height={"100%"}
                  preview={false}
                />
                <div className={styles.buttonAdmin}>
                  <Button
                    className={styles.buttonPlayNow1}
                    type="danger"
                    shape="round"
                    icon={<GiftOutlined />}
                    size={"large"}
                    onClick={handlePayWinner}
                  >
                    PAY WINNER
                  </Button>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
