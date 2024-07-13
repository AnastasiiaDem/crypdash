import React, { useContext } from "react";

import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Layout, List, Tag } from "antd";
import CryptoContext from "../context/crypto-context";

const siderStyle = {
  textAlign: "center",
  backgroundColor: "#161720",
};

export default function AppSider() {
  const { myCrypto } = useContext(CryptoContext);

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {myCrypto.map((coin) => (
        <Card key={coin.id} style={{ marginBottom: "1rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 1rem 2rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={coin.icon}
                height="30px"
                width="30px"
                style={{ marginRight: "1rem" }}
              />
              <h2>{coin.name}</h2>
            </div>
            <div>
              <h2
                style={{
                  color: coin.priceChange ? "#3f8600" : "#cf1322",
                  fontWeight: 600,
                }}
              >
                {coin.priceChange ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                {coin.totalAmount.toFixed(2)} $
              </h2>
            </div>
          </div>
          <List
            size="small"
            dataSource={[
              { title: "Amount", value: `${coin.amount} ${coin.symbol}` },
              { title: "Today's Price", value: coin.price + " $" },
              {
                title: "Total Profit",
                value: coin.totalProfit.toFixed(2) + " $",
                withTag: true,
              },
            ]}
            renderItem={(item) => (
              <List.Item>
                <span>{item.title}</span>
                <span>
                  {item.withTag ? (
                    <div>
                      <Tag color={coin.priceChange ? "green" : "red"}>
                        {coin.growPercent}%
                      </Tag>
                      <span
                        style={{ color: coin.priceChange ? "green" : "red" }}
                      >
                        {item.value}
                      </span>
                    </div>
                  ) : (
                    item.value
                  )}
                </span>
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Layout.Sider>
  );
}
