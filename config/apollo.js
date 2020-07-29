import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
//este permitira obtener resultados y traerlos a los componenters
import fetch from "node-fetch";
import { setContext } from "apollo-link-context";
import Router from "next/router";

const httpLink = createHttpLink({
  uri: "http://localhost:4000",
  //uri: 'https://sleepy-savannah-78232.herokuapp.com/',
  fetch,
});

const authLink = setContext((_, { headers }) => {
  // Leer el storage almacenado
  const token = localStorage.getItem("token");
  console.log("token");
  console.log(token);

  /*if (!token) {
    Router.push("/login");
  }*/
  return {
    //tomamos la copia y agreamos nuestra propio headers para mardar
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  //dondes esta instalado apollo server
  link: authLink.concat(httpLink),
});

export default client;
