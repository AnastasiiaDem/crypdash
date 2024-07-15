// src/components/CryptoForm.js
import {
  Button,
  Divider,
  Flex,
  Form,
  InputNumber,
  Result,
  Select,
  Space,
  Tag,
  Tooltip
} from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import CryptoContext from "../context/crypto-context";
import { precise } from "../utils";

const validateMessages = {
  required: "${label} is required!",
  types: {
    number: "${label} is not a valid number",
  },
};

export default function CryptoForm({ onClose, coinProp = null }) {
  const [form] = Form.useForm();
  const { allCrypto, addMyCrypto, updateMyCrypto } = useContext(CryptoContext);
  const [coin, setCoin] = useState(coinProp);
  const [submitted, setSubmitted] = useState(false);
  const myCryptoRef = useRef();

  useEffect(() => {
    if (coinProp) {
      form.setFieldsValue({
        amount: coinProp.amount,
        price: precise(coinProp.price),
        total: coinProp.amount * coinProp.price,
      });
    }
  }, [coinProp, form]);

  if (submitted) {
    return (
      <Result
        status="success"
        title="Crypto Added"
        subTitle={`Added ${myCryptoRef.current.amount} of ${coin.name} by price ${myCryptoRef.current.price}`}
        extra={[
          <Button type="primary" key="close" onClick={onClose}>
            Close
          </Button>
        ]}
      />
    );
  }

  if (!coin) {
    return (
      <Select
        style={{ width: "100%" }}
        onSelect={(v) => setCoin(allCrypto.find((c) => c.id === v))}
        placeholder="Select coin"
        defaultOpen
        options={allCrypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Flex align="center" gap="10px">
            <img
              style={{ width: 20, height: 20 }}
              src={option.data.icon}
              alt={option.data.label}
            />
            <span>{option.data.label}</span>
          </Flex>
        )}
      />
    );
  }

  const handleSubmit = (values) => {
    const newCrypto = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
    };
    myCryptoRef.current = newCrypto;
    setSubmitted(true);
    if (!coinProp) {
      addMyCrypto(newCrypto);
    } else {
      updateMyCrypto(newCrypto);
    }
  };

  const handlePriceChange = (value) => {
    const amount = form.getFieldValue("amount");
    form.setFieldsValue({ total: !!amount && +(amount * value).toFixed(2) });
  };

  const handleAmountChange = (value) => {
    const price = form.getFieldValue("price");
    form.setFieldsValue({ total: +(value * price).toFixed(2) });
  };

  const handleTotalChange = (value) => {
    const price = form.getFieldValue("price");
    form.setFieldsValue({ amount: +(value / price).toFixed(6) });
  };

  return (
    <Form
      form={form}
      name="crypto-form"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 10 }}
      initialValues={{
        price: precise(coin.price),
        amount: coin.amount,
        total: coin.total,
      }}
      onFinish={handleSubmit}
      validateMessages={validateMessages}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={coin.icon}
          alt={coin.name}
          style={{ width: 40, marginRight: 10 }}
        />
        <h1>
          <span>({coin.symbol})</span> {coin.name}
        </h1>
      </div>

      <Divider />

      <Form.Item
        label="Amount"
        name="amount"
        rules={[{ required: true, type: "number", min: 0 }]}
      >
        <InputNumber
          placeholder="Enter coin amount"
          onChange={handleAmountChange}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item label="Price">
        <Space>
          <Form.Item
            name="price"
            noStyle
            rules={[{ required: true, type: "number", min: 0 }]}
          >
            <InputNumber
              onChange={handlePriceChange}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Tooltip title="Today's Price">
            <Tag color="yellow">
              {precise(allCrypto.find((c) => c.id === coin.id).price)}
            </Tag>
          </Tooltip>
        </Space>
      </Form.Item>

      <Form.Item
        label="Total"
        name="total"
        rules={[{ required: true, type: "number", min: 0 }]}
      >
        <InputNumber style={{ width: "100%" }} onChange={handleTotalChange} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4, span: 10 }}>
        <Button type="primary" htmlType="submit">
          {coinProp ? "Update Crypto" : "Add Crypto"}
        </Button>
      </Form.Item>
    </Form>
  );
}
