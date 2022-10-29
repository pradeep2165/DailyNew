import React from "react";
import moment from "moment";
const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;

  return (
    <div className="row row-cols-1 row-cols-md-1 g-4 my-2"  >
      <div className="col ">
        <div className={`card h-100 bg-${props.darkMode ? "dark" : "light"}`} >
          <div className="d-flex justify-content-end position-absolute end-0">
            <span className="badge rounded bg-danger">{source}</span>
          </div>
          <img src={!imageUrl ? "https://static.cnbetacdn.com/article/2022/0521/83ce8818083bf3a.webp" : imageUrl} className="card-img-top" alt="..." style={{height:"200px"}}/>
          <div style={{ height: "200px" }} className="overflow-hidden">
            <div className="card-body">
              <h5 className={`card-title ${props.darkMode ? "text-light" : "text-dark"}`}>{title}</h5>
              <p className={`card-text ${props.darkMode ? "text-light" : "text-dark"}`} >{description}</p>
            </div>
          </div>
          <div className="card-body">
            <p>
              <small className={` ${props.darkMode ? "text-light" : "text-dark"}`}> {author ? author : ""} {moment(date).fromNow()}</small> 
            </p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
