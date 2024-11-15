import { Route, Routes } from "react-router-dom";
import Index from "./pages/index";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./assect/scss/style.scss";
import "./assect/css/materialdesignicons.min.css";
import ScrollTop from "./components/scrollTop";
import IndexTwo from "./pages/index/index-two";
import UserDashboard from "./pages/Dashboard/UserDashboard";
import Buy from "./pages/buy";
import Sell from "./pages/sell";
import Grid from "./pages/listing/grid";
import GridSidebar from "./pages/listing/grid-sidebar";
import List from "./pages/listing/list";
import ListSidebar from "./pages/listing/list-sidebar";
import PropertyDetails from "./pages/listing/property-detail";
import AboutUs from "./pages/aboutus";
import Features from "./pages/features";
import Pricing from "./pages/pricing";
import Faqs from "./pages/faqs";
import ContactUs from "./pages/contactus";
import AuthLogin from "./pages/auth/auth-login";
import ResetPassword from "./pages/auth/auth-re-password";
import Signup from "./pages/auth/auth-signup";
import Error from "./pages/Special/error";
import { Business } from "./pages/Business";
import PrivateRoute from "./pages/auth/PrivateRoute/PrivateRoute";
import PublicRoute from "./pages/auth/PublicRoute/PublicRoute";
import Payment from "./pages/payment";
import MyProduct from "./pages/myproduct";
import SuperAdminRouting from "./SuperAdmin/Router/index";
function App() {

  return (
    <>
      <Routes>
        
        <Route path="/superadmin/*" element={<SuperAdminRouting />} />
        {/* Public Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/index-two" element={<IndexTwo />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/contactus" element={<ContactUs />} />
        {/* Auth Routes (Public, but restricted for authenticated users) */}
        <Route
          path="/auth-login"
          element={
            <PublicRoute>
              <AuthLogin />
            </PublicRoute>
          }
        />
        <Route
          path="/auth-signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/auth-reset-password"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />
        {/* Private Routes */}
        <Route
          path="/buy/:productId"
          element={
            <PrivateRoute>
              <Buy />
            </PrivateRoute>
          }
        />
        <Route
          path="/bank-details"
          element={
            <PrivateRoute>
              <Payment />
            </PrivateRoute>
          }
        />
        <Route
          path="/userDashbaord"
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/myproduct"
          element={
            <PrivateRoute>
              <MyProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/sell"
          element={
            <PrivateRoute>
              <Sell />
            </PrivateRoute>
          }
        />
        <Route
          path="/grid"
          element={
            <PrivateRoute>
              <Grid />
            </PrivateRoute>
          }
        />
        <Route
          path="/grid-sidebar"
          element={
            <PrivateRoute>
              <GridSidebar />
            </PrivateRoute>
          }
        />
        <Route
          path="/list"
          element={
            <PrivateRoute>
              <List />
            </PrivateRoute>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <ListSidebar />
            </PrivateRoute>
          }
        />
        <Route
          path="/product-details"
          element={
            <PrivateRoute>
              <PropertyDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/product-details/:productId"
          element={
            <PrivateRoute>
              <PropertyDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/Business"
          element={
            <PrivateRoute>
              <Business />
            </PrivateRoute>
          }
        />
        {/* Special Pages */}
        {/* <Route path="/comingsoon" element={<Comingsoon />} /> */}
        {/* <Route path="/maintenance" element={<Maintenance />} /> */}
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ScrollTop />
    </>
  );
}

export default App;
