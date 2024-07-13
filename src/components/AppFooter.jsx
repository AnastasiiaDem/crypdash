import { Layout } from "antd";
import React, { useContext } from "react";
import CryptoContext from "../context/crypto-context";


const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#292A33",
};

export default function AppFooter() {
  const { myCrypto, allCrypto } = useContext(CryptoContext);

  return <Layout.Footer style={footerStyle}>Footer</Layout.Footer>;
}
