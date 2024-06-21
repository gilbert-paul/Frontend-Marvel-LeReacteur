import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AddFavorite = ({ url, type, title, description, image, id }) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  const fetchData = async () => {
    await axios
      .post(
        `${url}/favorites/add`,
        {
          type: type,
          title: title,
          description: description,
          image: image,
          id: id,
        },
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      )
      .then((response) => {
        setData(response.data.message);
        if (!response.data.message) {
          setIsSubmit(true);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  const handleSubmit = () => {
    fetchData();
  };
  if (isSubmit) {
    return <button disabled>Added</button>;
  }
  return (
    <>
      {Cookies.get("token") && (
        <button disabled={data ? true : false} onClick={handleSubmit}>
          {data ? data : "Add Favorite"}
        </button>
      )}
    </>
  );
};

export default AddFavorite;
