import { Layout } from "antd";
import React from 'react';

const footerStyle = {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#292A33",
  };
  
export default function AppFooter() {
    
    return <Layout.Footer style={footerStyle}>Footer</Layout.Footer>;
}