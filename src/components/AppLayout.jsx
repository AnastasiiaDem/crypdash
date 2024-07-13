import React, { useContext } from "react";

import { Layout, Spin } from "antd";
import CryptoContext from "../context/crypto-context";
import AppContent from "./AppContent";
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";
import AppSider from "./AppSider";

const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  width: "100vw",
  minHeight: "100vh",
  background: "#161720",
};

export default function AppLayout() {
  const { loading } = useContext(CryptoContext);

  if (loading) {
    return <Spin fullscreen />;
  }

  return (
    <Layout style={layoutStyle}>
      <AppHeader />
      <Layout style={{ padding: "2rem", background: "#161720" }}>
        <AppContent />
        <AppSider />
      </Layout>
      <AppFooter />
    </Layout>
  );
}
