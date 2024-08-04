import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IProps {
  path: string;
  isAuth: boolean;
  children: ReactNode;
}
export default function IsProtected({ path, isAuth, children }: IProps) {
  const id = localStorage.getItem("id");

  if (isAuth) {
    return id ? <>{children}</> : <Navigate to={path} />;
  } else {
    return !id ? <>{children}</> : <Navigate to={path} />;
  }
}
