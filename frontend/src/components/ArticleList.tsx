import React, { useState } from 'react';
import { Moment } from 'moment';
import { Empty, Pagination, message } from 'antd';
import { Article } from './Article';
import { Filters } from './Filters';
import { useQuery } from 'react-query';
import { fetchArticles } from './api/queries/articles';

export type FilterType = {
	page: number;
	pageSize: number;
	search: string[];
	sources: string[];
	date_after?: Moment;
	date_before?: Moment;
};

export type FilterFieldType = {
	search: string[];
	sources: string[];
	date_after?: Moment;
	date_before?: Moment;
};

const ArticleList: React.FC<{}> = () => {
	const [ filters, setFilters ] = useState<FilterType>({
		page: 1,
		pageSize: 10,
		search: Array<string>(),
		sources: Array<string>()
	});
	const updateFilters = (newFilters: FilterFieldType): void => {
		setFilters({
			...filters,
			...newFilters
		});
	};

	const onPaginationChange = (page: number, pageSize?: number) => {
		setFilters({
			...filters,
			page: page,
			pageSize: pageSize || filters.pageSize
		});
	};
	const { isLoading, data, error } = useQuery([ 'articles', filters ], () => fetchArticles(filters), {
		keepPreviousData: true,
		staleTime: 3.6e6 // an hour
	});

	const filterElement = <Filters handler={updateFilters} />;

	const emptyElement = (
		<div>
			{filterElement}
			<Empty description={false} />
		</div>
	);

	if (isLoading) {
		return emptyElement;
	}

	if (error || !data) {
		message.error('Error contacting API!');
		return emptyElement;
	}

	return (
		<div>
			<div>{filterElement}</div>
			{data.results.map((article, idx) => {
				return <Article key={idx} {...article} />;
			})}
			<Pagination
				total={data.count}
				showTotal={(total) => `${total} articles`}
				showSizeChanger
				defaultPageSize={filters.pageSize}
				pageSizeOptions={[ '10', '25', '50', '100', '250', '500' ]}
				onChange={onPaginationChange}
			/>
		</div>
	);
};

export default ArticleList;
