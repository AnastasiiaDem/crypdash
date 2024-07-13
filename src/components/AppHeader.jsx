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
  const { myCrypto, allCrypto } = useContext(CryptoContext);

  const [select, setSelect] = useState(false)
  const [coin, setCoin] = useState(null)
  const [modal, setModal] = useState(false)
  const [drawer, setDrawer] = useState(false)

  function handleSelect(value) {
    setCoin(allCrypto.find((c) => c.id === value))
    setModal(true)
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
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        options={allCrypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <div style={labelStyle}>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.label}
            />{' '}
            {option.data.label}
          </div>
        )}
      />
      <Button type="primary" onClick={() => setDrawer(true)}>Add Crypto</Button>

      <Modal open={modal} onCancel={() => setModal(false)} footer={false}>
        <CoinInfoModal coin={coin} />
      </Modal>

      <Drawer
        width={600}
        title="Add Crypto"
        onClose={() => setDrawer(false)}
        open={drawer}
        destroyOnClose
      >
        <CryptoForm onClose={() => setDrawer(false)} />
      </Drawer>
    </Layout.Header>
  );
}
