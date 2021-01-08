import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Descriptions, Divider, PageHeader } from 'antd';
import React, { useState } from 'react';
import { TaggingArticle } from '../TaggingArticle';
import { EntityTypeButtonGroup } from '../EntityTypeButtons';
import { IEntityType } from '../api/queries/entityTypes';
import TaggingTable from '../TaggingTable';

interface IState {
	entityType?: IEntityType;
}

const placeholder = {
	title: 'Company A to be acquired by Company B',
	description:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
	link: 'https://google.com',
	date_published: new Date(),
	source: 'https://google.com',
	source_name: 'News Outlet A'
};

const TaggerInterface: React.FC<{}> = () => {
	const [ entityType, setEntityType ] = useState<IEntityType | undefined>(undefined);

	const handleEntityTypeChange = (entity: IEntityType) => {
		setEntityType(entity);
	};

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
			<TaggingTable />
			<div style={{ display: 'flex', marginTop: '10px' }}>
				<div style={{ width: '100%', maxWidth: '50%', float: 'left' }}>
					<TaggingArticle {...placeholder} />
				</div>
				<Divider type="vertical" />
				<div style={{ float: 'right', width: '50%' }}>
					<EntityTypeButtonGroup changeHandler={handleEntityTypeChange} />
					{/* <TagTypeGrid types={this.typeDummyData} /> */}
				</div>
			</div>
		</div>
	);
};

export default TaggerInterface;
