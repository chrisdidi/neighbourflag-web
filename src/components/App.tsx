import React from "react";
import { Helmet } from "react-helmet-async";
import MainRouter from "../routers/main-router";
import Header from "./header";

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>neighbourflag | Get and send help.</title>
      </Helmet>
      <Header />
      <MainRouter />
    </div>
  );
}

export default App;
