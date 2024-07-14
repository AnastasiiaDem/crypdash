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
  Tag,
  Tooltip,
} from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import CryptoContext from "../context/crypto-context";


const validateMessages = {
  required: "${label} is required!",
  types: {
    number: "${label} is not a valid number",
  },
};

export default function CryptoForm({ onClose, coinProp = null }) {
  const [form] = Form.useForm();

  const { myCrypto, allCrypto, addMyCrypto, updateMyCrypto } =
    useContext(CryptoContext);

  const [coin, setCoin] = useState(coinProp);
  const [submitted, setSubmitted] = useState(false);
  const myCryptoRef = useRef();

  useEffect(() => {
    if (coinProp) {
      form.setFieldsValue({
        amount: coinProp.amount,
        price: formatValue(coinProp.price),
        date: !coinProp.date ? null : coinProp.date?.$d,
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
          <Button type="primary" key="console" onClick={onClose}>
            Close
          </Button>,
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
    if (!coinProp) {
      addMyCrypto(newCrypto);
    } else {
      updateMyCrypto(newCrypto);
    }
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

  function formatValue(price) {
    return price < 1 ? price.toFixed(8) : price.toFixed(2);
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
        price: coinProp ? formatValue(coinProp.price) : formatValue(coin.price),
        amount: coinProp ? coinProp.amount : coin.amount,
        date: coinProp ? coinProp.date?.$d : coin.data?.$d,
        total: coinProp ? coinProp.amount * coinProp.price : coin.total,
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

      <Form.Item label="Price">
        <Space>
          <Form.Item name="price" noStyle>
            <InputNumber
              onChange={handlePriceChange}
              step={0.1}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Tooltip title="Today's Price">
            <Tag color="yellow">
              {formatValue(allCrypto.find((c) => c.id === coin.id).price)}
            </Tag>
          </Tooltip>
        </Space>
      </Form.Item>

      <Form.Item label="Date & Time" name="date">
        <DatePicker showTime style={{ width: "100%" }} />
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
