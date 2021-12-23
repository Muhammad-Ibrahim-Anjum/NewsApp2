import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
    static defaultProps = {
        country: 'pt',
        pageSize: 21,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async updatePage() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fbab7de626374044b0852797eb83b459&page=${this.props.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false });
    }

    async componentDidMount() {
        this.updatePage();
    }

    clickPrevBtn = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updatePage();
    }
    clickNextBtn = async () => {
        this.setState({ page: this.state.page + 1 });
        this.updatePage();
    }
    capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    render() {
        return (
            <>
                <h1 className="text-center" style={{ margin: '35px 0' }}>National News - {this.capitalize(this.props.category)}</h1>
                <div className="text-center">
                    {/* {this.state.loading && <Spinner/>}   */}
                </div>
                <InfiniteScroll
                    dataLength={this.state.items.length}
                    next={this.fetchMoreData}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}
