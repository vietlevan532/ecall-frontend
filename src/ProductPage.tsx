import { Switch, Route, useRouteMatch } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import ProductDetail from "./ProductDetail";
import "./ProductPage.css";
import { ProvideProductContext } from "./ProductPage/ProductPageContext";
import ProductPageContent from "./ProductPageContent";
import SideBar from "./SideBar";
import Top from "./Top";
import ProductComparison from "./ProductPage/ProductComparison";
import ProductSuggestion from "./ProductPage/ProductSuggestion";
import { useEffect, useState } from "react";
import { iUser } from "./type";

function ProductPage() {

  var USER: string = "ROLE_USER";

  const [user, setUser] = useState<iUser>();

  const { url } = useRouteMatch();
  const [ id, setId ] = useState();

  useEffect(() => {
    const roleAccess = localStorage.getItem('user');
    if (roleAccess) {
      const authorities = JSON.parse(roleAccess);
      setUser(authorities);
    }
  }, []);

  return (
    <div className="product__page">
      <Top />
      <Header />
      <div className="product__pageMain">
        <ProvideProductContext>
          <SideBar />
          <Switch>
            <Route exact path={`${url}`}>
              <ProductPageContent />
            </Route>
            <Route path={`${url}/:id`} render={() => (
              <ProductDetail setId={setId}/>
            )}>
            </Route>
          </Switch>
        </ProvideProductContext>
      </div>
      {user?.authorities.includes(USER) ? <ProductSuggestion id={id}/>
        : null
      }
      <ProductComparison />
      <Footer />
    </div>
  );
}

export default ProductPage;
