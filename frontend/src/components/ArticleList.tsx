import React from "react";
import api from "../utils/api";
import { Empty, Pagination } from "antd";
import { Article } from "./Article";

interface IArticle {
    source: string;
    title: string;
    link: string;
    date_published: Date;
    description?: string;
    image?: string;
    author?: string;
}

export default class ArticleList extends React.PureComponent {

    state = {
        loading: true,
        totalResults: 0,
        pageSize: 10,
        pageLink: `articles/list/`,
        nextPageLink: "",
        articles: Array<IArticle>()
    }

    constructUrl(baseLink: string, pageNumber: number, pageSize?: number | undefined) {
        return pageSize ? `${baseLink}?pageSize=${pageSize}&page=${pageNumber}` : `${baseLink}?page=${pageNumber}`;
    }


    componentDidMount() {
        api.get(this.constructUrl(this.state.pageLink, 1, this.state.pageSize)).then(res => {
            // console.log(res);
            this.setState({
                loading: false,
                totalResults: res.data.count,
                nextPageLink: res.data.next,
                articles: res.data.results
            })
            console.log(this.state);
        });
    };

    onPaginationChange = (page: number, pageSize?: number) => {
        const url = this.constructUrl(this.state.pageLink, page, pageSize || this.state.pageSize);
        console.log(url);
        api.get(url).then(res => {
            this.setState({
                totalResults: res.data.count,
                nextPageLink: res.data.next,
                articles: res.data.results,
                pageSize: pageSize
            });
        });
    };

    render() {
        return (
            <div>
                {!this.state.articles || this.state.loading
                    ? <Empty />
                    : (
                        <div>
                            {
                                this.state.articles.map(a => {
                                    return <Article
                                        date_published={a.date_published}
                                        link={a.link}
                                        source={a.source}
                                        title={a.title}
                                        image={a.image}
                                        author={a.author}
                                        description={a.description}
                                    />
                                })
                            }
                            < Pagination
                                total={this.state.totalResults}
                                showTotal={total => `${total} articles`}
                                showSizeChanger
                                defaultPageSize={this.state.pageSize}
                                pageSizeOptions={['10', '25', '50', '100', '250', '500']}
                                onChange={this.onPaginationChange}
                            >
                            </Pagination>
                        </div>
                    )
                }
            </div>
        )
    }
}