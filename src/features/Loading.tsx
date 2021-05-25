import { Loader } from "ebs-design";

interface LoadingProps {
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({ className }) => {
  return <Loader.Spinner className={className} />;
};
