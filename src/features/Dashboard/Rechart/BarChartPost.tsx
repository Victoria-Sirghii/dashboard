import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
  Legend,
} from "recharts";

interface Post {
  post: any;
}

export const BarChartPost: React.FC<Post> = ({ post }) => {
  return (
    <div className="box fit-content barChart">
      <h2 className="title-info mn-title">BarChart</h2>
      <BarChart width={600} height={250} data={post.data} barSize={30}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[1998, 2010]} />
        <Tooltip />
        <Legend />
        <Bar dataKey="year" fill="#109cf1" />
      </BarChart>
    </div>
  );
};
