import { Select } from "antd";
import React from "react";

const { Option } = Select;

interface ISource {
    pk: number,
    name: string,
    base_url: string,
    icon_url: string
}

interface Props {
    sources: ISource[]
}

export const Filters: React.FC<Props> = (props) => {
    return (
        <div>
            <Select mode="multiple">
                {props.sources.map(source => {
                    return (
                        <Option key={source.pk} value={source.base_url}>{source.name}</Option>
                    );
                })}
            </Select>
        </div>
    )
}