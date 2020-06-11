import { useState, useEffect } from "react";
import { GraphQLClient } from "graphql-request";

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "<insert-production-url>"
    : "http://localhost:4000/graphql";

export const useClient = () => {
  const [idToken, setIdToken] = useState("");
  //update state using useEffect, pass [] to only run it once on the initial render
  // if [] is not passed, it could cause an infinite loop; update state > rerender > new state > rerender > new state, etc.
  useEffect(() => {
    const token = window.gapi.auth2
      .getAuthInstance()
      .currentUser.get()
      .getAuthResponse().id_token;
    setIdToken(token);
  }, []);

  return new GraphQLClient(BASE_URL, {
    headers: { authorization: idToken },
  });
};
