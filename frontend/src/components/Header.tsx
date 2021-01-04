import PlaneIcon from '../icons/plane.png';
import { Layout, Image } from 'antd';
import React, { useState } from 'react';
import Title from 'antd/lib/typography/Title';
// import GoogleLoginField from './GoogleLoginField';
import LoginField from './LoginField';

const { Header } = Layout;

interface Props {
	loginHandler: (logged: boolean) => void;
}

const AppHeader: React.FC<Props> = (props) => {
	const handleLogin = (loggedIn: boolean) => {
		props.loginHandler(loggedIn);
	};

	return (
		<Header className="header" style={{ position: 'relative', display: 'flex', flexDirection: 'row' }}>
			<Title style={{ color: 'white' }}>My App</Title>
			<Image
				preview={false}
				src={PlaneIcon}
				style={{
					objectFit: 'contain',
					maxWidth: '100%',
					maxHeight: '100%',
					display: 'block',
					width: 'auto',
					height: 'auto',
					padding: '10px'
				}}
			/>
			<LoginField loginHandler={handleLogin} />
		</Header>
	);
};

export default AppHeader;
