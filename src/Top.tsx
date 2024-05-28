import { useEffect, useState } from "react";
import "./Top.css";
import HeadsetIcon from "@material-ui/icons/Headset";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

enum Gender {MALE="Male", FEMALE="Female"}

interface User {
  isAuthenticated: boolean;
  id: number;
  login: string;
  fullName: string;
  gender: Gender;
  phone: string;
  authorities: string[];
};

function Top() {
  const history = useHistory();
  const [displayUserInfo, setDisplayUserInfo] = useState<boolean>(false);
  const [user, setUser] = useState<User>();

  var ADMIN: string = "ROLE_ADMIN"

  const popupUserInfo = (): void => {
    setDisplayUserInfo(!displayUserInfo);
  };

  const signout = (): void => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    history.push("/login");
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, [])

  return (
    <div className="top">
      <div className="top__left">
        <HeadsetIcon className="headset__icon" />
        <span className="hotline__text">Hotline:</span>
        <span className="hotline__number">0982.703.283</span>
      </div>
      <div className="top__right">
        {user?.authorities.includes(ADMIN) ? 
          <>
            <Link 
              style={{color: '#f58029', padding:'4px', borderRadius:'5px', margin:'0 20px 0 5px', fontSize:'14px', textDecorationLine: 'none', cursor: 'pointer', fontWeight: 480}}
              to={'/create/sale-account'}>
              Tạo tài khoản nhân viên
            </Link>
            <span style={{color:'black', marginRight:'15px', marginLeft:'0'}}>|</span>
          </>
          : null}
        <div className="logIn__signUp">
          {user ? (
            <div
              className="top__userProfile"
              onClick={popupUserInfo}
            >
              <span style={{cursor:'pointer'}}>Xin chào, {user?.fullName}!</span>
              <FontAwesomeIcon
                icon={faUserCircle}
                className="top__userProfileIcon"
              />
              <div
                className="user__profilePopUp"
                style={
                  displayUserInfo ? { display: "block" } : { display: "none" }
                }
              >
                <div>Email: {user.login}</div>
                <div>Họ và tên: {user.fullName}</div>
                <div>Giới tính: {user.gender}</div>
                <div>Số điện thoại: {user.phone}</div>
                <button type="button" onClick={signout}>
                  Đăng xuất
                </button>
              </div>
            </div>
          ) : (
            <div className="login__signupReal">
              <Link to="/login">
                <span>ĐĂNG NHẬP</span>
              </Link>
              <span>|</span>
              <Link to="/signup">
                <span>ĐĂNG KÝ</span>
              </Link>
            </div>
          )}
        </div>
        <div className="flags">
          <input
            className="flag"
            type="image"
            src="./vn.svg"
            alt=""
            style={{ width: "30px" }}
          />
          <input
            className="flag"
            type="image"
            src="./gb.svg"
            alt=""
            style={{ width: "30px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Top;
