export interface LabelProps {
  htmlFor?: string;
}

export const Label: React.FC<LabelProps> = (props) => {
  return <label className="label" {...props}></label>;
};
