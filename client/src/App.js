import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MyNavbar from "./components/MyNavBar/MyNavbar";
import Home from "./components/Pages/Home";
import Footer from "./components/Footer/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import PrivateRouteA from "./components/PrivateRoute/PrivateRouteAuthor";
import Login from "./components/Pages/Login";
import ForgotPassword from "./components/Pages/ForgotPassword";
import UpdateProfile from "./components/Pages/UpdateProfile";
import Signup from "./components/Pages/Signup";
import AuthorDashboard from "./components/Pages/AuthorDashboard";

const App = () => {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <MyNavbar />
          <video src="/videos/video-2.mp4" autoPlay loop muted />
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/author-dashboard" component={AuthorDashboard} />
          </Switch>
          <Footer />
        </AuthProvider>
      </Router>
    </div>
  );
};

export default App;
