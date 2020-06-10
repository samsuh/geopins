import React from "react";

import withRoot from "../withRoot";
import Header from "../components/Header";

const App = () => {
  return (
    <div>
      <Header />
      App goes here
    </div>
  );
};

export default withRoot(App);
