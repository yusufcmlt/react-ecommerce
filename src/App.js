import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./App.css";

import HomePage from "./pages/homepage/Homepage";
import ShopPage from "./pages/shop/Shop";
import Search from "./pages/search/Search";
import Header from "./components/header/Header";
import SignInOut from "./pages/signinout-page/SignInOut";
import CheckOut from "./pages/checkout/Checkout";

import { auth, createUserProfileDocument } from "./firebase/firebase-utils";
import { setCurrentUser } from "./redux/user/user-actions";
import { selectCurrentUser } from "./redux/user/user-selectors";
//import { selectCollectionsForPreview } from "./redux/shop/shop-selectors";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    //Getting shop collections array and set user functions from redux as a prop.
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      //If user signs in
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }
      //No user or signing out => null data.
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    //Closing subscription
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path={process.env.PUBLIC_URL + "/"}
            component={HomePage}
          />
          <Route path={process.env.PUBLIC_URL + "/shop"} component={ShopPage} />
          <Route
            exact
            path={process.env.PUBLIC_URL + "/checkout"}
            component={CheckOut}
          />
          <Route
            exact
            path={process.env.PUBLIC_URL + "/search/:searchQuery"}
            component={Search}
          />
          <Route
            exact
            path={process.env.PUBLIC_URL + "/signin"}
            render={() =>
              this.props.currentUser ? (
                <Redirect to={process.env.PUBLIC_URL + "/"} />
              ) : (
                <SignInOut />
              )
            }
          />
          <Route
            exact
            path={process.env.PUBLIC_URL + "/contact"}
            component={HomePage}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
