import React from 'react';

interface Props {
	text: string;
}

export const TaggableText: React.FC<Props> = (props) => {
	return <span>{props.text}</span>;
};
