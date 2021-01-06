import api from '../../../utils/api';
import { Props as IArticle } from '../../Article';
import { AxiosResponse } from 'axios';
import { FilterType } from '../../ArticleList';
import moment from 'moment';

export interface IArticleResults extends AxiosResponse {
	count: number;
	results: IArticle[];
}

const endpointUrl = 'articles/list/';
const pureArticleListQueryName = 'pureArticleData';
const fetchArticles = async (queryParams: FilterType): Promise<IArticleResults> => {
	const response = await api.get(endpointUrl, {
		params: {
			page: queryParams.page,
			pageSize: queryParams.pageSize,
			search: queryParams.search.join(','),
			sources: queryParams.sources.join(','),
			date_after: queryParams.date_after ? moment(queryParams.date_after).format('YYYY-MM-DD') : '',
			date_before: queryParams.date_before ? moment(queryParams.date_before).format('YYYY-MM-DD') : ''
		}
	});
	// console.log(response);
	return response.data as IArticleResults;
};

export { pureArticleListQueryName, fetchArticles };
