import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Popover, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import api, { setHeaders, getCurrentUser } from '../utils/api';

interface ILoginInfo {
	username: string;
	password: string;
}

interface Props {
	loginHandler: (logged: boolean) => void;
}

const LoginField: React.FC<Props> = (props) => {
	const [ loggedIn, setLoggedIn ] = useState<boolean>(false);
	const [ userName, setUserName ] = useState<string | undefined>();

	useEffect(
		() => {
			// make a call to the `auth/user/` endpoint and check if we get a valid response
			getCurrentUser((user) => {
				console.log('user=', user);
				const logged = user !== undefined ? true : false;
				setLoggedIn(logged);
				props.loginHandler(logged);
				if (user) {
					setUserName(user.username);
				}
			});
			console.log(loggedIn);
		},
		// eslint-disable-next-line
		[ loggedIn ]
	);

	const setAuthCredentials = (token?: string, username?: string): void => {
		if (!token) {
			localStorage.removeItem('authToken');
			setUserName(undefined);
			setHeaders();
			setLoggedIn(false);
		} else {
			localStorage.setItem('authToken', token);
			setUserName(username);
			setHeaders();
			setLoggedIn(true);
		}
	};

	const handleLoginSubmit = (values: ILoginInfo): void => {
		api
			.post('/auth/login/', values)
			.then((res) => {
				setAuthCredentials(res.data.token, res.data.user.username);
				props.loginHandler(true);
			})
			.catch((_) => {
				setAuthCredentials();
				props.loginHandler(false);
				message.error('Wrong login credentials!');
			});
	};

	const handleLogoutSubmit = () => {
		api.post('/auth/logout/').then((_) => {
			setAuthCredentials();
			props.loginHandler(false);
		});
	};

	const loginFormPopout = (
		<Form
			onFinish={(values: ILoginInfo) => {
				handleLoginSubmit(values);
			}}
		>
			<Form.Item
				label="Username"
				name="username"
				rules={[ { required: true, message: 'Please input your username!' } ]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				label="Password"
				name="password"
				rules={[ { required: true, message: 'Please input your password!' } ]}
			>
				<Input.Password visibilityToggle={false} />
			</Form.Item>
			<Button type="primary" htmlType="submit" style={{ margin: 'auto', display: 'table', paddingTop: '5px' }}>
				Submit
			</Button>
		</Form>
	);

	const buttonWhenLoggedOut = (
		<Popover trigger="click" content={loginFormPopout}>
			<Button
				type="primary"
				shape="round"
				icon={<UserOutlined twoToneColor="#52c41a" />}
				style={{
					position: 'absolute',
					right: '10%',
					height: '40px',
					top: '20%'
				}}
			>
				Login
			</Button>
		</Popover>
	);

	const buttonWhenLoggedIn = (
		<div style={{ justifyContent: 'right', position: 'absolute', right: '150px' }}>
			<span style={{ marginRight: '20px', color: 'white' }}>{`Welcome back, ${userName}!`}</span>
			<Button
				type="primary"
				shape="round"
				onClick={handleLogoutSubmit}
				icon={<UserOutlined twoToneColor="#52c41a" />}
				style={{
					position: 'relative',
					right: '10%',
					height: '40px',
					top: '20%'
				}}
			>
				Logout
			</Button>
		</div>
	);

	return loggedIn ? buttonWhenLoggedIn : buttonWhenLoggedOut;
};

export default LoginField;
