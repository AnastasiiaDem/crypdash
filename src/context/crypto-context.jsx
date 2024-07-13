import { createContext, useEffect, useState } from "react";
import { fakeFetchAllCrypto, fetchMyCrypto } from "../api";
import { percentDifference } from "../utils";

const CryptoContext = createContext({
  myCrypto: [],
  allCrypto: [],
  loading: false,
  totalWallet: 0,
});

export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [allCrypto, setAllCrypto] = useState([]);
  const [myCrypto, setMyCrypto] = useState([]);
  const [totalWallet, setTotalWallet] = useState(0);

  function mapMyCrypto(myCryptoData, result) {
    let total = 0;

    return myCryptoData.map((cryptoItem) => {
      const coin = result.find((c) => c.id === cryptoItem.id);

      total += cryptoItem.amount * coin.price;

      setTotalWallet(total);

      return {
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        icon: coin.icon,
        price: coin.price,
        priceChange: coin.price > cryptoItem.price,
        growPercent: percentDifference(cryptoItem.price, coin.price),
        totalAmount: cryptoItem.amount * coin.price,
        totalProfit:
          cryptoItem.amount * coin.price - cryptoItem.amount * cryptoItem.price,
        ...cryptoItem,
      };
    });
  }

  useEffect(() => {
    async function preload() {
      setLoading(true);
      const { result } = await fakeFetchAllCrypto();
      const myCryptoData = await fetchMyCrypto();
      const mappedCrypto = mapMyCrypto(myCryptoData, result);

      setMyCrypto(mappedCrypto);
      setAllCrypto(result);
      setLoading(false);
    }

    preload();
  }, []);

  function addMyCrypto(newMyCrypto) {
    setMyCrypto((prev) => mapMyCrypto([...prev, newMyCrypto], allCrypto));
  }

  return (
    <CryptoContext.Provider
      value={{ loading, allCrypto, myCrypto, totalWallet, addMyCrypto }}
    >
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContext;
