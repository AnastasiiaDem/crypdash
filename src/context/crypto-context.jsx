import { createContext, useCallback, useEffect, useState } from "react";
import { fetchAllCrypto, fetchMyCrypto } from "../api";
import { percentDifference, precise } from "../utils";

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

  const mapMyCrypto = useCallback((myCryptoData, allCryptoData) => {
    let total = 0;

    const mappedCrypto = myCryptoData.map((cryptoItem) => {
      const coin = allCryptoData.find((c) => c.id === cryptoItem.id);

      const totalAmount = precise(cryptoItem.amount * coin.price);
      total += totalAmount;

      return {
        ...cryptoItem,
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        icon: coin.icon,
        price: cryptoItem.price,
        priceChange: coin.price > cryptoItem.price,
        growPercent: percentDifference(cryptoItem.price, coin.price),
        totalAmount,
        totalProfit: precise(totalAmount - cryptoItem.amount * cryptoItem.price),
      };
    });

    setTotalWallet(total);
    return mappedCrypto;
  }, []);

  useEffect(() => {
    async function preload() {
      setLoading(true);
      try {
        const { result } = await fetchAllCrypto();
        const myCryptoData = await fetchMyCrypto();
        const mappedCrypto = mapMyCrypto(myCryptoData, result);

        setMyCrypto(mappedCrypto);
        setAllCrypto(result);
      } finally {
        setLoading(false);
      }
    }

    preload();
  }, []);

  function addMyCrypto(newCrypto) {
    setMyCrypto((prev) => {
      const existingCrypto = prev.find((crypto) => crypto.id === newCrypto.id);
      if (existingCrypto) {
        const updatedCrypto = prev.map((crypto) => 
          crypto.id === newCrypto.id
            ? { 
                ...crypto, 
                amount: crypto.amount + newCrypto.amount, 
                price: newCrypto.price 
              }
            : crypto
        );
        return mapMyCrypto(updatedCrypto, allCrypto);
      }
      return mapMyCrypto([...prev, newCrypto], allCrypto);
    });
  }

  const updateMyCrypto = (updatedCrypto) => {
    setMyCrypto((prev) => {
      const updatedList = prev.map((cryptoItem) =>
        cryptoItem.id === updatedCrypto.id
          ? { ...cryptoItem, ...updatedCrypto }
          : cryptoItem
      );
      return mapMyCrypto(updatedList, allCrypto);
    });
  };

  const deleteMyCrypto = (cryptoId) => {
    setMyCrypto((prev) => {
      const filteredList = prev.filter((cryptoItem) => cryptoItem.id !== cryptoId);
      return mapMyCrypto(filteredList, allCrypto);
    });
  };

  return (
    <CryptoContext.Provider
      value={{
        loading,
        allCrypto,
        myCrypto,
        totalWallet,
        addMyCrypto,
        updateMyCrypto,
        deleteMyCrypto
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContext;
