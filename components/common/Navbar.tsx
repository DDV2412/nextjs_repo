import Link from 'next/link';
import React, { useState } from 'react';
import NextLink from '../link/NextLink';
import ButtonLink from '../link/ButtonLink';

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <nav className="container py-4">
      <div className="flex justify-between items-center gap-6">
        <Link
          aria-label="Brand Logo"
          href="/"
          className="text-indigo-700 hover:opacity-80 h-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 102 53"
            fill="none">
            <g clipPath="url(#clip0_132_232)">
              <path
                d="M45.8862 0.793481C21.1148 18.4302 21.8766 48.0343 0 52.2776C18.7291 31.8269 24.1602 0.58882 45.8862 0.793481Z"
                fill="currentColor"
              />
              <path
                d="M61.622 7.2339C44.3136 24.8723 42.6371 48.4925 23.2983 52.2767C37.9677 36.274 44.4641 13.6763 57.0021 4.67766C75.1742 -8.30731 101.518 7.48994 83.3923 30.5996L75.9312 29.7842C89.488 16.5399 76.2914 -7.64361 61.622 7.2339Z"
                fill="currentColor"
              />
              <path
                d="M97.8624 8.61447C97.3047 13.5231 93.4457 47.7269 84.056 44.9147C80.8581 43.9435 78.6757 38.933 80.9596 34.4843L72.9386 33.4111L59.2351 49.873L68.27 50.4348L74.056 42.868C92.7357 54.8827 101.364 41.3856 101.618 25.6894C101.72 20.016 99.3358 13.6756 97.8624 8.61447Z"
                fill="currentColor"
              />
            </g>
            <defs>
              <clipPath id="clip0_132_232">
                <rect width="102" height="53" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Link>
        <ul
          className={`lg:flex flex-1 justify-start gap-2 ${
            showNav
              ? 'flex flex-col items-start absolute left-0 right-0 top-16 md:top-20 bg-white z-10 py-8'
              : 'hidden items-center'
          }`}>
          <li>
            <NextLink href="/articles">Articles</NextLink>
          </li>
          <li>
            <NextLink href="/journals">Journals</NextLink>
          </li>
          <li>
            <NextLink href="#">Blog</NextLink>
          </li>
          <li className="hidden lg:block">
            <div className="h-5 w-[1px] bg-slate-200"></div>
          </li>
          <li>
            <NextLink href="#">Contact</NextLink>
          </li>
          <li className="flex md:hidden w-full px-4">
            <ButtonLink href="#" className="w-full">
              Log In
            </ButtonLink>
          </li>
        </ul>
        <div className="flex justify-end items-center gap-6">
          <div className="hidden md:flex">
            <ButtonLink href="#">Log In</ButtonLink>
          </div>
          <button
            aria-label="Nav Toggle"
            onClick={() => setShowNav(!showNav)}
            className="relative overflow-hidden w-8 h-8 flex lg:hidden justify-start group items-center transition-all duration-150">
            <div className="absolute group-hover:w-full transition-all duration-150 w-full h-0.5 top-1/2 transform -translate-y-2 bg-slate-900 rounded-lg"></div>
            <div className="absolute group-hover:w-full transition-all duration-150 w-3/4 h-0.5 top-1/2 transform -translate-y-0 bg-slate-900 rounded-lg"></div>
            <div className="absolute group-hover:w-full transition-all duration-150 w-full h-0.5 top-1/2 transform translate-y-2 bg-slate-900 rounded-lg"></div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
