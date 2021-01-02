import AppHeader from "./components/Header";
import 'antd/dist/antd.css';
import React from 'react';
import { Layout, Menu, Tabs } from "antd";
import { LaptopOutlined, UserOutlined } from "@ant-design/icons";
import './App.css';
import SubMenu from 'antd/lib/menu/SubMenu';
import ArticleList from "./components/ArticleList";

const { TabPane } = Tabs;
const { Sider, Content } = Layout;

export default class App extends React.Component<{}> {

  render() {
    return (
      <Layout>
        <AppHeader />
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                <Menu.Item key="1">option1</Menu.Item>
                <Menu.Item key="2">option2</Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>
              <Menu.Item key="item2" icon={<LaptopOutlined />} title="item">Item</Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Tabs defaultActiveKey="1" animated={{ inkBar: true, tabPane: true }}>
              <TabPane
                tab={
                  <span>Articles</span>
                }
                key="1">
                <Content
                  className="site-layout-background"
                  style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                  }}
                >
                  <ArticleList />
                </Content>
              </TabPane>
              <TabPane
                tab={
                  <span>Stats</span>
                }
                key="2">
                <Content
                  className="site-layout-background"
                  style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                    transition: "height 0.3s ease"
                  }}
                >
                  Hello
        </Content>
              </TabPane>
            </Tabs>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

// export default App;
