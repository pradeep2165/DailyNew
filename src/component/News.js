import NewsItem from "./NewsItem";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

function News(props) {
  News.defaultProps = {
    country: "in",
    pageSize: 15,
    category: "general",
  };
  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const countryName={
    'in':"India",
    'us': "USA",
    'ch':"Switzerland"
  }

  document.title = "DailyNews - " + props.category.charAt(0).toUpperCase() + props.category.slice(1);

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setPage(1);
    countryChangeEffect();
    // eslint-disable-next-line
  }, [props.country]);

  const countryChangeEffect = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(parseData.articles);
    setTotalArticles(parseData.totalResults);
    setLoading(false);
  };

  const updateNews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(articles.concat(parseData.articles));
    setTotalArticles(parseData.totalResults);
    setLoading(false);
  };

  const fetchMoreData = async () => {
    const newPage = page+1;
    setPage(newPage);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${newPage}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parseData = await data.json();

    setArticles(articles.concat(parseData.articles));
    setTotalArticles(parseData.totalResults);
    setLoading(false);
  };
console.log(articles, totalArticles);
  return (
    <>
      <h1 style={{ marginTop: "100px", marginBottom: "50px", textAlign: "center" }}>{props.category.charAt(0).toUpperCase() + props.category.slice(1)} - Top Headlines in {countryName[props.country]} on DailyNews</h1>
      {loading && <Spinner />}
      <InfiniteScroll dataLength={articles.length} next={fetchMoreData} hasMore={articles.length < totalArticles} loader={articles.length < totalArticles ? <Spinner /> : ""}>
        <div className="container">
          <div className="row">
            {articles.map((element, index) => {
              return (
                <div className="col-md-4" key={index}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
            ;
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
}

export default News;
