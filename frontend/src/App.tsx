import AppHeader from './components/Header';
import 'antd/dist/antd.css';
import React from 'react';
import { MenuInfo } from 'rc-menu/lib/interface';
import { Layout, Menu } from 'antd';
import './App.css';
import ArticleList from './components/ArticleList';
import LoginRequiredWrapper from './components/wrappers/LoginRequiredWrapper';
import { setHeaders } from './utils/api';
import TaggerInterface from './components/containers/TaggerInterface';

type activeContent = 'articleList' | 'notImplemented' | 'taggerInterface';

interface IState {
	content: activeContent;
	isLoggedIn: boolean;
}

export default class App extends React.Component<{}, IState> {
	constructor(props: {}) {
		super(props);

		this.state = {
			content: 'taggerInterface',
			isLoggedIn: false
		};
		setHeaders();
		this.handleMenuClick = this.handleMenuClick.bind(this);
		this.handleLogged = this.handleLogged.bind(this);
	}

	handleMenuClick(e: MenuInfo): void {
		this.setState({ content: e.key as activeContent });
	}

	handleLogged(logged: boolean) {
		this.setState({ isLoggedIn: logged });
	}

	getActiveContent() {
		switch (this.state.content) {
			case 'articleList': {
				return (
					<div className="main-content">
						<LoginRequiredWrapper loggedIn={this.state.isLoggedIn} content={<ArticleList />} />
					</div>
				);
			}
			case 'taggerInterface': {
				return (
					<div className="main-content">
						<TaggerInterface />
					</div>
				);
			}
			case 'notImplemented': {
				return (
					<div className="main-content">
						<div>Hello world!</div>
					</div>
				);
			}
		}
	}

	render() {
		return (
			<Layout>
				<AppHeader loginHandler={this.handleLogged} />
				<Layout>
					<Menu mode="horizontal" theme="light" selectedKeys={[ this.state.content ]}>
						<Menu.Item
							title="View the list of currently available articles."
							key="articleList"
							onClick={this.handleMenuClick}
						>
							Article list
						</Menu.Item>
						<Menu.Item title="Hello two!" key="notImplemented" onClick={this.handleMenuClick}>
							Analysis
						</Menu.Item>
						<Menu.Item title="Hello two!" key="taggerInterface" onClick={this.handleMenuClick}>
							Tagger Dashboard
						</Menu.Item>
					</Menu>
					<Layout style={{ padding: '12px 24px 24px' }}>{this.getActiveContent()}</Layout>
				</Layout>
			</Layout>
		);
	}
}

// export default App;
