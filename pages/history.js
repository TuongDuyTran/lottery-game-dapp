
import styles from "../styles/Home.module.css";
import "antd/dist/antd.css";
import { Button, PageHeader, Image, Table } from "antd";
import { HomeOutlined, WalletOutlined } from "@ant-design/icons";
import { useRouter } from 'next/router'

export default function History() {
  const router = useRouter();
  const dataSource = [
    {
      key: '1',
      name: 'User2',
      address: '0XAb',
    },
    {
      key: '2',
      name: 'User1',
      address: '0XCD',
    },
  ];
  
  const columns = [
    {
        title: 'STT',
        dataIndex: 'key',
        key: 'key',
      },,
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];


  return (
    <div>
      <PageHeader
        title="LOTTERY GAME"
        className="site-page-header"
        subTitle="Team Chicken"
        extra={[
          <Button key="2" type="danger" shape="round" onClick={() => router.push('/')}>
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
        <Table dataSource={dataSource} columns={columns} />;

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
