import { Button, Drawer, Layout, Modal, Select } from "antd";
import React, { useContext, useState } from "react";
import CryptoContext from "../context/crypto-context";
import CoinInfoModal from "./CoinInfoModal";
import CryptoForm from "./CryptoForm";

const headerStyle = {
  display: 'flex',
  alignItems: "center",
  justifyContent: "space-between",
  color: "#fff",
  height: 'auto',
  backgroundColor: "#292A33",
  padding: "2rem 3rem"
};

const labelStyle = {
  display: 'flex',
  alignItems: "center",
  gap: '1rem'
};

export default function AppHeader() {
  const { allCrypto } = useContext(CryptoContext);

  const [coin, setCoin] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  function handleSelect(value) {
    const selectedCoin = allCrypto.find((c) => c.id === value);
    setCoin(selectedCoin);
    setModalVisible(true);
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        showSearch
        style={{ width: 200 }}
        value="Explore"
        optionFilterProp="label"
        onSelect={handleSelect}
        filterSort={(optionA, optionB) =>
          (optionA.label ?? "").toLowerCase().localeCompare((optionB.label ?? "").toLowerCase())
        }
        options={allCrypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <div style={labelStyle}>
            <img style={{ width: 20 }} src={option.icon} alt={option.label} />
            {option.label}
          </div>
        )}
      />
      <Button type="primary" onClick={() => setDrawerVisible(true)}>Add Crypto</Button>

      <Modal open={modalVisible} onCancel={() => setModalVisible(false)} footer={null}>
        <CoinInfoModal coin={coin} />
      </Modal>

      <Drawer
        width={600}
        title="Add Crypto"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        placement="left"
        destroyOnClose
      >
        <CryptoForm onClose={() => setDrawerVisible(false)} />
      </Drawer>
    </Layout.Header>
  );
}