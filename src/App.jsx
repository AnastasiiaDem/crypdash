import AppLayout from "./components/AppLayout";
import CryptoContextProvider from "./context/crypto-context";

export default function App() {
  return (
    <CryptoContextProvider>
      <AppLayout />
    </CryptoContextProvider>
  );
}