import { Layout } from "antd";
import React, { useContext } from "react";

import CryptoContext from "../context/crypto-context";
import Chart from "./Chart";

const contentStyle = {
  minHeight: 120,
  maxWidth: "75%",
  color: "#fff",
  backgroundColor: "#161720",
};

export default function AppContent() {
  const { myCrypto, allCrypto, totalWallet } = useContext(CryptoContext);

  return (
    <Layout.Content style={contentStyle}>
      <h1>Dashboard</h1>
      <Chart />
    </Layout.Content>
  );
}
