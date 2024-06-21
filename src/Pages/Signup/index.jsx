import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Signup = ({ url, modalVisibility, setModalVisibility }) => {
  const [username, setUsername] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  const handleMail = (event) => {
    setMail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleVisibility = () => {
    setModalVisibility({ ...modalVisibility, signup: false });
    document.body.style.overflowY = "initial";
  };

  const fetchData = async () => {
    await axios
      .post(`${url}/user/signup`, {
        password: password,
        mail: mail,
        username: username,
      })
      .then((response) => {
        Cookies.set("token", response.data.token, { expires: 7 });
        setModalVisibility({ login: false, signup: false });
    document.body.style.overflowY = "initial";

      })
      .catch((error) => {
        setError(error.message);
      });
  };

  if (!modalVisibility.signup) {
    return;
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };
  return (
    <main onClick={handleVisibility}>
      <div className="__modal">
        <section>
          <form
            onSubmit={handleSubmit}
            onClick={(elem) => {
              elem.stopPropagation();
            }}
          >
            <i
              onClick={handleVisibility}
              className="fa-regular fa-circle-xmark"
            ></i>

            <h2>Signup :</h2>
            <div>
              <label htmlFor="username">Username : </label>

              <input onChange={handleUsername} id="username" type="text"  placeholder="Username" />
            </div>
            <div>
              <label htmlFor="mail">Mail : </label>

              <input onChange={handleMail} id="mail" type="email"  placeholder="Mail"/>
            </div>
            <div>
              <label htmlFor="password">Password : </label>

              <input onChange={handlePassword} type="password" id="password" placeholder="Password"/>
            </div>
            <button>Signup</button>
            <p
              onClick={() => {
                setModalVisibility({ login: true, signup: false });
              }}
            >
              You have an account ?
            </p>
          </form>
        </section>
      </div>
    </main>
  );
};

export default Signup;
