import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Cookies from "js-cookie";
import TextField from "@mui/material/TextField";


import axios from "axios";
import IsLoading from "../../components/IsLoading";
import ComicsTitles from "../../components/ComicsTitles";

const Favorites = ({ url }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [filterTitle, setFilterTitle] = useState("");
  const [favoritesComics, setFavoritesComics] = useState(false);
  const [favoritesCharacters, setFavoritesCharacters] = useState(false);

  const navigate = useNavigate();
  const fetchData = async () => {
    axios
      .get(`${url}/favorites`, {
        params: { title: filterTitle, token: `Bearer ${Cookies.get("token")}` },
      })
      .then((response) => {
        setData(response.data.data);
        for (let i = 0; i < response.data.data.length; i++) {
          if (response.data.data[i].type === "comics") {
            if (!favoritesComics) {
              setFavoritesComics(true);
            }
          }
          if (response.data.data[i].type === "characters") {
            if (!favoritesCharacters) {
              setFavoritesCharacters(true);
            }
          }
        }
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate("/");
        }
        setError(error.response.status);
      });
  };
  useEffect(() => {
    fetchData();
  }, [filterTitle]);
  const handlefilterTitle = (event) => {
    setFilterTitle(event.target.value);
  };

  if (isLoading) {
    return (
    <main>
      <div className="container">
      <IsLoading />
      </div>
    </main>
    )
  }
  if(error) {

    return (
      <main>
        <div className="container">
        <div className="__error"><h1>ERROR {error}</h1></div>
        </div>
      </main>
      )
  }
  return (
    <main className="favorites">
      <div className="container">
        <h1>Favorites :</h1>
        <div className="__first-bar">

          <TextField onChange={handlefilterTitle} label="Search by word" />
        <button onClick={()=>{
          navigate(-1)
        }}>Back</button>
        </div>

        <section>
          {!favoritesComics && !favoritesCharacters &&
              <h2>You don't have favorite yet..</h2>

          }
          {favoritesComics && (
            <article>
              <h3>Comics :</h3>

              <div>
                {data.map((favorite) => {
                  return (
                    <>
                      {favorite.type === "comics" && (
                        <Link
                          key={favorite.id}
                          to={`/${favorite.type}/${favorite.id}`}
                        >
                          <article className="__card">
                            <div className="__card-infos">
                              <div>

                              <h2>{favorite.title}</h2>
                              <p>
                                {favorite.description &&
                                  favorite.description
                                    .split("")
                                    .splice(0, 100)
                                    .join("") + "..."}
                              </p>
                                    </div>

                              <img src={favorite.image} alt="" />
                            </div>
                          </article>
                        </Link>
                      )}
                    </>
                  );
                })}
              </div>
            </article>
          )}
          {favoritesCharacters && (
            <article>
              <h3>Characters :</h3>
              <div>
                {data.map((favorite) => {
                  return (
                    <>
                      {favorite.type === "characters" && (
                        <Link
                          key={favorite.id}
                          to={`/${favorite.type}/${favorite.id}`}
                        >
                          <article className="__card">
                            <div className="__card-infos">
              {favorite.description&&

                    <div className="__description">

                            <p>
                      {favorite.description &&
                        favorite.description
                        .split("")
                        .splice(0, 600)
                        .join("") + "..."}
                    </p>
                    <div className="__first-bubble"></div>
                    <div className="__second-bubble"></div>

                        </div>}
                              <img src={favorite.image} alt="" />
                              <div>
                                  <h2>{favorite.title}</h2>
                              </div>
                            </div>
                          </article>
                        </Link>
                      )}
                    </>
                  );
                })}
              </div>
            </article>
          )}
        </section>
      </div>
    </main>
  );
};

export default Favorites;
