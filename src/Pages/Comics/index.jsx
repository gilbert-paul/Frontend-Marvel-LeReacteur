import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dropdown from "../../components/Dropdown";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "axios";
import IsLoading from "../../components/IsLoading";

const Comics = ({ url }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [filterTitle, setFilterTitle] = useState("");
  const [limit, setLimit] = useState(100);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [options, setOptions] = useState([]);

  const [error, setError] = useState("");

  const fetchData = async () => {
    await axios
      .get(
        `${url}/comics?title=${filterTitle}&limit=${limit}&skip=${
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
        const allTitles = [];
        for (let i = 0; i < response.data.data.results.length; i++) {
          if (
            !allTitles.includes(
              response.data.data.results[i].title.split("#")[0]
            )
          ) {
            allTitles.push(response.data.data.results[i].title.split("#")[0]);
          }
        }
        setOptions(allTitles);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.response.status);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, [filterTitle, page, limit]);
  const handlefilterTitle = (event) => {
    setPage(1);
    setFilterTitle(event.target.value);
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
      <div className="container comics">
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
              setFilterTitle(newFilter);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                onChange={handlefilterTitle}
                label="Search by name"
              />
            )}
          />

          <h1>Comics :</h1>
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
          {data.results.map((comic, index) => {
            return (
              <Link key={comic._id + index} to={`/comics/${comic._id}`}>
                <article className="__card">
                  <div className="__card-infos">
                    <div>
                      <h2>{comic.title}</h2>

                      <p>
                        {comic.description &&
                          comic.description.split("").splice(0, 100).join("") +
                            "..."}
                      </p>
                    </div>
                    <img
                      src={
                        comic.thumbnail.path +
                        "/portrait_incredible." +
                        comic.thumbnail.extension
                      }
                      alt=""
                    />
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

export default Comics;
