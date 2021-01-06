import api from '../../../utils/api';
import { Props as IArticle } from '../../Article';
import { AxiosResponse } from 'axios';
import { FilterType } from '../../ArticleList';

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
			date_after: queryParams.date_after ? queryParams.date_after : '',
			date_before: queryParams.date_before ? queryParams.date_after : ''
		}
	});
	// console.log(response);
	return response.data as IArticleResults;
};

export { pureArticleListQueryName, fetchArticles };
