import {
  Button,
  DatePicker,
  Divider,
  Flex,
  Form,
  InputNumber,
  Result,
  Select,
  Space,
} from "antd";
import { useContext, useRef, useState } from "react";
import CryptoContext from "../context/crypto-context";

const validateMessages = {
  required: "${label} is required!",
  types: {
    number: "${label} in not valid number",
  },
};

export default function CryptoForm({ onClose }) {
  const [form] = Form.useForm();

  const { myCrypto, allCrypto, addMyCrypto } = useContext(CryptoContext);

  const [coin, setCoin] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const myCryptoRef = useRef();

  if (submitted) {
    return (
      <Result
        status="success"
        title="Crypto Added"
        subTitle={`Added ${myCryptoRef.current.amount} of ${coin.name} by price ${myCryptoRef.current.price}`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Close
          </Button>
        ]}
      />
    );
  }

  if (!coin) {
    return (
      <Select
        style={{
          width: "100%",
        }}
        onSelect={(v) => setCoin(allCrypto.find((c) => c.id === v))}
        placeholder="Select coin"
        options={allCrypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.label}
            />{" "}
            {option.data.label}
          </Space>
        )}
      />
    );
  }

  function onFinish(values) {
    const newCrypto = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date(),
    };
    myCryptoRef.current = newCrypto;
    setSubmitted(true);
    addMyCrypto(newCrypto);
  }

  function handleAmountChange(value) {
    const price = form.getFieldValue("price");
    form.setFieldsValue({
      total: +(value * price).toFixed(2),
    });
  }

  function handlePriceChange(value) {
    const amount = form.getFieldValue("amount");
    form.setFieldsValue({
      total: +(amount * value).toFixed(2),
    });
  }

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 10,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        price: +(coin.price < 1
          ? coin.price.toFixed(8)
          : coin.price.toFixed(2)),
      }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Flex align="center">
        <img
          src={coin.icon}
          alt={coin.name}
          style={{ width: 40, marginRight: 10 }}
        />
        <h1>
          <span>({coin.symbol})</span> {coin.name}
        </h1>
      </Flex>

      <Divider />

      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: "number",
            min: 0,
          },
        ]}
      >
        <InputNumber
          placeholder="Enter coin amount"
          onChange={handleAmountChange}
          step={1}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item label="Price" name="price">
        <InputNumber
          onChange={handlePriceChange}
          step={0.1}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item label="Date & Time" name="date">
        <DatePicker showTime />
      </Form.Item>

      <Form.Item label="Total" name="total">
        <InputNumber disabled style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Crypto
        </Button>
      </Form.Item>
    </Form>
  );
}
