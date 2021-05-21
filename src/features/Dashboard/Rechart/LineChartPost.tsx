import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
} from "recharts";
import { Card } from "@ebs-integrator/react-ebs-ui";

interface Post {
  post: any;
}

export const LineChartPost: React.FC<Post> = ({ post }) => {
  return (
    <Card className="fit-content mb-40 p-20">
      <h2 className="h2__title ft-weight-500">LineChart</h2>
      <LineChart
        width={600}
        height={300}
        data={post.data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="year" stroke="#2ed47a" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis type="number" domain={[1998, 2010]} />
        <Tooltip />
      </LineChart>
    </Card>
  );
};
