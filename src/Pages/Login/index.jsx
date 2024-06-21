import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = ({ modalVisibility, setModalVisibility, url }) => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    await axios
      .get(`${url}/user/login`, { params: { password: password, mail: mail } })
      .then((response) => {
        Cookies.set("token", response.data.token, { expires: 7 });
        setModalVisibility({ login: false, signup: false });
    document.body.style.overflowY = "initial";

      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleVisibility = () => {
    setModalVisibility({ ...modalVisibility, login: false });
    document.body.style.overflowY = "initial";
  };
  if (!modalVisibility.login) {
    return;
  }
  const handleMail = (event) => {
    setMail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
    setPassword("");
    setMail("");
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
            <h2>Login :</h2>
            <div>
              <label htmlFor="mail">Mail : </label>

              <input
                id="mail"
                type="email"
                onChange={handleMail}
                value={mail}
              />
            </div>
            <div>
              <label htmlFor="password">Password : </label>

              <input
                type="password"
                id="password"
                onChange={handlePassword}
                value={password}
              />
            </div>
            <button>Login</button>

            <p
              onClick={() => {
                setModalVisibility({ login: false, signup: true });
              }}
            >
              Signup here if you're not !
            </p>
          </form>
        </section>
      </div>
    </main>
  );
};

export default Login;
