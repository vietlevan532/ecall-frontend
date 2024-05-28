import React, { useState } from "react";
import { useHistory } from "react-router";
import Footer from "../Footer";
import Header from "../Header";
import Top from "../Top";
import "./SignUpPage.css";

function SignUpPage() {
  const [email, setEmail] = useState<string | "">("");
  const [password, setPassword] = useState<string | "">("");
  const [repassword, setRepassword] = useState<string | "">("");
  const [fullname, setFullname] = useState<string | "">("");
  const [gender, setGender] = useState<string | "">("Male");
  const [phone, setPhone] = useState<string | "">("");
  const [address, setAddress] = useState<string | "">("");
  

  const [isMissingEmail, setIsMissingEmail] = useState<boolean>(false);
  const [isMissingPassword, setIsMissingPassword] = useState<boolean>(false);
  const [isMissingRepassword, setIsMissingRepassword] =
    useState<boolean>(false);
  const [isMissingFullname, setIsMissingFullname] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const history = useHistory();

  const isMissingField = (): boolean => {
    if (
      email?.trim().length === 0 ||
      password?.trim().length === 0 ||
      repassword?.trim().length === 0 ||
      fullname?.trim().length === 0
    ) {
      if (email?.trim().length === 0) {
        setIsMissingEmail(true);
      } else {
        setIsMissingEmail(false);
      }
      if (password?.trim().length === 0) {
        setIsMissingPassword(true);
      } else {
        setIsMissingPassword(false);
      }
      if (repassword?.trim().length === 0) {
        setIsMissingRepassword(true);
      } else {
        setIsMissingRepassword(false);
      }
      if (fullname?.trim().length === 0) {
        setIsMissingFullname(true);
      } else {
        setIsMissingFullname(false);
      }
      return true;
    }
    setIsMissingEmail(false);
    setIsMissingPassword(false);
    setIsMissingRepassword(false);
    setIsMissingFullname(false);
    return false;
  };

  const registerUser = (): void => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      login: email,
      password: password,
      fullName: fullname,
      gender: gender,
      phone: phone,
      address: address,
    });

    var requestOptions : RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/api/register", requestOptions)
      .then((response) => {
        console.log(response.status);
        if (response.status === 201) {
          return response.headers.get("Location")!;
        } 
        throw Error("Can't redirect");
      })
      .then((redirectURL) => {
        history.push(redirectURL);
      })
      .catch((error) => {
        console.log("error", error)
      });
    return;
  };

  const submit = (): void => {
    if (isMissingField()) return;
    if (isPasswordValid) {
      registerUser();
      alert('Đăng ký thành công')
    } else {
      alert('Đăng ký không thành công');
    }
  };

  return (
    <div className="signup__page">
      <Top />
      <Header />
      <div className="signup__main">
        <div className="signup__title">
          <span>Đăng ký tài khoản </span>
        </div>
        <form className="signup__form">
          <div className="signup__sectionTitle">
            <span>Thông tin tài khoản</span>
          </div>
          <div className="signup__input">
            <span>
              Email <b style={{ color: "red" }}>*</b>
            </span>
            <div className="signup__inputAndError">
              <input
                type="text"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <p
                style={
                  !isMissingEmail ? { display: "none" } : { display: "block" }
                }
              >
                Email không được để trống
              </p>
            </div>
          </div>
          <div className="signup__input">
            <span>
              Mật khẩu <b style={{ color: "red" }}>*</b>
            </span>
            <div className="signup__inputAndError">
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <p
                style={
                  !isMissingPassword
                    ? { display: "none" }
                    : { display: "block" }
                }
              >
                Mật khẩu không được để trống
              </p>
              
            </div>
          </div>
          <div className="signup__input">
            <span>
              Nhập lại mật khẩu <b style={{ color: "red" }}>*</b>
            </span>
            <div className="signup__inputAndError">
              <input
                type="password"
                value={repassword}
                onChange={(event) => {
                  let currentTypingInput = event.target.value;
                  setRepassword(currentTypingInput);
                  if (password === currentTypingInput || password.trim().length === 0) {
                    setIsPasswordValid(true);
                  } else {
                    setIsPasswordValid(false);
                  }
                }}
              />
              <p
                style={
                  !isMissingRepassword
                    ? { display: "none" }
                    : { display: "block" }
                }
              >
                Bạn cần nhập lại mật khẩu
              </p>
              <p
                style={
                  isPasswordValid
                    ? { display: "none" }
                    : { display: "block" }
                }
              >
                Không trùng với mật khẩu đã nhập
              </p>
            </div>
          </div>
          <div className="signup__sectionTitle">
            <span>Thông tin cá nhân</span>
          </div>
          <div className="signup__input">
            <span>
              Họ và tên <b style={{ color: "red" }}>*</b>
            </span>
            <div className="signup__inputAndError">
              <input
                type="text"
                value={fullname}
                onChange={(event) => setFullname(event.target.value)}
              />
              <p
                style={
                  !isMissingFullname
                    ? { display: "none" }
                    : { display: "block" }
                }
              >
                Họ tên không được bỏ trống
              </p>
            </div>
          </div>
          <div className="signup__inputNoError">
            <span>Giới tính</span>
            <select name="gender" id="gender" value={gender} onChange={event => setGender(event.target.value)}>
              <option value="Male">Nam</option>
              <option value="Female">Nữ</option>
            </select>
          </div>
          <div className="signup__inputNoError">
            <span>Số điện thoại</span>
            <input
              type="text"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>
          <div className="signup__inputNoError">
            <span>Địa chỉ</span>
            <input
              type="text"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
          </div>
          <button type="button" onClick={submit}>
            Đăng ký
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default SignUpPage;
