import React, { useState } from 'react';
import { Moment } from 'moment';
import { Empty, Pagination, message, Spin } from 'antd';
import { Article } from './Article';
import { Filters } from './Filters';
import { useQuery, useQueryClient } from 'react-query';
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

	const [ onlyHearted, setOnlyHearted ] = useState<boolean>(false);

	const queryClient = useQueryClient();
	const updateFilters = (newFilters: FilterFieldType): void => {
		setFilters({
			...filters,
			...newFilters,
			page: 1
		});
	};

	const handleHeartOnArticleClick = (): void => {
		queryClient.invalidateQueries('articles');
	};

	const updateOnlyHearted = (hearted: boolean): void => {
		setOnlyHearted(hearted);
		queryClient.invalidateQueries('articles');
	};

	const onPaginationChange = (page: number, pageSize?: number): void => {
		setFilters({
			...filters,
			page: page,
			pageSize: pageSize || filters.pageSize
		});
	};
	const { isLoading, data, error } = useQuery(
		[ 'articles', { filters: filters, onlyHearted: onlyHearted } ],
		() => fetchArticles(filters, onlyHearted),
		{
			keepPreviousData: true,
			retry: 1,
			staleTime: 5
			// staleTime: 3.6e6 // an hour,
		}
	);

	const filterElement = <Filters handler={updateFilters} heartedHandler={updateOnlyHearted} />;

	const emptyElement = (
		<div>
			{filterElement}
			<Empty description={false} />
		</div>
	);

	if (isLoading) {
		return (
			<div>
				{filterElement}
				<Spin />
			</div>
		);
	}

	if (error || !data) {
		message.error('Error contacting API!');
		return emptyElement;
	}

	return (
		<div>
			<div>{filterElement}</div>
			{data.results.map((article, idx) => {
				if (!onlyHearted || (onlyHearted && article.hearted)) {
					return <Article key={idx} {...article} heartActionHandler={handleHeartOnArticleClick} />;
				}
				return null;
			})}
			<Pagination
				total={data.count}
				showTotal={(total) => `${total.toLocaleString()} articles`}
				showSizeChanger
				defaultPageSize={filters.pageSize}
				pageSizeOptions={[ '10', '25', '50', '100', '250', '500' ]}
				onChange={onPaginationChange}
			/>
		</div>
	);
};

export default ArticleList;
