import React, { useEffect } from "react";
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
import { Footer } from "./components/footer/Footer";
//import { selectCollectionsForPreview } from "./redux/shop/shop-selectors";

const App = ({ currentUser, setCurrentUser }) => {
  useEffect(() => {
    let unsubscribeFromAuth = null;

    unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
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

    //Closing subscription
    return () => {
      unsubscribeFromAuth();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path={process.env.PUBLIC_URL + "/"} component={HomePage} />
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
            currentUser ? (
              <Redirect to={process.env.PUBLIC_URL + "/"} />
            ) : (
              <SignInOut />
            )
          }
        />
        <Route render={() => <Redirect to={process.env.PUBLIC_URL + "/"} />} />
      </Switch>
      <Footer />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
