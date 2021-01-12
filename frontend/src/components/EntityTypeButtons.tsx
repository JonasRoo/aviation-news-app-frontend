import { Divider, message, Radio, Space, Spin } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import React from 'react';
import { useQuery } from 'react-query';
import { fetchEntityTypes, IEntityType } from './api/queries/entityTypes';

interface Props {
	changeHandler: (entityType: IEntityType) => void;
}

export const EntityTypeButtonGroup: React.FC<Props> = (props) => {
	const { isLoading, data, error } = useQuery('entityTypes', fetchEntityTypes, {
		retry: 1,
		staleTime: 3.6e6 // 1 hour
	});

	const handleRadioChange = (e: RadioChangeEvent): void => {
		console.log(e.target.value);
		props.changeHandler(e.target.value);
	};

	if (isLoading) {
		console.log('checking for loading...');
		return <Spin />;
	}

	if (error) {
		message.error('Error fetching available entity types from API!');
		return <div />;
	}

	if (!data) {
		return <span>No entity types available yet :(</span>;
	}

	return (
		<div>
			<Divider orientation="right">Available types</Divider>
			<Radio.Group size="middle" buttonStyle="outline" onChange={handleRadioChange}>
				<Space size={[ 6, 10 ]} wrap>
					{data.map((e) => {
						return (
							<Radio.Button key={e.pk} value={e}>
								<span style={{ color: e.color || 'black' }}>{e.name}</span>
							</Radio.Button>
						);
					})}
				</Space>
			</Radio.Group>
		</div>
	);
};
