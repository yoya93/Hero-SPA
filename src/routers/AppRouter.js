import React, { useContext } from "react";

import { BrowserRouter as Router, Switch } from "react-router-dom";
import { LoginScreen } from "../components/login/LoginScreen";
import { DashboardRouter } from "./DashboardRouter";
import { PrivateRoute } from "./PrivateRoute";
import { AuthContext } from "../auth/AuthContext";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  const { user } = useContext(AuthContext);
  return (
    <Router basename="/heroes-app">
      <div>
        <Switch>
          <PublicRoute
            isAuthenticated={user.logged}
            exact
            path="/login"
            component={LoginScreen}
          />

          <PrivateRoute
            isAuthenticated={user.logged}
            path="/"
            component={DashboardRouter}
          />
        </Switch>
      </div>
    </Router>
  );
};
