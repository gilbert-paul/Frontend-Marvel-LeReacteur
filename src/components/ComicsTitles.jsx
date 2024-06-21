import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import axios from "axios";
import IsLoading from "./IsLoading";

const ComicsTitles = ({ url, comic }) => {
  const [titleComic, setTitleComic] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchDataComics = async () => {
    await axios
      .get(`${url}/comics/${comic}`)
      .then((response) => {
        setTitleComic(response.data.data.title);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  useEffect(() => {
    fetchDataComics();
  }, []);
  return <>{isLoading ? <div className="__title-loading">
    <IsLoading />
    </div>
     : <div>{titleComic}</div>}</>;
};

export default ComicsTitles;
