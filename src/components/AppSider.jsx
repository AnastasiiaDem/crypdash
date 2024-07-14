import React, { useContext, useState } from "react";

import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CloseOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Card, Drawer, Flex, Layout, List, Modal, Tag } from "antd";
import CryptoContext from "../context/crypto-context";

import { formatMoney } from "../utils";
import CryptoForm from "./CryptoForm";

export default function AppSider() {
  const { allCrypto, myCrypto, totalWallet, deleteMyCrypto } = useContext(CryptoContext);

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

      {myCrypto.map((myCoin) => (
        <Card
          key={myCoin.id}
          style={{ marginBottom: "1rem" }}
          actions={[
            <EditOutlined key="edit" onClick={() => {
              setShowDrawer(true);
              setMyCoin(myCoin);
            }} />,
            <CloseOutlined key="delete" onClick={() => {
              setShowConfirm(true);
              setMyCoin(myCoin);
            }} />,
          ]}
        >
          <div style={{ padding: "0 1rem" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={myCoin.icon}
                height="30px"
                width="30px"
                style={{ marginRight: "1rem" }}
              />
              <h2>{myCoin.name}</h2>
            </div>
            <div style={{ padding: "0.5rem 0 1rem" }}>
              <h2
                style={{
                  color: myCoin.priceChange ? "#3f8600" : "#cf1322",
                  fontWeight: 600,
                }}
              >
                {myCoin.priceChange ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                {formatMoney(myCoin.totalAmount)}
              </h2>
            </div>
          </div>
          <List
            size="small"
            dataSource={[
              { title: "Amount", value: `${myCoin.amount} ${myCoin.symbol}` },
              { title: "Purchase Price", value: formatMoney(myCoin.price) },
              { title: "Today's Price", value: formatMoney(allCrypto.find(c => c.id === myCoin.id)?.price) },
              {
                title: "Total Profit",
                value: formatMoney(myCoin.totalProfit),
                withTag: true,
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
                        style={{ color: myCoin.priceChange ? "green" : "red" }}
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
        open={showConfirm}
        okText="Yes"
        onOk={() => {
          deleteMyCrypto(myCoin.id);
          setShowConfirm(false);
        }}
        onCancel={() => setShowConfirm(false)}
        onClose={() => setShowConfirm(false)}/>

      <Drawer
        width={600}
        title="Edit Crypto"
        onClose={() => setShowDrawer(false)}
        open={showDrawer}
        destroyOnClose>
        <CryptoForm onClose={() => setShowDrawer(false)} coinProp={myCoin}/>
      </Drawer>
    </Layout.Sider>
  );
}
