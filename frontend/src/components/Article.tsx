import { Avatar, Card, Tooltip, Image } from "antd";
import React from "react";
import moment from "moment";
import "./style/Article.css";

const { Meta } = Card;

interface Props {
    source: string;
    title: string;
    link: string;
    date_published: Date;
    description?: string;
    image?: string;
    author?: string;
}

export const Article: React.FC<Props> = (props) => {
    return (
        <div className="card">
            <a href={props.link} target="_blank" rel="noreferrer">
                <Card
                    style={{ width: "flex" }}
                    hoverable
                    size="small"
                    extra={
                        <Tooltip title={moment(props.date_published).format("L")}>
                            <span>{moment(props.date_published).fromNow()}</span>
                        </Tooltip>
                    }
                    title={props.title}

                >
                    <Meta
                        className="meta-img"
                        // avatar={<Avatar className="card-avatar" src={props.image} />}
                        avatar={<Image className="image" width={200} src={props.image} />}
                        // title={props.title}
                        description={props.description}
                    />
                </Card>
            </a>
        </div>
    );
};