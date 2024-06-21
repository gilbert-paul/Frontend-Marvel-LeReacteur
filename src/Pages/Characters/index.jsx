import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dropdown from "../../components/Dropdown";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import axios from "axios";
import IsLoading from "../../components/IsLoading";

const Characters = ({ url }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  const [error, setError] = useState("");
  const [limit, setLimit] = useState(100);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [filterName, setFilterName] = useState("");
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);

  const fetchData = async () => {
    await axios
      .get(
        `${url}/characters?name=${filterName}&limit=${limit}&skip=${
          (page - 1) * limit
        }`
      )
      .then((response) => {
        setData(response.data.data);
        setPages(
          Math.ceil(
            Number(response.data.data.count) / Number(response.data.data.limit)
          )
        );
        const allNames = [];
        for (let i = 0; i < response.data.data.results.length; i++) {
          allNames.push(response.data.data.results[i].name);
        }
        setOptions(allNames);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.response.status);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, [filterName, limit, page]);
  const handleFilterName = (event) => {
    setPage(1);

    setFilterName(event.target.value);
  };
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
      <div className="container characters">
        <div className="__navbar">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={options}
            filterOptions={(x) => x}
            sx={{ width: 300 }}
            freeSolo={true}
            onChange={(event) => {
              const newFilter = event.target.childNodes[0].data || "";
              setFilterName(newFilter);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                onChange={handleFilterName}
                label="Search by name"
              />
            )}
          />

          <h1>Characters :</h1>
          <Dropdown
            limit={limit}
            setLimit={setLimit}
            pages={pages}
            setPages={setPages}
            page={page}
            setPage={setPage}
          />
        </div>
        <section>
          {data.results.map((character) => {
            return (
              <Link key={character._id} to={`/characters/${character._id}`}>
                <article className="__card">
                  <div className="__card-infos">
                    {character.description && (
                      <div className="__description">
                        <p>
                          {character.description &&
                            character.description
                              .split("")
                              .splice(0, 100)
                              .join("") + "..."}
                        </p>
                        <div className="__first-bubble"></div>
                        <div className="__second-bubble"></div>
                      </div>
                    )}
                    <img
                      src={
                        character.thumbnail.path +
                        "/portrait_incredible." +
                        character.thumbnail.extension
                      }
                      alt=""
                    />
                    <div>
                      <h2>{character.name}</h2>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </section>
      </div>
    </main>
  );
};

export default Characters;
