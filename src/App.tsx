import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Intro from "./Intro";
import ProductPage from "./ProductPage";
import NewsPage from "./NewsPage";
import ContactPage from "./ContactPage";
import LoginPage from "./LoginPage/LoginPage";
import SignUpPage from "./SignUpPage/SignUpPage";
import AccessDeniedPage from "./AccessDeniedPage";
import ViewedProductsPage from "./ProductPage/ViewedProductsPage";
import StoreSystem from "./StoreSystem/StoreSystem";
import RecruitmentPage from "./Recruitment/RecruitmentPage";
import JobListPage from "./Recruitment/JobListPage";
import JobDetailPage from "./Recruitment/JobDetailPage";
import RichTextEditor from "./Recruitment/RichTextEditor";
import ProductComparisonPageResult from "./ProductPage/ProductComparisonPageResult";
import CartPage from "./CartPage/CartPage";
import OrderPage from "./OrderPage/OrderPage";
import ViewOrderList from "./ViewOrderList";
import ViewOrderDetail from "./ViewOrderDetail";
import OrderSuccessfully from "./OrderPage/OrderSuccessfully";
import SignUpSaleAccount from "./SignUpPage/SignUpSaleAccount";

function App() {
  return (
    <div className="app">
      <div className="content">
          <Router>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/intro">
                <Intro />
              </Route>
              <Route path="/products">
                <ProductPage />
              </Route>
              <Route path="/order-successfully">
                <OrderSuccessfully />
              </Route>
              <Route path="/create/sale-account">
                <SignUpSaleAccount />
              </Route>
              <Route path="/cart">
                <CartPage/>
              </Route>
              <Route path="/order">
                <OrderPage/>
              </Route>
              <Route path="/list-order">
                <ViewOrderList/>
              </Route>
              <Route path="/order-detail/:orderId">
                <ViewOrderDetail/>
              </Route>
              <Route path="/news">
                <NewsPage />
              </Route>
              <Route path="/contact">
                <ContactPage />
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/signup">
                <SignUpPage />
              </Route>
              <Route path="/accessDenied">
                <AccessDeniedPage />
              </Route>
              <Route path="/viewed-products">
                <ViewedProductsPage />
              </Route>
              <Route path="/stores">
                <StoreSystem />
              </Route>
              <Route path='/careers'>
                <RecruitmentPage />
              </Route>
              <Route path='/store-jobs'>
                <JobListPage
                  sector='store'
                />
              </Route>
              <Route path='/office-jobs'>
                <JobListPage
                  sector='office'
                />
              </Route>
              <Route path='/job-detail'>
                <JobDetailPage />
              </Route>
              <Route path='/text-editor'>
                <RichTextEditor />
              </Route>
              <Route path='/compare'>
                <ProductComparisonPageResult />
              </Route>
            </Switch>
          </Router>
      </div>
    </div>
  );
}

export default App;
