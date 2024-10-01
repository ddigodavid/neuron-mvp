import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import reactLogo from "@/assets/react.svg";
import viteLogo from "/vite.svg";
import Dialog from "@mui/material/Dialog";
import classNames from "classnames";
import { useColorScheme } from "@mui/material/styles";

export default function About({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => void;
}) {
  const { mode } = useColorScheme();

  return (
    <Dialog fullScreen open={isOpen} onClose={handleClose}>
      <div
        className={classNames("w-full h-10 flex justify-end px-2", {
          "bg-slate-800": mode == "dark",
          "bg-sky-600": mode == "light",
        })}
      >
        <div
          className="absolute left-3 top-1 cursor-pointer"
          onClick={handleClose}
        >
          <CloseOutlinedIcon />
        </div>
      </div>
      <section
        className={classNames("w-full h-full px-10 py-8", {
          "bg-slate-900 text-white": mode == "dark",
          "bg-white": mode == "light",
        })}
      >
        <div className="w-full flex justify-around mb-8">
          <a
            href="https://vitejs.dev"
            target="_blank"
            className="h-14 hover:drop-shadow-lg transition-all ease-in-out"
          >
            <img src={viteLogo} className="h-full" alt="Vite logo" />
          </a>
          <a
            href="https://react.dev"
            target="_blank"
            className="h-14 hover:drop-shadow-lg-react animate-spin-slow transition-all ease-in-out"
          >
            <img src={reactLogo} className="h-full" alt="React logo" />
          </a>
        </div>
        <h1 className="text-3xl font-bold text-center mb-8">NeuronOS</h1>
        <div className="text-center space-y-4 text-gray-400 mb-8">
          <p>
            This is a POC for NeuronOS using NestJS for back-end. A powerful
            framework for building efficient and scalable server-side
            applications.
          </p>
          <p>
            It provides a feature called Server-Sent Events which is better in
            this case because we only need a one way communication BE -{">"} FE
          </p>
        </div>
      </section>
    </Dialog>
  );
}
