import { Loader } from "@ebs-integrator/react-ebs-ui";

interface LoadingProps {
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({ className }) => {
  return <Loader.Spinner className={className} />;
};
