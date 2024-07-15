import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CloseOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Card, Drawer, Layout, List, Modal, Tag } from "antd";
import React, { useContext, useState } from "react";
import CryptoContext from "../context/crypto-context";
import { formatMoney } from "../utils";
import CryptoForm from "./CryptoForm";

export default function AppSider() {
  const { allCrypto, myCrypto, totalWallet, deleteMyCrypto } =
    useContext(CryptoContext);

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);

  const handleDelete = () => {
    deleteMyCrypto(selectedCoin.id);
    setConfirmVisible(false);
  };

  return (
    <Layout.Sider width="25%" style={{ background: "#161720" }}>
      <div
        style={{
          padding: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ color: "#ffffff80" }}>Total Wallet:</h3>
        <h1>{formatMoney(totalWallet)}</h1>
      </div>

      {myCrypto.map((coin) => (
        <Card
          size="small"
          key={coin.id}
          style={{ marginBottom: "1rem" }}
          actions={[
            <EditOutlined
              key="edit"
              onClick={() => {
                setDrawerVisible(true);
                setSelectedCoin(coin);
              }}
            />,
            <CloseOutlined
              key="delete"
              onClick={() => {
                setConfirmVisible(true);
                setSelectedCoin(coin);
              }}
            />,
          ]}
        >
          <div
            style={{
              padding: "1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={coin.icon}
                height="20px"
                width="20px"
                style={{ marginRight: "0.5rem" }}
                alt={coin.name}
              />
              <h3>{coin.name}</h3>
            </div>
            <h3
              style={{
                color: coin.priceChange ? "#3f8600" : "#cf1322",
                fontWeight: 600,
              }}
            >
              {coin.priceChange ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              {formatMoney(coin.totalAmount)}
            </h3>
          </div>
          <List
            size="small"
            dataSource={[
              { title: "Amount", value: `${coin.amount} ${coin.symbol}` },
              {
                title: "Total Profit",
                value: formatMoney(coin.totalProfit),
                withTag: true,
              },
              { title: "Purchase Price", value: formatMoney(coin.price) },
              {
                title: "Today's Price",
                value: formatMoney(
                  allCrypto.find((c) => c.id === coin.id)?.price
                ),
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

      <Modal
        title="Do you want to delete this crypto?"
        open={confirmVisible}
        okText="Yes"
        onOk={handleDelete}
        onCancel={() => setConfirmVisible(false)}
      />

      <Drawer
        width={600}
        title="Edit Crypto"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        placement="left"
        destroyOnClose
      >
        <CryptoForm
          onClose={() => setDrawerVisible(false)}
          coinProp={selectedCoin}
        />
      </Drawer>
    </Layout.Sider>
  );
}
