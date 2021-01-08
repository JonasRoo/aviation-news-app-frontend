import { Select, Table, Tag } from 'antd';
import React, { useState } from 'react';
import { IEntityType } from './api/queries/entityTypes';

export interface IEntity {
	type: IEntityType;
	pattern: string;
	is_regex: boolean;
	ignore_case: boolean;
	name?: string;
	aliases: string[];
}

const tableColumns = [
	{
		title: 'Pattern',
		dataIndex: 'pattern',
		key: 'pattern'
	},
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name'
	},
	{
		title: 'Type',
		dataIndex: 'type',
		key: 'type',
		render: (type: IEntityType) => {
			return (
				<Tag color={type.color} key={type.pk}>
					{type.name}
				</Tag>
			);
		}
	},
	{
		title: 'Aliases',
		dataIndex: 'aliases',
		key: 'aliases',
		render: (aliases: string[]) => {
			// integrate an "edit" button here
			return <div>{aliases.join(', ')}</div>;
		}
	}
];

const formatAliases = (aliases: string[]) => {
	return aliases.join(' | ');
};

const aliasesInputField = (
	<Select
		mode="tags"
		style={{ minWidth: 160 }}
		tokenSeparators={[ ',' ]}
		placeholder="Search for tags..."
		open={false}
		allowClear={true}
	/>
);

const inputRow = {};

const TaggingTable: React.FC<{}> = () => {
	const [ entities, setEntities ] = useState<IEntityType[]>([]);

	return <Table columns={tableColumns} />;
};

export default TaggingTable;
