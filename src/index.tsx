import React from "react";
import ReactDOM from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import "./styles/styles.css";
import App from "./components/App";
import firebase from "firebase/app";
import { firebaseConfig } from "./firebase";
import "firebase/auth";
import { ProvideAuth } from "./providers/authProvider";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";
import { BrowserRouter } from "react-router-dom";

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <HelmetProvider>
        <BrowserRouter>
          <ProvideAuth>
            <App />
          </ProvideAuth>
        </BrowserRouter>
      </HelmetProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
