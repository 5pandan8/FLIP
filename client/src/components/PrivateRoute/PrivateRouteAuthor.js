import { React, useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  const [check, setCheck] = useState(false);

  useEffect(() => {
    console.log("check", check);
  }, [check]);

  const checkAuthor = async () => {
    try {
      const parameters = {
        params: {
          user_UID: currentUser.uid,
        },
      };

      const res = await axios.get("/api/authorUpdate/checkAuthor", parameters, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data["check"];
    } catch (err) {
      console.log(err);
    }
  };

  checkAuthor().then((value) => {
    if (value) {
      return (
        <Route
          {...rest}
          render={(props) => {
            return currentUser && <Component {...props} />;
          }}
        ></Route>
      );
    } else {
      return (
        <Route
          {...rest}
          render={(props) => {
            return currentUser && <Redirect exact to="/" />;
          }}
        ></Route>
      );
    }
  });

  /*   return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          check ? (
            <Component {...props} />
          ) : (
            <Redirect exact to="/" />
          )
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  ); */
}
