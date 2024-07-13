import { Divider, Flex, Tag } from "antd";

import { formatNumberShort } from '../utils';

export default function CoinInfoModal({ coin }) {
  return (
    <div className="coin-info">
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
      <p style={{paddingBottom: '1rem'}}>
        <span>1 hour: </span>
        <Tag color={coin.priceChange1h > 0 ? "green" : "red"}>
          {coin.priceChange1h}%
        </Tag>
        <span>1 day: </span>
        <Tag color={coin.priceChange1d > 0 ? "green" : "red"}>
          {coin.priceChange1d}%
        </Tag>
        <span>1 week: </span>
        <Tag color={coin.priceChange1w > 0 ? "green" : "red"}>
          {coin.priceChange1w}%
        </Tag>
      </p>
      <p>
        <span>Price: </span>
        ${coin.price < 1 ? coin.price.toFixed(8) : coin.price.toFixed(2)}
      </p>
      <p>
        <span>Price BTC: </span>
        {coin.priceBtc}
      </p>
      <p>
        <span>Market Cap: </span>
        {formatNumberShort(coin.marketCap)}
      </p>
    </div>
  );
}
