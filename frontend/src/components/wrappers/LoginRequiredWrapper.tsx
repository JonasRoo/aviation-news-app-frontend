import { Empty } from 'antd';
import React from 'react';

interface Props {
	loggedIn: boolean;
	content: React.ReactNode;
}

const LoginRequiredWrapper: React.FC<Props> = (props: Props) => {
	if (!props.loggedIn) {
		return <Empty description={<span>Please login to use this feature.</span>} />;
	}
	return <div>{props.content}</div>;
};

export default LoginRequiredWrapper;
