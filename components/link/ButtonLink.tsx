import Link from "next/link";

interface NextLinkProps {
  href: string;
  children: React.ReactNode;
}

const ButtonLink = ({ href, children }: NextLinkProps) => {
  return (
    <Link
      replace
      href={href}
      className="relative max-w-max border-2 border-indigo-700 transition-all duration-150 group overflow-hidden hover:text-indigo-700 hover:border-slate-200 py-3 px-7 flex justify-center items-center font-medium text-sm md:text-base bg-indigo-700 rounded-lg text-white"
    >
      <div className="group absolute bg-white left-0 right-0 translate-y-80 h-60 rounded-full scale-0 group-hover:scale-100  group-hover:translate-y-0 transition-all duration-150"></div>
      <span className="relative">{children}</span>
    </Link>
  );
};

export default ButtonLink;
