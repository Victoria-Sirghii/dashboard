import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
  Legend,
} from "recharts";
import { Card } from "@ebs-integrator/react-ebs-ui";

interface Post {
  post: any;
}

export const BarChartPost: React.FC<Post> = ({ post }) => {
  return (
    <Card className="fit-content bar-chart p-20">
      <h2 className="h2__title ft-weight-500">BarChart</h2>
      <BarChart width={600} height={250} data={post.data} barSize={30}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[1998, 2010]} />
        <Tooltip />
        <Legend />
        <Bar dataKey="year" fill="#109cf1" />
      </BarChart>
    </Card>
  );
};
