export type InputType =
  | "text"
  | "number"
  | "email"
  | "password"
  | "date"
  | "radio";

export interface InputProps {
  type?: InputType;
  placeholder?: string;
  name?: string;
  id?: string;
  value?: string;
  onChange?: (e: any) => void;
  required?: boolean;
}

export const Input: React.FC<InputProps> = (props) => {
  return <input className="form__field" {...props} />;
};
