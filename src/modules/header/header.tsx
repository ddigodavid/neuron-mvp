import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import About from "../about";
import { useState } from "react";
import { useColorScheme } from "@mui/material/styles";
import classNames from "classnames";
import ThemeSwitcher from "../theme-switcher";

export default function Header({ children }: { children?: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const { mode } = useColorScheme();

  return (
    <>
      {children}
      <div
        className={classNames("w-full h-10 flex justify-end px-2", {
          "bg-slate-800": mode == "dark",
          "bg-sky-600": mode == "light",
        })}
      >
        <ThemeSwitcher />
        <div
          className="my-auto cursor-pointer text-slate-400 hover:text-white transition-all ease-in-out"
          onClick={() => setIsOpen(true)}
        >
          <HelpOutlineOutlinedIcon />
        </div>
      </div>
      <About isOpen={isOpen} handleClose={() => setIsOpen(false)} />
    </>
  );
}
