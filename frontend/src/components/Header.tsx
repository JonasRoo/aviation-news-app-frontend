import PlaneIcon from '../icons/plane.png';
import { Layout, Image } from 'antd';
import React from 'react';
import Title from 'antd/lib/typography/Title';
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
		<Header className="header" style={{ position: 'relative', display: 'flex', flexDirection: 'row', width: '100%' }}>
			<Title style={{ color: 'white', display: 'flex', whiteSpace: 'nowrap' }}>AV Insights</Title>
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
			<div style={{ backgroundColor: 'red' }}>
				<LoginField loginHandler={handleLogin} />
			</div>
		</Header>
	);
};

export default AppHeader;
