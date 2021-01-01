import PlaneIcon from "../icons/plane.png";
import { Menu } from "antd";
import { Layout } from "antd";
import { LaptopOutlined } from "@ant-design/icons";
import React from "react";
import Title from "antd/lib/typography/Title";
import Avatar from "antd/lib/avatar/avatar";

const { Header } = Layout;

const AppHeader: React.FC = () => {
    return (
        <Header className="header">
            <Title style={{ color: "white" }}>My App</Title>
            {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                <Menu.Item key="1">nav 1</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
            </Menu> */}
            <Avatar style={{ float: "right" }} />
        </Header>
    );
}

export default AppHeader;