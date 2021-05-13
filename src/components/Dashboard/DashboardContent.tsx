import { Sidebar, Header, Footer, Content } from "components";

export const DashboardContent: React.FC = () => {
  return (
    <main className="d-grid">
      <Sidebar />
      <Header />
      <Content />
      <Footer />
    </main>
  );
};
