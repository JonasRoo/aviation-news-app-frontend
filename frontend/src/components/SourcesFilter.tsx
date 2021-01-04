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
			onChange={(values: string[], _) => {
				props.sourcesUpdateHandler(
					values.map((e) => {
						return e.split(':')[0];
					})
				);
			}}
		>
			{availableSources.map((source: ISource) => {
				return (
					<Option key={`source-${source.pk}`} value={`${source.pk}: ${source.base_url}`}>
						{source.name}
					</Option>
				);
			})}
		</Select>
	);
};
