import React from "react";
import ReactDOM from "react-dom";
import { usePortal } from "../hooks";

export interface Search {
  className?: string;
}

export const SearchInput: React.FC<Search> = ({ children, className }) => {
  const target = usePortal("#portal-header", className);
  return ReactDOM.createPortal(children, target);
};
