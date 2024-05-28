import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import Top from "../Top";
import "./LoginPage.css";
import { iUser } from "../type";

function LoginPage() {
  const history = useHistory();
  const [username, setUsername] = useState<string | "">("");
  const [password, setPassword] = useState<string | "">("");
  const [isBadCredentials, setIsBadCredentials] = useState<boolean>(false);
  const [isMissingFields, setIsMissingFields] = useState<boolean>(false);

  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [isTokenFetched, setIsTokenFetched] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<iUser>();

  var SALE: string = "ROLE_SALE";
  var USER: string = "ROLE_USER";

  console.log("user: ", user?.authorities);

  const checkMissingFields = (): boolean => {
    return username.trim().length === 0 || password.trim().length === 0;
  };

  const signin = () => {
    setIsSigningIn(true);
  };

  useEffect(() => {
    const fetchJWTToken = (username: string, password: string) => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        username: username,
        password: password,
        rememberMe: true,
      });

      var requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,

        body: raw,
        redirect: "follow",
      };

      fetch("/api/authenticate", requestOptions)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
          throw new Error('Bad credentials');
        })
        .then((result) => {
          let accessToken: string = result["id_token"];
          localStorage.setItem("accessToken", accessToken);
          setIsTokenFetched(true);
        })
        .catch((error) => {
          console.log("error", error);
          setIsBadCredentials(true);
        });
    };

    if (isSigningIn) fetchJWTToken(username, password);
  }, [isSigningIn, username, password]);

  useEffect(() => {
    const setupUserData = (): void => {
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer " + localStorage.getItem("accessToken")
      );

      var requestOptions: RequestInit = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch("/api/account", requestOptions)
        .then((response) => {
          if (response.ok) {
            console.log("Setting up user data");
            return response.json();
          }
        })
        .then((result) => {
          localStorage.setItem("user", JSON.stringify(result));
          setIsLoggedIn(true);
        })
        .catch((error) => console.log("error", error));
    };

    if (isTokenFetched) setupUserData();
  }, [isTokenFetched]);

  const login = () => {
    signin();
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem('user');
    console.log('Logged in: ', loggedIn);
    if (loggedIn) {
      const foundLogged = JSON.parse(loggedIn);
      setUser(foundLogged);
    }
    if (isLoggedIn) {
      console.log('authenticated: ', user?.authorities)
      if (user?.authorities.includes(SALE)) {
        history.push("/list-order");
        setIsBadCredentials(false);
        return;
      } else {
        history.push("/");
        setIsBadCredentials(false);
        return;
      }
    }
  }, [isLoggedIn, history, user?.authorities, USER]);

  const handleLogin = (): void => {
    if (!checkMissingFields()) {
      setIsMissingFields(false);
      login();
    } else {
      setIsMissingFields(true);
    }
  };

  return (
    <div className="login__page">
      <Top />
      <Header />
      <main className="login__main">
        <div className="login__title">
          <span>Đăng nhập</span>
        </div>
        <form className="login__form">
          <div className="login__input">
            <span>
              Tên đăng nhập / Email <b style={{ color: "red" }}>*</b>
            </span>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="login__input">
            <span>
              Password <b style={{ color: "red" }}>*</b>
            </span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <p
              style={
                isBadCredentials ? { display: "block" } : { display: "none" }
              }
            >
              Sai tên đăng nhập hoặc mật khẩu
            </p>
            <p
              style={
                isMissingFields ? { display: "block" } : { display: "none" }
              }
            >
              Cần nhập đầy đủ các trường thông tin
            </p>
          </div>
          <div className="button__group">
            <button type="button" onClick={handleLogin}>
              Đăng nhập
            </button>
            <button type="button">
              <Link to="/signup">Đăng ký</Link>
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default LoginPage;
