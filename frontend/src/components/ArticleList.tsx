import React from 'react';
import moment, { Moment } from 'moment';
import api from '../utils/api';
import { Empty, Pagination, message } from 'antd';
import { Article, Props as IArticle } from './Article';
import { Filters, ISource } from './Filters';

export type FilterType = {
	searchTags: string[];
	sources: string[];
	date_after?: Moment;
	date_before?: Moment;
};

export default class ArticleList extends React.PureComponent<{}> {
	constructor(props: {}) {
		super(props);
		this.setFilters = this.setFilters.bind(this);
	}
	state = {
		loading: true,
		totalResults: 0,
		pageSize: 10,
		pageLink: `articles/list/`,
		articles: Array<IArticle>(),
		sources: Array<ISource>(),
		filters: {
			searchTags: Array<string>(),
			sources: Array<string>(),
			date_after: null,
			date_before: null
		}
	};

	constructCurrentUrl(page?: number, pageSize?: number) {
		return (
			this.state.pageLink +
			`?page=${page || 1}` +
			`&pageSize=${pageSize || this.state.pageSize}` +
			`&search=${this.state.filters.searchTags ? this.state.filters.searchTags.join(',') : ''}` +
			`&sources=${this.state.filters.sources ? this.state.filters.sources.join(',') : ''}` +
			`&date_after=${!this.state.filters.date_after
				? ''
				: moment(this.state.filters.date_after).format('YYYY-MM-DD')}` +
			`&date_before=${!this.state.filters.date_before
				? ''
				: moment(this.state.filters.date_before).format('YYYY-MM-DD')}`
		);
	}

	setFilters(newFilters: FilterType) {
		this.setState({ filters: newFilters }, () => {
			const url = this.constructCurrentUrl();
			api
				.get(url)
				.then((res) => {
					this.setState({
						totalResults: res.data.count,
						articles: res.data.results,
						sources: res.data
					});
				})
				.catch((e) => {
					console.log("Tried updating filters, didn't work!");
				});
		});
	}

	componentDidMount() {
		console.log(api.defaults.headers);
		api
			.get(this.state.pageLink, {
				params: {
					pageSize: this.state.pageSize,
					page: 1
				},
				withCredentials: true
			})
			.then((res) => {
				this.setState({
					loading: false,
					totalResults: res.data.count,
					articles: res.data.results
				});
			})
			.catch((err) => {
				console.log(err);
				message.error('Could not contact API!');
			});
	}

	onPaginationChange = (page: number, pageSize?: number) => {
		const url = this.constructCurrentUrl(page, pageSize);
		api
			.get(url)
			.then((res) => {
				this.setState({
					totalResults: res.data.count,
					articles: res.data.results,
					pageSize: pageSize
				});
			})
			.catch((err) => {
				console.log(err);
				message.error('Could not contact API!');
			});
	};

	render() {
		return (
			<div>
				{this.state.sources ? <Filters sources={this.state.sources} handler={this.setFilters} /> : null}
				{!this.state.articles || this.state.loading ? (
					<Empty description={false} />
				) : (
					<div>
						{this.state.articles.map((article, idx) => {
							return <Article key={idx} {...article} />;
						})}
						<Pagination
							total={this.state.totalResults}
							showTotal={(total) => `${total} articles`}
							showSizeChanger
							defaultPageSize={this.state.pageSize}
							pageSizeOptions={[ '10', '25', '50', '100', '250', '500' ]}
							onChange={this.onPaginationChange}
						/>
					</div>
				)}
			</div>
		);
	}
}
