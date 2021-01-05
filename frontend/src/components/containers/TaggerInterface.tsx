import { Button, Descriptions, PageHeader } from 'antd';
import React from 'react';
import { TaggingArticle } from '../TaggingArticle';

export default class TaggerInterface extends React.PureComponent<{}> {
	render() {
		return (
			<div>
				<PageHeader
					title="Tagging session: 22325zsd8a8w"
					ghost={false}
					extra={[ <Button key="prev">Previous</Button>, <Button key="next">Next</Button> ]}
				>
					<Descriptions />
				</PageHeader>
				<div style={{ maxWidth: '50%' }}>
					<TaggingArticle
						title="StandardAero to be acquired by Carlyle Group"
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
						link="https://google.com"
						date_published={new Date()}
						source="https://google.com"
						image="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
						source_name="disneyplus"
					/>
				</div>
			</div>
		);
	}
}
