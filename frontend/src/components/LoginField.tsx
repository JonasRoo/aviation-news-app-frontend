import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Popover, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import api, { setHeaders, checkIfLoggedIn } from '../utils/api';

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

	useEffect(() => {
		// make a call to the `auth/user` endpoint and check if we get a valid response
		checkIfLoggedIn((loggedIn) => {
			setLoggedIn(loggedIn);
			props.loginHandler(loggedIn);
		});
		console.log(loggedIn);
	}, []);

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

	const handleLoginSubmit = (values: ILoginInfo) => {
		api
			.post('/auth/login/', values)
			.then((res) => {
				setAuthCredentials(res.data.token, res.data.username);
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
					right: '150px',
					height: '40px',
					top: '20%'
				}}
			>
				Login
			</Button>
		</Popover>
	);

	const buttonWhenLoggedIn = (
		<div>
			<span style={{ paddingRight: '5px' }}>{`Welcome back, ${userName}!`}</span>
			<Button
				type="primary"
				shape="round"
				onClick={handleLogoutSubmit}
				icon={<UserOutlined twoToneColor="#52c41a" />}
				style={{
					position: 'absolute',
					right: '150px',
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
