import Link from "next/link";
import { motion } from "framer-motion";

interface NextLinkProps {
  type: "button" | "submit" | "reset";
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ButtonPrimary = ({ type, children, onClick }: NextLinkProps) => {
  return (
    <motion.button
      transition={{ duration: 0.5 }}
      type={type}
      onClick={onClick}
      className="relative max-w-max  border-2 border-indigo-700 transition-all duration-150 group overflow-hidden hover:text-indigo-700 hover:border-slate-200 py-3 px-7 flex justify-center items-center font-medium text-sm md:text-base bg-indigo-700 rounded-lg text-white"
    >
      <div className="group absolute bg-white left-0 right-0 translate-y-80 h-60 rounded-full scale-0 group-hover:scale-100  group-hover:translate-y-0 transition-all duration-150"></div>
      <span className="relative">{children}</span>
    </motion.button>
  );
};

export default ButtonPrimary;
