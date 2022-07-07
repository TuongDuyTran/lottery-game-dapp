import { OWNER_ADDRESS } from "../../config";
import { PageHeader, Button } from "antd";
import { useRouter } from 'next/router'
import { HistoryOutlined, WalletOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const LayoutHeader = ({ data, handleConnectWallet }) => {
    const router = useRouter()
    const [lstAction, set_LstAction] = useState([]);

    useEffect(() => {
        const dataIsOwner = data.address === OWNER_ADDRESS ? true : false;
        const dataIsView = {
            "/": {
                connect: true,
                history: true,
                admin: dataIsOwner,
                home: false
            },
            "/history": {
                connect: false,
                history: false,
                admin: dataIsOwner,
                home: true
            },
            "/admin": {
                connect: false,
                history: true,
                admin: false,
                home: true
            }
        }
        set_LstAction(lstBtnAction(dataIsView[router.pathname]));
    }, [data])

    const lstBtnAction = (isView) => {
        let lst = [];
        if (isView.connect) {
            lst.push(
                <Button key="1" type="primary" shape="round" onClick={handleConnectWallet}>
                    <WalletOutlined />
                    Connect Wallet
                </Button>
            );
        }
        if (isView.history) {
            lst.unshift(
                <Button key="2" type="danger" shape="round" onClick={() => router.push('/history')}>
                    <HistoryOutlined />
                    History
                </Button>
            )
        }
        if (isView.admin) {
            lst.unshift(
                <Button key="3" type="default" shape="round" onClick={() => router.push('/admin')}>
                    <UserOutlined />
                    Manage
                </Button>
            )
        }
        if (isView.home) {
            lst.push(
                <Button key="4" type="primary" shape="round" onClick={() => router.push('/')}>
                    <UserOutlined />
                    Home
                </Button>
            )
        }
        return lst;
    }

    return <PageHeader
    title="LOTTERY GAME"
    className="site-page-header"
    subTitle="Team Chicken"
    extra={lstAction}
    avatar={{
      src: "./images/lottery.png",
    }}
    style={{
        backgroundColor: 'rgba(255 255 255 / 72%)',
    }}
  ></PageHeader>
    
}

export default LayoutHeader;
