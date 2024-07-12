import { Layout } from "antd";
import React from 'react';

const headerStyle = {
    textAlign: "center",
    color: "#fff",
    height: 64,
    paddingInline: 48,
    lineHeight: "64px",
    backgroundColor: "#292A33",
  };

export default function AppHeader() {
    
    return <Layout.Header style={headerStyle}>Header</Layout.Header>;
}