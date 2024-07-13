import { Layout } from "antd";
import React from "react";

import { useCrypto } from "../context/crypto-context";

const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#292A33",
};

export default function AppHeader() {
  const { myCrypto, allCrypto } = useCrypto();

  return <Layout.Header style={headerStyle}>Header</Layout.Header>;
}
