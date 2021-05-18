import cn from "classnames";

type BoxShadow = "0" | "1" | "2" | "3";

export interface CartProps {
  className?: string;
  boxShadow?: BoxShadow;
}

export const Card: React.FC<CartProps> = ({
  boxShadow = "0",
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "card",
        { [`card--boxShadow-${boxShadow}`]: boxShadow },
        className
      )}
    >
      {children}
    </div>
  );
};
