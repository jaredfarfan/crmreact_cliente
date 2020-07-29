import React from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
const Clientes = () => {
  return (
    <Layout>
      <h1>Lista de clientes</h1>
      <Link href="/clientes/nuevocliente">
        <button>Nuevo cliente</button>
      </Link>
    </Layout>
  );
};

export default Clientes;
