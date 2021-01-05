import { Divider, Space, Tag } from 'antd';
import React from 'react';

export interface ITagType {
	id: number;
	name: string;
	color?: string;
}

interface Props {
	types: ITagType[];
}

const TagTypeGrid: React.FC<Props> = (props) => {
	return (
		<div>
			<Divider orientation="left">Available Tags</Divider>
			<Space size={[ 8, 16 ]} wrap>
				{props.types.map((t) => {
					return (
						<Tag color={t.color || 'geekblue'} key={t.id}>
							{t.name}
						</Tag>
					);
				})}
			</Space>
		</div>
	);
};

export default TagTypeGrid;
