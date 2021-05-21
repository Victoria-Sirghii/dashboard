import { useFetchQuery } from "hooks";
import { LineChartPost, AreaChartPost, BarChartPost, Loading } from "features";
import { Card, Container, Row, Col } from "@ebs-integrator/react-ebs-ui";

export const Dashboard: React.FC = () => {
  const { data: users } = useFetchQuery("users");
  const { data: post, isLoading } = useFetchQuery("post");

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Container className="dashboard-container">
          <Row>
            <Col>
              <Card className="d-flex mtb-20 fit-content">
                <h2 className="h2__title ft-weight-500 d-flex flex-column">
                  Total users:{" "}
                  <span className="total-users">{users?.total}</span>
                </h2>
                <h2 className="h2__title ft-weight-500 d-flex flex-column">
                  Total posts:{" "}
                  <span className="total-posts">{post?.total}</span>
                </h2>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <AreaChartPost post={post} />
            </Col>
          </Row>
          <Row>
            <Col size={6}>
              <LineChartPost post={post} />
            </Col>
            <Col size={6} gx={5}>
              <BarChartPost post={post} />
            </Col>
          </Row>
        </Container>
      )}
    </>

    // <div className="dashboard-container grid-charts">
    //   <Card className="d-flex total-chart fit-content">
    //     <h2 className="h2__title ft-weight-500 d-flex flex-column">
    //       Total users: <span className="total-users">{users?.total}</span>
    //     </h2>
    //     <h2 className="h2__title ft-weight-500 d-flex flex-column">
    //       Total posts: <span className="total-posts">{post?.total}</span>
    //     </h2>
    //   </Card>
    //   {isLoading ? (
    //     <Loading />
    //   ) : (
    //     <>
    //       <AreaChartPost post={post} />
    //       <LineChartPost post={post} />
    //       <BarChartPost post={post} />
    //     </>
    //   )}
    // </div>
  );
};
