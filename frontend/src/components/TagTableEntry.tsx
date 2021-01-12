import { AutoComplete, Form } from 'antd';
import React from 'react';
import { IEntityType } from './api/queries/entityTypes';

interface Props {
	entities: IEntityType[];
}

const TagTableEntry: React.FC<Props> = (props) => {
	const typeOptions = props.entities.map((e) => {});

	return (
		<Form layout="inline">
			<AutoComplete />
		</Form>
	);
};

export default TagTableEntry;
