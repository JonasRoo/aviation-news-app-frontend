import api from '../api';

export interface IEntityType {
	pk: number;
	name: string;
	color?: string;
	owner_name?: string;
	date_created?: Date;
	date_updated?: Date;
}

const fetchEntityTypes = async (): Promise<IEntityType[]> => {
	const endpointUrl = 'tags/types/list/';
	const response = await api.get(endpointUrl);
	return response.data as IEntityType[];
};

export { fetchEntityTypes };
