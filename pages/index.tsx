import Head from "next/head";
import React from "react";
import CustomButton from "../components/Button/Button";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Hello</h1>
      <Head>
        <title>Gain Protocol SwapX</title>
      </Head>
      <CustomButton block>Unlock Wallet</CustomButton>
    </div>
  );
}
