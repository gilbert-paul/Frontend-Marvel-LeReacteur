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
        setError(error.response.status);
        setIsLoading(false)
      });
  };
  useEffect(() => {
    fetchDataComics();
  }, []);

  if(isLoading){
    return <div className="__title-loading">
    <IsLoading />
    </div>
  }
  if(error) {

    return (
      <main>
        <div className="container">
        <div className="__error"><p>ERROR {error}</p></div>
        </div>
      </main>
      )
  }
  return (
    <div>{titleComic}</div>
  )
}


export default ComicsTitles;
