import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from "recharts";
import { Card } from "@ebs-integrator/react-ebs-ui";

interface Post {
  post: any;
}

export const AreaChartPost: React.FC<Post> = ({ post }) => {
  return (
    <Card className="fit-content area-chart p-20">
      <h2 className="h2__title ft-weight-500">AreaChart</h2>
      <AreaChart
        width={730}
        height={250}
        data={post.data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2ed47a" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#2ed47a" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis type="number" domain={[1998, 2010]} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="year"
          stroke="#2ed47a"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </Card>
  );
};
