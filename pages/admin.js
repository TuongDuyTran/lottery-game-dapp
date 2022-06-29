
import styles from "../styles/Home.module.css";
import "antd/dist/antd.css";
import { Button, PageHeader, Image, Col, Row, Card } from "antd";
import { HomeOutlined, GiftOutlined, SelectOutlined } from "@ant-design/icons";
import { useRouter } from 'next/router'

export default function Admin() {
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
    }, ,
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

      <Row gutter={12}>
        <Col span={6} offset={6}>
          <Card title="PICK WINNER" bordered={true} style={{ width: 400 }}>
            <div className={styles.cardAdmin}>
              <Image
                src="/images/hinh2.jpg"
                alt="Vercel Logo"
                width={'100%'}
                height={'100%'}
                preview={false}
              />
              <div className={styles.buttonAdmin}>
              <Button className={styles.buttonPlayNow} type="primary" shape="round" icon={<SelectOutlined />} size={'large'} >PICK WINNER</Button>
              </div>
            </div>
            <div className={styles.messageAdmin}>Long dz</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="PAY WINNER" bordered={true} style={{ width: 400 }}>
            <div className={styles.cardAdmin}>
              <Image
                src="/images/hinh2.jpg"
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
    </div>
  );
}
