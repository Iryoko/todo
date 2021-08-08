import Link from "next/link";
import { Button } from "../Button/Button";

export const Navbar = () => {
  return (
    <div className="h-12 flex items-center px-8 border-b-2 border-gray-500 justify-between">
      <Link href="/" passHref>
        <a className="cursor-pointer">
          <span className="font-bold text-2xl">Todo</span>
        </a>
      </Link>
      <div>
        <Button>Sign Up</Button>
        <Button>Log In</Button>
      </div>
    </div>
  );
};
