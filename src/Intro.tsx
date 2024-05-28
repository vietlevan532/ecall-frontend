import Footer from "./Footer";
import Header from "./Header";
import "./Intro.css";
import IntroContent from "./IntroContent";
import SideBar from "./SideBar";
import Top from "./Top";

function Intro() {
  return (
    <div className="intro">
      <Top />
      <Header />
      <div className="intro__main">
        <SideBar />
        <IntroContent />
      </div>
      <Footer />
    </div>
  );
}

export default Intro;
