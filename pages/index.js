import React, { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chart from "../components/Chart";
import Deposits from "../components/Deposits";
import Orders from "../components/Orders";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

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

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));
const Home = () => {
  const router = useRouter();
  // query de apollo
  const { data, loading, error } = useQuery(OBTENER_USUARIO);
  console.log("data");
  console.log(data);
  console.log(loading);
  console.log(error);
  // Proteger que no accedamos a data antes de tener resultados

  const classes = useStyles();

  //const [classes, setClasses] = useState({});
  useEffect(() => {
    //    setClasses(classes2);
  }, []);

  if (loading) return "Validando...";

  /*if (!data.obtenerUsuario) {
    console.log("dataenter");
    router.push("/login");
  }*/

  const vistaProtegida = () => {
    router.push("/login", undefined, { shallow: true });
    //localStorage.clear();
    localStorage.removeItem("token");
    router.reload();
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <>
      {(data.obtenerUsuario && (
        <Layout>
          <Grid container spacing={3} className={classes.container}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits />
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders />
              </Paper>
            </Grid>
          </Grid>
        </Layout>
      )) ||
        vistaProtegida()}
    </>
  );
};

export default Home;
