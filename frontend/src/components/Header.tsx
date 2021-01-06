import Logo from '../icons/logo.png';
import { Layout, Image } from 'antd';
import React from 'react';
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
		<Header className="header" style={{ position: 'relative' }}>
			<Image
				src={Logo}
				style={{
					maxWidth: '100%',
					maxHeight: '100%',
					display: 'block',
					width: 'auto'
				}}
			/>
			<LoginField loginHandler={handleLogin} />
		</Header>
	);
};

export default AppHeader;
