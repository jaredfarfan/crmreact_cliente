import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";

const OBTENER_USUARIO = gql`
  query obtenerUsuario {
    obtenerUsuario {
      id
      name
      city
    }
  }
`;

const Header = () => {
  const router = useRouter();
  // query de apollo
  const { data, loading, error } = useQuery(OBTENER_USUARIO);
  console.log(data);
  console.log(loading);
  console.log(error);
  // Proteger que no accedamos a data antes de tener resultados
  if (loading) return null;

  //const { name } = data.obtenerUsuario;
  // Si no hay informacion
  //console.log("listItems");
  //console.log(name);
  if (!data.obtenerUsuario) {
    return router.push("/login");
  }
  console.log("data");
  //console.log(data);
  const vistaProtegida = () => {
    router.push("/login");
  };
  return <>{data.obtenerUsuario ? <div></div> : vistaProtegida()}</>;
};

export default Header;
