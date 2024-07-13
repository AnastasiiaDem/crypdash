import { Layout } from "antd";
import React from "react";

import { useCrypto } from "../context/crypto-context";

const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#292A33",
};

export default function AppFooter() {
  const { myCrypto, allCrypto } = useCrypto();

  return <Layout.Footer style={footerStyle}>Footer</Layout.Footer>;
}
