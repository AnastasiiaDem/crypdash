import { Layout } from "antd";
import React, { useContext } from "react";
import CryptoContext from "../context/crypto-context";

const footerStyle = {
  textAlign: "left",
  color: "rgb(255 255 255 / 30%)",
  backgroundColor: "#292A33",
  position: "relative",
  padding: "2rem 3rem",
};

export default function AppFooter() {
  const { myCrypto, allCrypto } = useContext(CryptoContext);

  return (
    <Layout.Footer style={footerStyle}>
      {/* <Space>
        <Tooltip title="GitHub">
          <a href="https://github.com/AnastasiiaDem" target="_blank">
            <img
              width="20"
              height="20"
              style={{opacity: 0.3}}
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
              style={{opacity: 0.3}}
              src="https://img.icons8.com/ios/50/FFFFFF/domain--v1.png"
              alt="domain--v1"
            />
          </a>
        </Tooltip>
      </Space> */}
      <div>
        <p>
          © 2024 CRYPDASH &mdash; Crypto Tracker. All rights reserved.
        </p>
        <p style={{fontSize: '12px'}}>
          developed by Anastasiia Dementyeva
        </p>
      </div>
    </Layout.Footer>
  );
}
