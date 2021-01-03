import { Form, Select, DatePicker } from 'antd';
import { RangeValue } from 'rc-picker/lib/interface';
import moment from 'moment';
import React from 'react';
import { FilterType } from './ArticleList';
import './style/Filters.css';
import { SourcesFilter } from './SourcesFilter';

const { Option } = Select;
const { RangePicker } = DatePicker;

export interface ISource {
	pk: number;
	name: string;
	base_url: string;
	icon_url: string;
}

interface Props {
	sources: ISource[];
	handler: (newFilters: FilterType) => void;
}

interface State {
	sources: ISource[];
	searchTags: string[];
	selectedSources: string[];
	date_after?: moment.Moment;
	date_before?: moment.Moment;
}

export class Filters extends React.PureComponent<Props, State> {
	state = {
		sources: this.props.sources,
		searchTags: Array<string>(),
		selectedSources: Array<string>(),
		date_after: undefined,
		date_before: undefined
	};

	selectedSourcesUpdateHandler(sources: string[]) {
		this.updateSearchFilters({ selectedSources: sources });
	}

	updateDateRange(dateRange?: RangeValue<moment.Moment>) {
		let dateAfter = undefined;
		let dateBefore = undefined;
		if (dateRange) {
			dateAfter = dateRange[0] || undefined;
			dateBefore = dateRange[1] || undefined;
		}
		this.updateSearchFilters({
			date_after: dateAfter,
			date_before: dateBefore
		});
	}

	updateSearchFilters(newFilters: any) {
		this.setState(newFilters, () =>
			this.props.handler({
				searchTags: this.state.searchTags,
				sources: this.state.selectedSources,
				date_after: this.state.date_after,
				date_before: this.state.date_before
			})
		);
	}

	render() {
		return (
			<Form layout="vertical">
				<Select
					mode="tags"
					className="filter-element"
					style={{ minWidth: 160 }}
					tokenSeparators={[ ',' ]}
					placeholder="Search for tags..."
					open={false}
					allowClear={true}
					onChange={(tags) => this.updateSearchFilters({ searchTags: Array<string>(tags.toString()) })}
				/>

				<RangePicker
					className="filter-element"
					allowEmpty={[ true, true ]}
					format="L"
					onChange={(dateRange) => {
						this.updateDateRange(dateRange);
					}}
				/>
				<SourcesFilter sourcesUpdateHandler={this.selectedSourcesUpdateHandler} />
			</Form>
		);
	}
}
