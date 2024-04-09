import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
Amplify.configure({
  API: {
    GraphQL: {
      endpoint:
        "https://gn3b64i4trfmjetttxctl6wh74.appsync-api.us-east-1.amazonaws.com/graphql",
      defaultAuthMode: "apiKey",
      apiKey: "da2-v6arm3gbobb3hbmwz7byvrzepm",
    },
  },
});

export const amplifyClient = generateClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
