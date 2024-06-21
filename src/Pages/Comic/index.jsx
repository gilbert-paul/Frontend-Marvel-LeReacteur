import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import axios from "axios";
import IsLoading from "../../components/IsLoading";
import AddFavorite from "../../components/AddFavorite";

const Comic = ({ url }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  const [error, setError] = useState({});
  const { id } = useParams();

  const fetchData = async () => {
    await axios
      .get(`${url}/comics/${id}`)
      .then((response) => {
        setData(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (isLoading) {
    return (
    <main>
      <div className="container">
      <IsLoading />
      </div>
    </main>
    )
  }
  return (
    <main>
      <div className="container comic">
        <h1>Comic :</h1>
        <section>
          <article className="__card">
            <div className="__card-infos">
              <div>

              <h2>{data.title}</h2>
              <p>
                {data.description &&
                  data.description.split("").splice(0, 600).join("") + "..."}
              </p>
                  </div>

              <img
                src={
                  data.thumbnail.path +
                  "/portrait_incredible." +
                  data.thumbnail.extension
                }
                alt=""
              />
              <AddFavorite
                url={url}
                title={data.title}
                description={data.description}
                image={
                  data.thumbnail.path +
                  "/portrait_incredible." +
                  data.thumbnail.extension
                }
                id={data._id}
                type="comics"
              />
            </div>
          </article>
        </section>
      </div>
    </main>
  );
};

export default Comic;
