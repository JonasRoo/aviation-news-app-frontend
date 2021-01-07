import { Avatar, Card, Tooltip, Image, Button, Space, message } from 'antd';
import React, { useState } from 'react';
import moment from 'moment';
import './style/Article.css';
import { HeartTwoTone, StopTwoTone } from '@ant-design/icons';
import api from './api/api';

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
	hearted?: boolean;
	heartActionHandler: () => void;
}

export const Article: React.FC<Props> = (props) => {
	const [ inHover, setInHover ] = useState<boolean>(false);
	const [ isHearted, setIsHearted ] = useState<boolean>(props.hearted || false);

	const heartButtonHandler = (): void => {
		api
			.post(`articles/${props.pk}/heart/`)
			.then((res) => {
				setIsHearted(!isHearted);
				props.heartActionHandler();
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

	const heartContent = (
		<div className="tooltip">
			{isHearted ? (
				<Tooltip title="Remove heart">
					<Button
						className="heart-button"
						icon={<StopTwoTone twoToneColor="#eb2f96" />}
						shape="circle"
						block
						onClick={heartButtonHandler}
					/>
				</Tooltip>
			) : (
				<Tooltip title="Heart this article">
					<Button
						className="heart-button"
						icon={<HeartTwoTone twoToneColor="#eb2f96" />}
						shape="circle"
						block
						onClick={heartButtonHandler}
					/>
				</Tooltip>
			)}
		</div>
	);

	return (
		<div className="card">
			<Card
				style={{ width: 'flex' }}
				hoverable
				onMouseEnter={() => setInHover(true)}
				onMouseLeave={() => setInHover(false)}
				size="small"
				extra={inHover ? heartContent : dateContent}
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
