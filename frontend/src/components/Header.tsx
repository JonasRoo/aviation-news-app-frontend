import PlaneIcon from "../icons/plane.png";
import { Layout } from "antd";
import React from "react";
import Title from "antd/lib/typography/Title";
import Avatar from "antd/lib/avatar/avatar";

const { Header } = Layout;

const AppHeader: React.FC<{}> = () => {
    return (
        <Header className="header">
            <Title style={{ color: "white" }}>
                My App
                <Avatar src={PlaneIcon} className="top-bar-avatar" />
            </Title>

        </Header>
    );
}

export default AppHeader;