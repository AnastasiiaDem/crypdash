import React, { useContext } from "react";

import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CloseOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Card, Flex, Layout, List, Tag } from "antd";
import CryptoContext from "../context/crypto-context";

import { formatMoney } from "../utils";

export default function AppSider() {
  const { myCrypto, totalWallet } = useContext(CryptoContext);

  return (
    <Layout.Sider
      width="25%"
      className="sider"
      style={{ background: "#161720" }}
    >
      <Flex align="center" justify="space-between" style={{ padding: "1rem" }}>
        <h3 style={{ color: "#ffffff80" }}>Total Wallet:</h3>
        <h1>{formatMoney(totalWallet)}</h1>
      </Flex>

      {myCrypto.map((coin) => (
        <Card
          key={coin.id}
          style={{ marginBottom: "1rem" }}
          actions={[
            <EditOutlined key="edit" />,
            <CloseOutlined key="delete" />,
          ]}
        >
          <div style={{ padding: "0 1rem" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={coin.icon}
                height="30px"
                width="30px"
                style={{ marginRight: "1rem" }}
              />
              <h2>{coin.name}</h2>
            </div>
            <div style={{ padding: "0.5rem 0 1rem" }}>
              <h2
                style={{
                  color: coin.priceChange ? "#3f8600" : "#cf1322",
                  fontWeight: 600,
                }}
              >
                {coin.priceChange ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                {formatMoney(coin.totalAmount)}
              </h2>
            </div>
          </div>
          <List
            size="small"
            dataSource={[
              { title: "Amount", value: `${coin.amount} ${coin.symbol}` },
              { title: "Today's Price", value: formatMoney(coin.price) },
              {
                title: "Total Profit",
                value: formatMoney(coin.totalProfit),
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

      {/* <Drawer
        width={600}
        title="Add Crypto"
        onClose={() => setDrawer(false)}
        open={drawer}
        destroyOnClose
      >
        <CryptoForm onClose={() => setDrawer(false)} />
      </Drawer> */}
    </Layout.Sider>
  );
}
