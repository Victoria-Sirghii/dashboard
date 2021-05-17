export type ButtonSize = "small" | "medium" | "large";
export type ButtonType = "button" | "submit";

export interface ButtonProps {
  type?: ButtonType;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = (props) => {
  return <button className="btn" {...props}></button>;
};
