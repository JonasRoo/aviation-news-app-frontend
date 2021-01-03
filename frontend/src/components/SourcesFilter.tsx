import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const { Option } = Select;

export interface ISource {
	pk: number;
	name: string;
	base_url: string;
	icon_url: string;
}

interface Props {
	sourcesUpdateHandler: (sources: string[]) => void;
}

export const SourcesFilter: React.FC<Props> = (props) => {
	const [ availableSources, setAvailableSources ] = useState<ISource[]>([]);
	useEffect(() => {
		// console.log('calling!');
		api
			.get('articles/sources/')
			.then((res) => {
				setAvailableSources(res.data);
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);

	return (
		<Select
			mode="multiple"
			className="filter-element"
			style={{ minWidth: 120 }}
			allowClear={true}
			placeholder="Sources..."
			onChange={(values: string[], _) => props.sourcesUpdateHandler(values)}
			// bug here: Option's aren't loaded to the menu
		>
			{availableSources.map((source: ISource) => {
				return (
					<Option key={`source-${source.pk}`} value={source.base_url}>
						{source.name}
					</Option>
				);
			})}
		</Select>
	);
};
