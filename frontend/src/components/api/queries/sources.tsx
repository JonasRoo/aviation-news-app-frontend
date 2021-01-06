import api from '../../../utils/api';
import { AxiosResponse } from 'axios';
import { ISource } from '../../SourcesFilter';

export interface ISourceResults extends AxiosResponse {
	results: ISource[];
}

const endpointUrl = 'articles/sources/';
const fetchSources = async (): Promise<ISourceResults> => {
	console.log('In our little function');
	const response = await api.get(endpointUrl);
	return response.data as ISourceResults;
};

export { fetchSources };
