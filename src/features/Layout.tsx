import {
  Sidebar,
  Header,
  Footer,
  Content,
  DashboardRoutes,
  Sider,
  FooterContent,
  HeaderContent,
} from "features";

export const DashboardContent: React.FC = () => {
  return (
    <main className="d-grid">
      <Sider>
        <Sidebar />
      </Sider>
      <Header>
        <HeaderContent />
      </Header>
      <Content>
        <DashboardRoutes />
      </Content>
      <Footer>
        <FooterContent />
      </Footer>
    </main>
  );
};
