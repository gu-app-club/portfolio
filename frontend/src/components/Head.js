import Head from "next/head";

export default ({ title }) => (
  <Head>
    <title>{title}</title>
    <link rel="stylesheet" type="text/css" href="/static/css/global.css" />
    <link rel="stylesheet" type="text/css" href="/static/css/milligram.css" />
  </Head>
);
