import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
} from "recharts";

interface Post {
  post: any;
}

export const LineChartPost: React.FC<Post> = ({ post }) => {
  return (
    <div className="box fit-content lineChart">
      <h2 className="title-info mn-title">LineChart</h2>
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
    </div>
  );
};