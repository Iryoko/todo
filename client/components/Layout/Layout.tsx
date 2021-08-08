import { FC } from "react";
import { Navbar } from "../Navbar";

export const Layout: FC = ({ children }) => {
  return (
    <div className="sticky top-0">
      <Navbar />
      {children}
    </div>
  );
};
