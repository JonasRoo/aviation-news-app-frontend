import { Card, Popover } from 'antd';
import React from 'react';
import moment from 'moment';
import '../components/style/TaggingArticle.css';
import { TaggableText } from './TaggableText';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Meta } = Card;

export interface Props {
	source: string;
	title: string;
	link: string;
	date_published: Date;
	description?: string;
	image?: string;
	author?: string;
	source_name?: string;
}

export const TaggingArticle: React.FC<Props> = (props) => {
	const titleField = (
		<div>
			{props.source_name} published on {moment(props.date_published).format('L')}
		</div>
	);
	const extraField = (
		<Popover content={titleField}>
			<InfoCircleOutlined />
		</Popover>
	);

	const onTextChange = () => {
		console.log('changed!');
	};

	return (
		<div className="card">
			<Card
				title={<TaggableText text={props.title} />}
				style={{ borderRadius: '10px' }}
				extra={extraField}
				onClick={onTextChange}
			>
				<Meta
					style={{ fontSize: '20px' }}
					description={
						<div>
							<TaggableText text={props.description} />
						</div>
					}
				/>
			</Card>
		</div>
	);
};
