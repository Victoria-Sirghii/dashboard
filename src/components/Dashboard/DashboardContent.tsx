import { Sidebar, Header, Footer, Content } from "components";
export const DashboardContent: React.FC = () => {
  return (
    <main className="d-grid layout">
      <Sidebar />
      <Header />
      <Footer />
      <Content />
    </main>
  );
};
