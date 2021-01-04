import PlaneIcon from '../icons/plane.png';
import { Layout, Image } from 'antd';
import React from 'react';
import Title from 'antd/lib/typography/Title';
import GoogleLoginField from './GoogleLoginField';

const { Header } = Layout;

const AppHeader: React.FC<{}> = () => {
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
			<GoogleLoginField />
		</Header>
	);
};

export default AppHeader;
