import { Avatar, Card, Tooltip, Image } from 'antd';
import React from 'react';
import moment from 'moment';
import './style/Article.css';

const { Meta } = Card;

export interface Props {
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
	return (
		<div className="card">
			<Card
				style={{ width: 'flex' }}
				hoverable
				size="small"
				extra={
					<Tooltip title={moment(props.date_published).format('L')}>
						<span>{moment(props.date_published).fromNow()}</span>
					</Tooltip>
				}
				title={props.title}
			>
				<a href={props.link} target="_blank" rel="noreferrer">
					<Meta
						className="meta-img"
						avatar={<Image className="image" width={200} src={props.image} placeholder={true} preview={false} />}
						description={props.description}
					/>
				</a>
				{props.source_icon && props.source_name ? (
					<a href={`https://${props.source_name}`} target="_blank" rel="noreferrer">
						<Tooltip title={props.source_name}>
							<Avatar className="source-avatar" size="large" src={<Image src={props.source_icon} preview={false} />} />
						</Tooltip>
					</a>
				) : null}
			</Card>
		</div>
	);
};
