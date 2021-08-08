import { FC } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: FC<ButtonProps> = (props) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 h-9 px-4 font-bold text-white rounded"
      {...props}
    />
  );
};
