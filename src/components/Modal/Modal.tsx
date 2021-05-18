import cn from "classnames";
export interface ModalProps {
  className?: string;
  visible: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  className,
  visible,
  children,
}) => {
  return (
    <div className={cn("modal-overlay", { "show-modal": visible }, className)}>
      <div className="modal-container">{children}</div>
    </div>
  );
};
