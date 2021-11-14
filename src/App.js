import React, { lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

function App() {
  const Login = lazy(() => import("./Pages/Login/Login"));
  const ScrollingList = lazy(() =>
    import("./Pages/ScrollingList/ScrollingList")
  );

  return (
    <React.Fragment>
      <Suspense fallback={null}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/scrollinglist" component={ScrollingList}></Route>
        </Switch>
      </Suspense>
    </React.Fragment>
  );
}

export default App;
