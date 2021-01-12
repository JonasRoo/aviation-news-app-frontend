import React from 'react';
import { useQuery } from 'react-query';
import { fetchEntityTypes } from '../api/queries/entityTypes';

const TaggerTableContainer: React.FC<{}> = () => {
	//
	const { isLoading, data, error } = useQuery('entityTypes', fetchEntityTypes, {
		retry: 1,
		staleTime: 3.6e6 // 1 hour
	});

	return <div />;
};

export default TaggerTableContainer;
