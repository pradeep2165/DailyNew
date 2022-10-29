import NewsItem from "./NewsItem";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { data } from "../rowdata";
import { sources } from "../sources";
import SourcesLIst from "./SourcesLIst";
import {SiSonarsource} from 'react-icons/si';
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
  // const [articles, setArticles] = useState(data.articles);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState();
  const [sortItem, setSortItem] = useState("publishedAt");
  const [showSource, setShowSource] = useState(false);
  const [source_name, setSource_name] = useState("");

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

  useEffect(() => {
    if(props.search){
      setPage(1);
      searchResult();
    }
    // eslint-disable-next-line
  }, [props.search, sortItem]);

  useEffect(() => {
    if(source_name){
      setPage(1);
      SearchBySource()
    }
    // eslint-disable-next-line
  }, [source_name]);

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
    let url;
    const newPage = page + 1;
    setPage(newPage);

    setLoading(true);
    if (props.search) {
      url = `https://newsapi.org/v2/everything?q=${props.search}&apiKey=${props.apikey}&page=${newPage}`;
    }else if(source_name) {
      url = `https://newsapi.org/v2/everything?sources=${source_name}&apiKey=${props.apikey}&page=${newPage}`;
    }else {
      url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${newPage}&pageSize=${props.pageSize}`;
    }
    let data = await fetch(url);
    let parseData = await data.json();

    setArticles(articles.concat(parseData.articles));
    setTotalArticles(parseData.totalResults);
    setLoading(false);
  };

  const searchResult = async () => {
    setLoading(true);
    const url = `https://newsapi.org/v2/everything?q=${props.search}&sortBy=${sortItem}&apiKey=${props.apikey}`;
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(parseData.articles);
    setTotalArticles(parseData.totalResults);
    setLoading(false);
  };
  const SearchBySource = async () => {
    setLoading(true);
    const url = `https://newsapi.org/v2/everything?sources=${source_name}&apiKey=${props.apikey}`;
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(parseData.articles);
    setTotalArticles(parseData.totalResults);
    setLoading(false);
  };
  return (
    <>
      <h1 style={{ marginTop: "100px", marginBottom: "50px", textAlign: "center" }}>{props.search ? "Articles for " + props.search : source_name ? "Articles for " + source_name : props.category.charAt(0).toUpperCase() + props.category.slice(1) + "- Top Headlines On DailyNews"}</h1>
      <div className="d-flex justify-content-center position-relative"><button  onClick={()=>setShowSource(x=>!x)} className="btn btn-sm btn-outline-danger">{showSource? "Hide source":"Search New By Sources"} <SiSonarsource fontSize={30} /></button></div>
      {props.search && (
        <div className="text-center">
          <button onClick={() => setSortItem("publishedAt")} className="btn btn-sm btn-secondary mx-1">
            publishedAt
          </button>
          <button onClick={() => setSortItem("popularity")} className="btn btn-sm btn-success mx-1">
            popularity
          </button>
          <button onClick={() => setSortItem("relevancy")} className="btn btn-sm btn-danger mx-1">
            relevancy
          </button>
        </div>
      )}

        
        {showSource && <SourcesLIst sources={sources} setSource_name={setSource_name} setShowSource={setShowSource}/>}
      {loading && <Spinner />}
      <InfiniteScroll dataLength={articles.length} next={fetchMoreData} hasMore={articles.length < totalArticles} loader={articles.length < totalArticles ? <Spinner /> : ""}>
        <div className="container">
          <div className="row">
            {articles.map((element, index) => {
              return (
                <div className="col-md-4" key={index}>
                  <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
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
