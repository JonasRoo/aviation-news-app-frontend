import api from '../../../utils/api';
import { ISource } from '../../SourcesFilter';

const endpointUrl = 'articles/sources/';
const fetchSources = async (): Promise<ISource[]> => {
	const response = await api.get(endpointUrl);
	return response.data as ISource[];
};

export { fetchSources };
