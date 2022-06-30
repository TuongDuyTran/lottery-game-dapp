
import styles from "../styles/Home.module.css";
import "antd/dist/antd.css";
import { Button, PageHeader, Image, Col, Row, Card, message } from "antd";
import { HomeOutlined, GiftOutlined, SelectOutlined } from "@ant-design/icons";
import { useRouter } from 'next/router'
import { Footer } from "antd/lib/layout/layout";
import DataContext from "../context/dataContext";
import { useState, useContext, useEffect } from "react";

export default function Admin() {
  const router = useRouter();
  const [data, set_Data] = useContext(DataContext);
  const [lotteryContract, set_LotteryContract] = useState();
  const [address, setAddress] = useState();
  const [error, set_error] = useState();
  const [successMsg, set_successMsg] = useState();

  useEffect(() => {
    if (data.contract) {
      if(!lotteryContract) {
        set_LotteryContract(data.contract);
      }
      if(lotteryContract){
        console.log(lotteryContract);
      }
    }
    if(error) {
      handleError();
    }
      
  },[lotteryContract]);
  
  const handlePickWinner = async() => {
    try {
      await lotteryContract.methods.payWinner().send({
        from: address,
        gas: 300000,
        gasPrice: null
      })
    } catch (err) {
      message.error(err.message);
      console.log("🚀 ~ file: index.js ~ line 140 ~ startLottery ~ err", err)
    }
  }

  return (
    <div className={styles.mainContainer}>
      <PageHeader
        title="LOTTERY GAME"
        className="site-page-header"
        subTitle="Trang quản lý"
        extra={[
          <Button key="2" type="danger" shape="round" onClick={() => router.push('/')}>
            <HomeOutlined />
            Trang chủ
          </Button>
        ]}
        avatar={{
          src: "./images/lottery.png",
        }}
      ></PageHeader>

    <div className={styles.headerTitle}>Lịch sử người chiến thắng</div>

      <Row gutter={12}>
        <Col span={6} offset={6}>
          <Card title="PICK WINNER" bordered={true} style={{ width: 400 }}>
            <div className={styles.cardAdmin}>
              <Image
                src="/images/hinh3.jpg"
                alt="Vercel Logo"
                width={'100%'}
                height={'100%'}
                preview={false}
              />
              <div className={styles.buttonAdmin}>
              <Button className={styles.buttonPlayNow1} type="danger" shape="round" icon={<SelectOutlined />} size={'large'} onClick={handlePickWinner} >PICK WINNER</Button>
              </div>
            </div>
            <div className={styles.messageAdmin}>Long dz</div>
          </Card>
        </Col>
        <Col span={6} offset={1}>
          <Card title="PAY WINNER" bordered={true} style={{ width: 400 }}>
            <div className={styles.cardAdmin}>
              <Image
                src="/images/hinh1.jpg"
                alt="Vercel Logo"
                width={'100%'}
                height={'100%'}
                preview={false}
              />
              <div className={styles.buttonAdmin}>
              <Button className={styles.buttonPlayNow} type="primary" shape="round" icon={<GiftOutlined />} size={'large'} >PAY WINNER</Button>
              </div>
            </div>
            <div className={styles.messageAdmin}>Long dz</div>
          </Card>
        </Col>
      </Row>

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
