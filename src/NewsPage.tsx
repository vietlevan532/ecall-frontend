import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import "./NewsPage.css";
import Top from "./Top";
import ImageUploader from "react-images-upload";
import { iUser, iNews } from "./type";

const ADMIN = "ROLE_ADMIN";

function NewsPage() {
  const [showAddNews, setShowAddNews] = useState<boolean>(false);
  const [showUpdateNews, setShowUpdateNews] = useState<boolean>(false);
  const [id, setId] = useState<number>();
  const [name, setName] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [isMissingField, setIsMissingField] = useState<boolean>(false);
  const [imageLink, setImageLink] = useState<string>("");

  const [imageFile, setImageFile] = useState<any>();

  const [newsList, setNewsList] = useState<iNews[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  //current user
  const [user, setUser] = useState<iUser>();
  //selected update news
  const [selectedNews, setSelectedNews] = useState<iNews>();

  const checkIsMissingFields = () => {
    if (
      name.trim().length === 0 ||
      link.trim().length === 0
      // imageFile.trim().length === 0
    ) {
      setIsMissingField(true);
      return true;
    } else {
      setIsMissingField(false);
      return false;
    }
  };

  const resetFields = () => {
    setSelectedNews(undefined);
    setId(undefined);
    setName("");
    setLink("");
    setImageLink("");
  };

  const onDrop = (newImage: any) => {
    if (newImage.length > 0) {
      const selectedImage = newImage[0];
      setImageFile(selectedImage);
    } else {
      setImageFile(undefined);
    }
  };

  const getNewsById = (id: number) => {
    console.log(id);
    newsList.forEach((news) => {
      if (news.id === id) {
        setSelectedNews(news);
        console.log(news);
        return;
      }
    });
  };

  const handleUpdateNews = async (id: number) => {
    //get and set news data
    getNewsById(id);
    setShowUpdateNews(true);
  };

  useEffect(() => {
    if (showUpdateNews) {
      setId(selectedNews?.id);
      setName(selectedNews?.name!);
      setLink(selectedNews?.link!);
      setImageFile(selectedNews?.imageLink);
    }
  }, [showUpdateNews, selectedNews]);

  const handleCloseUpdateNews = () => {
    setShowUpdateNews(false);
    resetFields();
  };

  const submitUpdateNews = () => {
    if (checkIsMissingFields()) return;

    const formData = new FormData();
    formData.append("file", imageFile);

    var headers = new Headers();
    headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem("accessToken")
    );

    var requestOptionsUploadImage: RequestInit = {
      method: "POST",
      headers: headers,
      body: formData,
      redirect: "follow",
    };

    fetch("/api/news/upload-image", requestOptionsUploadImage)
      .then((response) => {
        return response.text();
      })
      .then((imageUpload) => {
        var myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          "Bearer " + localStorage.getItem("accessToken")
        );
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          id: id,
          name: name,
          link: link,
          imageLink: imageUpload,
        });

        var requestOptions: RequestInit = {
          method: "PUT",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch("/api/admin/news", requestOptions)
          .then((response) => {
            if (response.ok) {
              alert("Cập nhật thông tin bản tin thành công");
              setShowUpdateNews(false);
              resetFields();
              return response.json();
            }
            throw Error("Can not create news");
          })
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
      })
      .catch(error => {
        console.error("Error when you upload your news image", error);
        alert("Upload news image failed. Please try again!");
      }
    );
  };

  const handleDeleteNews = (id: number) => {
    setId(id);
    setShowDeleteModal(true);
  };

  const submitDeleteNews = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("accessToken")
    );

    var requestOptions: RequestInit = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`/api/admin/news/${id}`, requestOptions)
      .then((response) => {
        if (response.status === 204) {
          alert("Xóa bản tin thành công");
          setShowDeleteModal(false);
          return response.text();
        }
      })
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const submitAddNews = () => {
    if (checkIsMissingFields()) return;

    const formData = new FormData();
    formData.append("file", imageFile);

    var headers = new Headers();
    headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem("accessToken")
    );

    var requestOptionsUploadImage: RequestInit = {
      method: "POST",
      headers: headers,
      body: formData,
      redirect: "follow",
    };

    fetch("/api/news/upload-image", requestOptionsUploadImage)
      .then((response) => {
        return response.text();
      })
      .then((imageUpload) => {
        var myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          "Bearer " + localStorage.getItem("accessToken")
        );
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          name: name,
          link: link,
          imageLink: imageUpload,
        });

        console.log('Raw: ',raw);

        var requestOptions: RequestInit = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch("/api/admin/news", requestOptions)
          .then((response) => {
            if (response.status === 201) {
              setShowAddNews(false);
              resetFields();
              return response.json();
            }
          })
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
      })
      .catch(error => {
        console.error("Error when you upload your news image", error);
        alert("Upload news image failed. Please try again!");
      }
    );
  };

  const [viewDetail, setViewDetail] = useState<boolean>(false);

  const handleViewDetail = (id: number) => {
    getNewsById(id);
    setViewDetail(true);
  };

  useEffect(() => {
    if (viewDetail) {
      window.location.replace(selectedNews!.link);
    }
    return () => {setViewDetail(false);}
  }, [viewDetail, selectedNews]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }

    const getAllNews = () => {
      var requestOptions: RequestInit = {
        method: "GET",
        redirect: "follow",
      };
  
      fetch("/api/news", requestOptions)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw Error("Can't fetch news");
        })
        .then((result) => {
          setNewsList(result);
        })
        .catch((error) => console.log("error", error));
    };

    getAllNews();
  }, [showDeleteModal, showAddNews, showUpdateNews]);

  return (
    <div className="news__page">
      <Top />
      <Header />

      <div className="news__bottom">
        {user?.authorities.includes(ADMIN) ? (
          <div>
            <button
              type="button"
              className="provider__button"
              onClick={() => setShowAddNews(true)}
            >
              Thêm tin tức
            </button>
          </div>
        ) : (
          <div className="news__title">
            <p>DỰ ÁN THI CÔNG</p>
            <p>Báo chí nói về chúng tôi</p>
          </div>
        )}

        <main className="news__main">
          <div className="news__wrapper">
            {newsList.length
              ? newsList.map((news) => {
                  return (
                    <div className="news">
                      <img
                        src={news.imageLink}
                        style={{ width: "100%" }}
                        alt=""
                      />
                      <p>{news.name}</p>
                      <p>
                        <span>{news.createdBy}</span> | {news.createdDate}
                      </p>

                      {user?.authorities.includes(ADMIN) ? (
                        <div className="news__buttonGroup">
                          <button
                            type="button"
                            onClick={() => handleUpdateNews(news.id)}
                          >
                            Sửa
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteNews(news.id)}
                          >
                            Xóa
                          </button>
                          <button type="button" onClick={() => handleViewDetail(news.id)}>
                            Xem chi tiết
                          </button>
                        </div>
                      ) : (
                        <div className="news__buttonGroup">
                          <button type="button" onClick={() => handleViewDetail(news.id)}>
                            Xem chi tiết
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })
              : null}
          </div>
        </main>

        <div
          className="addProductModal"
          style={showUpdateNews ? { display: "block" } : { display: "none" }}
        >
          <div className="modal-content">
            <span className="close" onClick={handleCloseUpdateNews}>
              &times;
            </span>
            <form className="form__addProduct">
              <div className="form__addProductTitle">
                <h4>CẬP NHẬT BẢN TIN</h4>
                <p>Hãy nhập đầy đủ thông tin để cập nhật bản tin mới</p>
              </div>
              <div className="form__addProductInputs">
                <div className="form__addProductInput">
                  <p>Tên bản tin: </p>
                  <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
                <div className="form__addProductInput">
                  <p>Đường link: </p>
                  <input
                    type="text"
                    value={link}
                    onChange={(event) => setLink(event.target.value)}
                  />
                </div>
                <div className="form__addProductInput">
                  <p>Ảnh ban đầu: </p>
                  <img
                    src={imageLink}
                    alt=""
                    style={{
                      objectFit: "cover",
                      maxWidth: "50%",
                      maxHeight: "100%",
                    }}
                  />
                </div>
                <div className="form__addProductInput">
                  <p>Ảnh cho bản tin: </p>
                  <ImageUploader
                    withIcon={false}
                    buttonText="Chọn ảnh"
                    singleImage
                    withPreview
                    onChange={onDrop}
                    imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
                    maxFileSize={5242880}
                  />
                </div>

                {isMissingField ? (
                  <p className="addProduct__errorLog" style={{ color: "red" }}>
                    Cần điền đầy đủ vào các trường thông tin còn thiếu
                  </p>
                ) : null}
                <button
                  type="button"
                  className="submitNewProduct__button"
                  onClick={submitUpdateNews}
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
        <div
          className="addProductModal"
          style={showAddNews ? { display: "block" } : { display: "none" }}
        >
          <div className="modal-content">
            <span className="close" onClick={() => setShowAddNews(false)}>
              &times;
            </span>
            <form className="form__addProduct">
              <div className="form__addProductTitle">
                <h4>THÊM BẢN TIN MỚI</h4>
                <p>Hãy nhập đầy đủ thông tin bản tin mới</p>
              </div>
              <div className="form__addProductInputs">
                <div className="form__addProductInput">
                  <p>Tên bản tin: </p>
                  <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
                <div className="form__addProductInput">
                  <p>Đường link: </p>
                  <input
                    type="text"
                    value={link}
                    onChange={(event) => setLink(event.target.value)}
                  />
                </div>
                <div className="form__addProductInput">
                  <p>Ảnh cho bản tin: </p>
                  <ImageUploader
                    withIcon={true}
                    buttonText="Chọn ảnh"
                    singleImage
                    withPreview
                    onChange={onDrop}
                    imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
                    maxFileSize={5242880}
                  />
                </div>

                {isMissingField ? (
                  <p className="addProduct__errorLog" style={{ color: "red" }}>
                    Cần điền đầy đủ vào các trường thông tin còn thiếu
                  </p>
                ) : null}
                <button
                  type="button"
                  className="submitNewProduct__button"
                  onClick={submitAddNews}
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
        <div
          className="deleteProduct__Modal"
          style={showDeleteModal ? { display: "block" } : { display: "none" }}
        >
          <div className="deleteProduct_modalContent">
            <p>Bạn có chắc chắn muốn xóa bản tin này?</p>
            <div>
              <button
                id="cancelDelete__button"
                type="button"
                className="provider__button"
                onClick={() => setShowDeleteModal(false)}
              >
                Hủy
              </button>
              <button
                type="button"
                className="provider__button"
                onClick={submitDeleteNews}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NewsPage;
