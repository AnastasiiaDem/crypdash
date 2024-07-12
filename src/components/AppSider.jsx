import { useEffect, useState } from "react";

import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Layout, List, Spin, Statistic, Tag, Typography } from "antd";

import { fakeFetchAllCrypto, fetchMyCrypto } from "../api";
import { percentDifference } from "../utils";

const siderStyle = {
  textAlign: "center",
  backgroundColor: "#161720",
};

export default function AppSider() {
  const [loading, setLoading] = useState(false);
  const [allCrypto, setAllCrypto] = useState([]);
  const [myCrypto, setMyCrypto] = useState([]);

  useEffect(() => {
    async function preload() {
      setLoading(true);
      const { result } = await fakeFetchAllCrypto();
      const myCryptoData = await fetchMyCrypto();

      const mappedMyCrypto = myCryptoData.map((cryptoItem) => {
        const coin = result.find((c) => c.id == cryptoItem.id);
        
        return {
          id: coin.id,
          name: coin.name,
          grow: cryptoItem.price < coin.price,
          growPercent: percentDifference(cryptoItem.price, coin.price),
          totalAmount: cryptoItem.amount * coin.price,
          totalProfit:
            cryptoItem.amount * coin.price -
            cryptoItem.amount * cryptoItem.price,
          ...cryptoItem,
        };
      });

      setMyCrypto(mappedMyCrypto);
      setAllCrypto(result);
      setLoading(false);
    }

    preload();
  }, []);

  if (loading) {
    return <Spin fullscreen />
  }

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {myCrypto.map(coin => (
        <Card key={coin.id} style={{ marginBottom: "1rem" }}>
          <Statistic
            title={coin.name}
            value={coin.totalAmount}
            precision={2}
            valueStyle={{color: coin.grow ? '#3f8600' : '#cf1322'}}            
            prefix={coin.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          <List
            size="small"
            dataSource={[
              {
                title: 'Total Profit',
                value: coin.totalProfit,
                withTag: true,
              },
              { title: 'Amount', value: coin.amount, isPlain: true }
            ]}
            renderItem={(item) => (
              <List.Item>
                <span>{item.title}</span>
                <span>
                  {item.withTag && (
                    <Tag color={coin.grow ? 'green' : 'red'}>
                      {coin.growPercent}%
                    </Tag>
                  )}
                  {item.isPlain && item.value}
                  {!item.isPlain && (
                    <Typography.Text type={coin.grow ? 'success' : 'danger'}>
                      {item.value.toFixed(2)}$
                    </Typography.Text>
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
