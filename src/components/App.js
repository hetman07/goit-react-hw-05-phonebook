import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";

function App() {
  return (
    <Suspense fallback={<PulseLoader size={20} color={"#123abc"} />}>
      <Switch>
        <Route path="/" exact component={lazy(() => import("./Phonebook"))} />
        <Redirect to="/" />
      </Switch>
    </Suspense>
  );
}

export default App;
