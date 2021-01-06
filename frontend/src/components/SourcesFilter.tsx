import { Select } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import { fetchSources } from "./api/queries/sources";

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

	const { isLoading, error, data } = useQuery("sources", fetchSources, {
		keepPreviousData: true,
		staleTime: 3.6e6 // an hour
	});

	if (isLoading || error || !data) {
		return <div></div>
	}
	
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
			{data?.results.map((source: ISource) => {
				return (
					<Option key={`source-${source.pk}`} value={`${source.pk}: ${source.base_url}`}>
						{source.name}
					</Option>
				);
			})}
		</Select>
	);
};
