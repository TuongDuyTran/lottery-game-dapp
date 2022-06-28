import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import "antd/dist/antd.css";
import { Button, Dropdown, Menu, PageHeader, Row, Tag } from "antd";

export default function Home() {
  return (
    <div>
      <PageHeader
        title="LOTTERY GAME"
        className="site-page-header"
        subTitle="Team Chicken"
        extra={[
          <Button key="2">Lịch sử</Button>,
          <Button key="1" type="primary">
            Kết nối Wallet
          </Button>,
        ]}
        avatar={{
          src: "https://www.seekpng.com/png/detail/379-3796985_lottery-png.png",
        }}
      ></PageHeader>

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
