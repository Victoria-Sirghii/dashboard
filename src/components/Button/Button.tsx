import cn from "classnames";

type ButtonSize = "small" | "medium" | "large";
type ButtonType = "primary" | "outline";

export interface ButtonProps {
  className?: string;
  style?: React.CSSProperties;
  size?: ButtonSize;
  type?: ButtonType;
  onClick?: () => void;
  htmlType?: "submit" | "button";
}

export const Button: React.FC<ButtonProps> = ({
  size,
  type,
  onClick,
  className,
  style,
  htmlType = "button",
  children,
}) => {
  return (
    <button
      className={cn(
        "btn",
        { [`btn--${size}`]: size, [`btn--${type}`]: type },
        className
      )}
      onClick={onClick}
      style={style}
      type={htmlType}
    >
      {children}
    </button>
  );
};
