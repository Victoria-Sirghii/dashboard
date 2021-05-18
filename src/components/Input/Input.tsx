import cn from "classnames";

type InputType = "text" | "number" | "email" | "password" | "date" | "radio";
type InputSize = "large" | "medium" | "small";

export interface InputProps {
  type?: InputType;
  placeholder?: string;
  name?: string;
  id?: string;
  value?: string | number;
  onChange?: (e: any) => void;
  required?: boolean;
  size?: InputSize;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  type,
  size = "medium",
  className,
  ...props
}) => {
  return (
    <input
      type={type}
      className={cn(
        "form__field",
        { [`form__field--${size}`]: size },
        className
      )}
      {...props}
    />
  );
};
