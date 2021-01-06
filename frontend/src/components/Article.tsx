import { Avatar, Card, Tooltip, Image, Button, Space, message } from 'antd';
import React, { useState } from 'react';
import moment from 'moment';
import './style/Article.css';
import { HeartTwoTone, StopTwoTone } from '@ant-design/icons';
import api from '../utils/api';

const { Meta } = Card;

export interface Props {
	pk: number;
	source: string;
	title: string;
	link: string;
	date_published: Date;
	description?: string;
	image?: string;
	author?: string;
	source_icon?: string;
	source_name?: string;
}

export const Article: React.FC<Props> = (props) => {
	const [ heartVisible, setHeartVisible ] = useState<boolean>(false);
	const [ isHearted, setIsHearted ] = useState<boolean>(false);

	const heartButtonHandler = (): void => {
		api
			.post(`articles/${props.pk}/heart/`)
			.then((res) => {
				setIsHearted(!isHearted);
				message.success(res.data.message);
			})
			.catch((err) => {
				message.error('Error hearting article!');
			});
	};

	const dateContent = (
		<Space>
			{isHearted && <HeartTwoTone twoToneColor="#eb2f96" />}
			<Tooltip title={moment(props.date_published).format('L')}>
				<span>{moment(props.date_published).fromNow()}</span>
			</Tooltip>
		</Space>
	);

	const heartContent = isHearted ? (
		<Tooltip title="Remove heart">
			<Button icon={<StopTwoTone twoToneColor="#eb2f96" />} shape="circle" block onClick={heartButtonHandler} />
		</Tooltip>
	) : (
		<Tooltip title="Heart this article">
			<Button
				className="heart-icon"
				icon={<HeartTwoTone twoToneColor="#eb2f96" />}
				shape="circle"
				block
				onClick={heartButtonHandler}
			/>
		</Tooltip>
	);

	return (
		<div className="card">
			<Card
				style={{ width: 'flex' }}
				hoverable
				onMouseEnter={() => setHeartVisible(true)}
				onMouseLeave={() => setHeartVisible(false)}
				size="small"
				extra={heartVisible ? heartContent : dateContent}
				title={props.title}
			>
				<a href={props.link} target="_blank" rel="noreferrer">
					<Meta
						className="meta-img"
						avatar={<Image className="image" width={200} src={props.image} placeholder={true} preview={false} />}
						description={props.description}
					/>
				</a>
				{props.source_icon &&
				props.source_name && (
					<a href={`https://${props.source_name}`} target="_blank" rel="noreferrer">
						<Tooltip title={props.source_name}>
							<Avatar className="source-avatar" size="large" src={<Image src={props.source_icon} preview={false} />} />
						</Tooltip>
					</a>
				)}
			</Card>
		</div>
	);
};
