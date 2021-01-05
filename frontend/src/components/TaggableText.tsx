interface Props {
	text?: string;
}

export const TaggableText: React.FC<Props> = (props) => {
	return <div>{props.text}</div>;
};
