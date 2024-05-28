import React, { useState } from "react";
import "./ContactPage.css";
import Header from "./Header";
import Footer from "./Footer";
import Top from "./Top";
import SideBar from "./SideBar";

function ContactPage() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isMissingField, setIsMissingField] = useState<boolean>(false);

  const handleSubmit = () => {
    if (
      name.trim().length === 0 ||
      email.trim().length === 0 ||
      phone.trim().length === 0 ||
      subject.trim().length === 0 ||
      content.trim().length === 0
    ) {
      setIsMissingField(true);
      console.log("i've been here");
      return;
    } else {
      setIsMissingField(false);
    }

    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("accessToken")
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: name,
      email: email,
      phone: phone,
      subject: subject,
      content: content,
    });

    var requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/api/contact", requestOptions)
      .then((response) => {
        if (response.status === 204) {
          alert("Gửi yêu cầu liên hệ thành công!");
          setName("");
          setContent("");
          setEmail("");
          setPhone("");
          setSubject("");
          return;
        }
        throw Error("Gửi yêu cầu liên hệ thất bại");
      })
      .catch((error) => {
        alert(error.message);
        console.log("error", error);
      });
  };

  return (
    <div className="contact__page">
      <Top />
      <Header />
      <div className="contact__pageMain">
        <SideBar />
        <main>
          <div className="page__location">
            <span>Trang chủ /</span>
            <span>Liên hệ</span>
          </div>
          <div className="contact__pageContent">
            <div className="contact__info">
              <h4>NHÀ PHÂN PHỐI THIẾT BỊ CHUÔNG GỌI PHỤC VỤ ECALL</h4>
              <p>
                <b>Trụ sở chính Hà Nội: </b>Đại học Bách khoa Hà Nội
              </p>
              <p>
                Xin vui lòng điền các yêu cầu vào form dưới đây và gửi cho chúng
                tội. Chúng tôi sẽ trả lời bạn ngay khi nhận được. Xin chân thành
                cảm ơn
              </p>
            </div>
            <form className="contact__form">
              <div className="contact__input">
                <span>Họ và tên:</span>
                <span style={{ color: "red" }}>*</span>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div className="contact__input">
                <span>Email</span>
                <span style={{ color: "red" }}>*</span>
                <input
                  type="text"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="contact__input">
                <span>Số điện thoại</span>
                <span style={{ color: "red" }}>*</span>
                <input
                  type="text"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </div>
              <div className="contact__input">
                <span>Chủ đề</span>
                <span style={{ color: "red" }}>*</span>
                <input
                  type="text"
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                />
              </div>
              <div className="contact__input">
                <span>Nội dung</span>
                <span style={{ color: "red" }}>*</span>
                <input
                  type="text"
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                />
              </div>
              {isMissingField ? (
                <p className="addProduct__errorLog" id="contactPage__errorLog" style={{ color: "red" }}>
                  Cần điền đầy đủ vào các trường thông tin còn thiếu
                </p>
              ) : null}
              <button type="button" onClick={handleSubmit}>
                Gửi yêu cầu
              </button>
            </form>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default ContactPage;
