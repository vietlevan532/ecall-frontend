import Customer from "./Customer";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import Slide from "./Slide";
import Solution from "./Solution";
import Top from "./Top";

function Home() {
  return (
    <div className="home">
      <Top />
      <Header />
      <Slide />
      <Products />
      <Solution />
      <Customer />
      <Footer />
    </div>
  );
}

export default Home;
