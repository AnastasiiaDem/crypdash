import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CloseOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Card, Drawer, Flex, Layout, List, Modal, Tag } from "antd";
import React, { useContext, useState } from "react";
import CryptoContext from "../context/crypto-context";
import { formatMoney } from "../utils";
import CryptoForm from "./CryptoForm";

export default function AppSider() {
  const { allCrypto, myCrypto, totalWallet, deleteMyCrypto } =
    useContext(CryptoContext);

  const [showDrawer, setShowDrawer] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [myCoin, setMyCoin] = useState(null);

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

      {myCrypto.map((myCoin) => {
        return (
          <Card
            size="small"
            key={myCoin.id}
            style={{ marginBottom: "1rem" }}
            actions={[
              <EditOutlined
                key="edit"
                onClick={() => {
                  setShowDrawer(true);
                  setMyCoin(myCoin);
                }}
              />,
              <CloseOutlined
                key="delete"
                onClick={() => {
                  setShowConfirm(true);
                  setMyCoin(myCoin);
                }}
              />,
            ]}
          >
            <Flex
              style={{ padding: "1rem", paddingTop: 0 }}
              align="center"
              justify="space-between"
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={myCoin.icon}
                  height="20px"
                  width="20px"
                  style={{ marginRight: "0.5rem" }}
                />
                <h3>{myCoin.name}</h3>
              </div>
              <h3
                style={{
                  color: myCoin.growPercent == 0 ? "black" : (myCoin.priceChange ? "#3f8600" : "#cf1322"),
                  fontWeight: 600,
                }}
              >
                {myCoin.growPercent != 0 && (myCoin.priceChange ? (
                  <ArrowUpOutlined />
                ) : (
                  <ArrowDownOutlined />
                ))}
                {formatMoney(myCoin.totalAmount)}
              </h3>
            </Flex>
            <List
              size="small"
              dataSource={[
                {
                  title: "Amount",
                  value: `${myCoin.amount} ${myCoin.symbol}`,
                },
                {
                  title: "Total Profit",
                  value: formatMoney(myCoin.totalProfit),
                  withTag: true,
                },
                {
                  title: "Purchase Price",
                  value: formatMoney(myCoin.price),
                },
                {
                  title: "Today's Price",
                  value: formatMoney(
                    allCrypto.find((c) => c.id === myCoin.id)?.price
                  ),
                },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <span>{item.title}</span>
                  <span>
                    {item.withTag ? (
                      <div>
                        <Tag color={myCoin.priceChange ? "green" : "red"}>
                          {myCoin.growPercent}%
                        </Tag>
                        <span
                          style={{
                            color: myCoin.priceChange ? "green" : "red",
                          }}
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
        );
      })}

      <Modal
        title="Do you want to delete this crypto?"
        open={showConfirm}
        okText="Yes"
        onOk={() => {
          deleteMyCrypto(myCoin.id);
          setShowConfirm(false);
        }}
        onCancel={() => setShowConfirm(false)}
        onClose={() => setShowConfirm(false)}
      />

      <Drawer
        width={600}
        title="Edit Crypto"
        onClose={() => setShowDrawer(false)}
        open={showDrawer}
        placement="left"
        destroyOnClose
      >
        <CryptoForm onClose={() => setShowDrawer(false)} coinProp={myCoin} />
      </Drawer>
    </Layout.Sider>
  );
}
