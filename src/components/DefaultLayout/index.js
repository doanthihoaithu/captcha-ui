import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SideBar from 'components/SideBar'
import routes from 'routes';
// import { userServices } from 'services';

export default () => {
  return (
    <div className="home-container row overflow-hidden w-100 m-0 animated fadeIn fast ">
      <div className="col-1 pr-0 d-inline-block side-bar-root animated slideInLeft" style={{ "minHeight": "100vh" }}>
        <SideBar />
      </div>
      <div className="col-11 d-flex flex-column align-items-center">
        <Suspense fallback="Loading...">
          <Switch>
            {routes.appRoutes.map(route =>
              route.component ? (
                <Route
                  key={route.name}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={restProps => <route.component {...restProps} title={route.name} />}
                />
              ) : null,
            )}
            <Redirect from="/" to="/" />
          </Switch>
        </Suspense>
      </div>
    </div>
  );
};
