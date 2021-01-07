import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Descriptions, Divider, PageHeader, Space } from 'antd';
import React from 'react';
import { TaggingArticle } from '../TaggingArticle';
import TagTypeGrid from '../TagTypeGrid';

export default class TaggerInterface extends React.PureComponent<{}> {
	typeDummyData = [
		{
			id: 1,
			name: 'AIRFRAMER',
			color: 'red'
		},
		{
			id: 2,
			name: 'MRO-PROVIDER',
			color: 'blue'
		},
		{
			id: 1,
			name: 'AUTHORITY',
			color: 'green'
		},
		{
			id: 1,
			name: 'AIRLINE',
			color: 'lime'
		}
	];

	render() {
		return (
			<div>
				<PageHeader
					title="Tagging session: 22325zsd8a8w"
					extra={[
						<Button key="prev" shape="round" type="primary" icon={<LeftOutlined />} />,
						<Button key="next" shape="round" type="primary" icon={<RightOutlined />} />
					]}
				>
					<Descriptions />
				</PageHeader>
				<Space direction="horizontal">
					<div style={{ maxWidth: '50%' }}>
						<TaggingArticle
							title="Company A to be acquired by Company B"
							description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
							link="https://google.com"
							date_published={new Date()}
							source="https://google.com"
							source_name="News Outlet A"
						/>
					</div>
					<div>
						<Divider type="vertical" />

						<TagTypeGrid types={this.typeDummyData} />
					</div>
				</Space>
			</div>
		);
	}
}
