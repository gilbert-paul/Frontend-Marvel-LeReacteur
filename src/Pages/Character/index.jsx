import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import axios from "axios";
import ComicsTitles from "../../components/ComicsTitles";
import IsLoading from "../../components/IsLoading";
import AddFavorite from "../../components/AddFavorite";

const Character = ({ url }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [dataComics, setDataComics] = useState([]);
  const [error, setError] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    await axios
      .get(`${url}/characters/${id}`)
      .then(async (response) => {
        setData(response.data.data);

        setDataComics(response.data.data.comics);

        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.response.status);
        setIsLoading(false);
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
    );
  }
  if (error) {
    return (
      <main>
        <div className="container">
          <div className="__error">
            <h1>ERROR {error}</h1>
          </div>
        </div>
      </main>
    );
  }
  return (
    <main>
      <div className="container character">
        <div className="__first-bar">
          <h1>Characters :</h1>
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </button>
        </div>
        <section>
          <article className="__card">
            <div className="__card-infos">
              {data.description && (
                <div className="__description">
                  <p>
                    {data.description &&
                      data.description.split("").splice(0, 600).join("") +
                        "..."}
                  </p>
                  <div className="__first-bubble"></div>
                  <div className="__second-bubble"></div>
                </div>
              )}
              <img
                src={
                  data.thumbnail.path +
                  "/portrait_incredible." +
                  data.thumbnail.extension
                }
                alt=""
              />
              <div>
                <h2>{data.name}</h2>
              </div>

              <AddFavorite
                url={url}
                title={data.name}
                description={data.description}
                image={
                  data.thumbnail.path +
                  "/portrait_incredible." +
                  data.thumbnail.extension
                }
                id={data._id}
                type="characters"
              />
            </div>

            <div className="__card-more-infos">
              <h3>Comics :</h3>
              <div className="__details">
                {dataComics.map((comic) => {
                  return (
                    <Link key={comic} to={`/comics/${comic}`}>
                      <button>
                        <ComicsTitles url={url} comic={comic} />
                      </button>
                    </Link>
                  );
                })}
              </div>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
};

export default Character;
