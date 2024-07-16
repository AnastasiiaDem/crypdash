import { Layout, Space, Tooltip } from "antd";
import React, { useContext } from "react";
import CryptoContext from "../context/crypto-context";

const footerStyle = {
  textAlign: "left",
  color: "#fff",
  backgroundColor: "#292A33",
  position: "relative",
};

export default function AppFooter() {
  const { myCrypto, allCrypto } = useContext(CryptoContext);

  return (
    <Layout.Footer style={footerStyle}>
      <Space>
        <Tooltip title="GitHub">
          <a href="https://github.com/AnastasiiaDem" target="_blank">
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/ios/50/FFFFFF/github--v1.png"
              alt="github--v1"
            />
          </a>
        </Tooltip>
        <Tooltip title="Portfolio Website">
          <a href="https://anastasiiadementieva.vercel.app/" target="_blank">
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/ios/50/FFFFFF/domain--v1.png"
              alt="domain--v1"
            />
          </a>
        </Tooltip>
      </Space>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <h4 style={{ fontWeight: "400" }}>
          © 2024 Crypto Tracker. All rights reserved.
        </h4>
        <h5 style={{ fontWeight: "400" }}>
          developed by Anastasiia Dementyeva
        </h5>
      </div>
    </Layout.Footer>
  );
}
