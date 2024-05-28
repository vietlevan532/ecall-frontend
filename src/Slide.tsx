import { useEffect } from "react";
import "./Slide.css";

function Slide() {
  var slideIndex = 1;

  const showSlides = (n: number) => {
    var i;
    var slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLDivElement>;
    var dots = document.getElementsByClassName("dot") as HTMLCollectionOf<HTMLDivElement>;
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
  }

  useEffect(() => {
      showSlides(slideIndex);
  })

  const plusSlides = (n:number) => {
    showSlides((slideIndex += n));
  }

  // Thumbnail image controls
  const currentSlide = (n:number) => {
    showSlides((slideIndex = n));
  }

  return (
    <div className="slide">
      <div className="slideshow-container">
        <div className="mySlides fade">
          <div className="numbertext">1 / 4</div>
          <img src="./1.png" style={{ width: "100%" }} alt="" />
          <div className="text">Caption Text</div>
        </div>

        <div className="mySlides fade">
          <div className="numbertext">2 / 4</div>
          <img src="./2.png" style={{ width: "100%" }} alt="" />
          <div className="text">Caption Two</div>
        </div>

        <div className="mySlides fade">
          <div className="numbertext">3 / 4</div>
          <img src="./3.jpg" style={{ width: "100%" }} alt="" />
          <div className="text">Caption Three</div>
        </div>
        
        <span className="prev" onClick={(event) => plusSlides(-1) }>
          &#10094;
        </span>
        <span className="next" onClick={event => plusSlides(1)}>
          &#10095; 
        </span>
      </div>
      <br />

      <div style={{ textAlign: "center" }}>
        <span
          className="dot"
          onClick={() => currentSlide(1)}
        ></span>
        <span
          className="dot"
          onClick={() => currentSlide(2)}
        ></span>
        <span
          className="dot"
          onClick={() => currentSlide(3)}
        ></span>
      </div>
    </div>
  );
}

export default Slide;
