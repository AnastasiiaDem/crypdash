import { Layout, Table } from "antd";
import React, { useContext } from "react";

import CryptoContext from "../context/crypto-context";
import { precise } from "../utils";
import Chart from "./Chart";

const contentStyle = {
  minHeight: 120,
  maxWidth: "75%",
  color: "#fff",
  backgroundColor: "#161720",
};

export default function AppContent() {
  const { myCrypto, allCrypto, totalWallet } = useContext(CryptoContext);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Total Profit",
      dataIndex: "totalProfit",
      sorter: {
        compare: (a, b) => a.totalProfit - b.totalProfit,
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      sorter: {
        compare: (a, b) => a.amount - b.amount,
      },
    },
    {
      title: "Today's price, $",
      dataIndex: "price",
      sorter: {
        compare: (a, b) => a.price - b.price,
      },
    },
  ];

  return (
    <Layout.Content style={contentStyle}>
      <h1>Dashboard</h1>
      <Chart />
      <Table
        pagination={false}
        style={{ width: "calc(100% - 3rem)", borderRadius: "10px" }}
        columns={columns}
        dataSource={myCrypto.map((crypto, idx) => {
          return {
            key: idx,
            name: crypto.name,
            totalProfit: precise(crypto.totalProfit),
            amount: crypto.amount,
            price: precise(allCrypto.find((c) => c.id == crypto.id).price),
          };
        })}
      />
    </Layout.Content>
  );
}
