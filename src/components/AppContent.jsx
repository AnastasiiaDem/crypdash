import { Layout } from 'antd';

const contentStyle = {
  textAlign: 'center',
  minHeight: 120,
  maxWidth: '75%',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#161720',
};

export default function AppContent() {
  return <Layout.Content style={contentStyle}>Content</Layout.Content>;
}
