import { useState } from "react";

const Dropdown = ({ limit, setLimit, pages, setPages, page, setPage }) => {
  const [limitVisibility, setLimitVisibility] = useState(false);
  const [pageVisibility, setPageVisibility] = useState(false);

  const handleLimitVisibility = () => {
    setLimitVisibility(!limitVisibility);
  };
  const handlePageVisibility = () => {
    setPageVisibility(!pageVisibility);
  };

  const arrayFromPages = [];
  for (let i = 0; i < pages; i++) {
    arrayFromPages.push(i + 1);
  }
  return (
    <div className="__pagination">
      <div>
        <p
          onClick={handleLimitVisibility}
          onMouseEnter={() => {
            setPageVisibility(false);
          }}
        >
          {" "}
          Characters/page : {limit}
        </p>
        {limitVisibility && (
          <ul onMouseLeave={handleLimitVisibility}>
            <li
              onClick={() => {
                setLimit(20);
                setPage(1);
                handleLimitVisibility();
              }}
            >
              20
            </li>
            <li
              onClick={() => {
                setLimit(40);
                setPage(1);
                handleLimitVisibility();
              }}
            >
              40
            </li>
            <li
              onClick={() => {
                setLimit(60);
                setPage(1);
                handleLimitVisibility();
              }}
            >
              60
            </li>
            <li
              onClick={() => {
                setLimit(80);
                setPage(1);
                handleLimitVisibility();
              }}
            >
              80
            </li>
            <li
              onClick={() => {
                setLimit(100);
                setPage(1);
                handleLimitVisibility();
              }}
            >
              100
            </li>
          </ul>
        )}
      </div>
      <div>
        <p
          onClick={handlePageVisibility}
          onMouseEnter={() => {
            setLimitVisibility(false);
          }}
        >
          Page : {page}
        </p>
        {pageVisibility && (
          <ul onMouseLeave={handlePageVisibility}>
            {arrayFromPages.map((page) => {
              return (
                <li
                  key={page}
                  onClick={() => {
                    setPage(page);
                    handlePageVisibility();
                  }}
                >
                  {page}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
