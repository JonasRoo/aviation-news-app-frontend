import { Card, Popover, Space } from 'antd';
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
			<Space>
				<a href={props.link} target="_blank" rel="noreferrer">
					link
				</a>
				<InfoCircleOutlined />
			</Space>
		</Popover>
	);

	return (
		<div className="card">
			<Card
				title={<TaggableText text={props.title} />}
				style={{ borderRadius: '10px', minWidth: '50%' }}
				extra={extraField}
			>
				<Meta
					style={{ fontSize: '20px' }}
					description={
						props.description && (
							<div>
								<TaggableText text={props.description} />
							</div>
						)
					}
				/>
			</Card>
		</div>
	);
};
