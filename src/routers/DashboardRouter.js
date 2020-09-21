import React from "react";
import { Navbar } from "../components/ui/Navbar";
import { MarvelScreen } from "../components/marvel/MarvelScreen";
import { Route, Switch, Redirect } from "react-router-dom";
import { DcScreen } from "../components/dc/DcScreen";
import { HeroeScreen } from "../heroes/HeroeScreen";
import { Search } from "../components/search/Search";

export const DashboardRouter = () => {
  return (
    <>
      <Navbar />

      <div className="container mt-2">
        <Switch>
          <Route exact path="/marvel" component={MarvelScreen} />
          <Route exact path="/hero/:heroeId" component={HeroeScreen} />
          <Route path="/dc" component={DcScreen} />
          <Route path="/search" component={Search} />

          <Redirect to="/marvel" />
        </Switch>
      </div>
    </>
  );
};
