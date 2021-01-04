import { Button, Popover } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline, GoogleLogout } from 'react-google-login';
import { useCookies } from 'react-cookie';

const GoogleLoginField: React.FC<{}> = () => {
	const [ loggedIn, setLoggedIn ] = useState<boolean>(false);

	const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
	if (!googleClientId) {
		throw new Error("Can't read Google client ID from env vars!");
	}
	const successGoogleResponseHandler = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
		console.log(res);
		setLoggedIn(true);
	};

	const failedGoogleResponseHandler = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
		console.log(res);
	};

	const successGoogleLogoutResponseHandler = () => {
		setLoggedIn(false);
	};

	const googleLoginPopOut = (
		<GoogleLogin
			clientId={googleClientId}
			onSuccess={successGoogleResponseHandler}
			onFailure={failedGoogleResponseHandler}
			theme="dark"
		/>
	);

	if (!loggedIn) {
		return (
			<Popover trigger="click" content={googleLoginPopOut}>
				<Button
					type="primary"
					shape="round"
					icon={<UserOutlined twoToneColor="#52c41a" />}
					style={{
						position: 'absolute',
						right: '20px',
						height: '40px',
						top: '20%'
					}}
				>
					Login
				</Button>
			</Popover>
		);
	} else {
		return (
			<GoogleLogout
				clientId={googleClientId}
				onLogoutSuccess={successGoogleLogoutResponseHandler}
				buttonText="Logout"
			/>
		);
	}
};

export default GoogleLoginField;
