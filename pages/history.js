import styles from "../styles/Home.module.css";
import "antd/dist/antd.css";
import { Button, PageHeader, Image, Table, Row, Col } from "antd";
import { HomeOutlined, WalletOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { Footer } from "antd/lib/layout/layout";

export default function History() {
  const router = useRouter();
  const dataSource = [
    {
      key: "1",
      name: "User2",
      address: "0XAb",
    },
    {
      key: "2",
      name: "User1",
      address: "0XCD",
    },
  ];

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
          <Button key="1" type="primary" shape="round">
            <WalletOutlined />
            Kết nối Wallet
          </Button>,
        ]}
        avatar={{
          src: "./images/lottery.png",
        }}
      ></PageHeader>
      <div className={styles.headerTitle}>Lịch sử người chiến thắng</div>
      <Table dataSource={dataSource} columns={columns} />;
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
