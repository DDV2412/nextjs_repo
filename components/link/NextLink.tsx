import Link from 'next/link';
import { motion } from 'framer-motion';

interface NextLinkProps {
  href: string;
  children: React.ReactNode;
  ariaLabel?: string;
}

const NextLink = ({ href, children, ariaLabel }: NextLinkProps) => {
  return (
    <Link aria-label={ariaLabel || 'Link'} href={href}>
      <motion.span
        initial={{ y: 0 }}
        whileHover={{
          color: '#4338ca',
          y: 5,
        }}
        transition={{ duration: 0.5 }}
        className="py-2 px-5 flex justify-center items-center font-medium text-sm md:text-base opacity-90">
        {children}
      </motion.span>
    </Link>
  );
};

export default NextLink;
