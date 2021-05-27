import { axios } from "api";
import { useQuery } from "react-query";
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
import { User } from "types/interfaces";

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
