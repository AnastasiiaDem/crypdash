import { Layout } from "antd";
import "./App.css";
import AppContent from "./components/AppContent";
import AppFooter from "./components/AppFooter";
import AppHeader from "./components/AppHeader";
import AppSider from "./components/AppSider";

const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  width: "100vw",
  minHeight: "100vh",
  background: "#161720"
};

function App() {
  return (
    <Layout style={layoutStyle}>
      <AppHeader />
      <Layout style={{padding: '2rem', background: "#161720"}}>
        <AppContent />
        <AppSider />
      </Layout>
      <AppFooter />
    </Layout>
  );
}

export default App;
