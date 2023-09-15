import React, { ChangeEvent, useState, useEffect } from "react";
import ButtonPrimary from "@/components/button/ButtonPrimary";
import { useRouter } from "next/router";
import Link from "next/link";

const HeroSection = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;

    setSearch(searchValue);
  };

  const submitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentQuery = { ...router.query };

    currentQuery.search = search;

    router.push({
      pathname: "/articles",
      query: currentQuery,
    });
  };

  useEffect(() => {
    const searchQuery = router.query.search as string;

    if (searchQuery === undefined) {
      setSearch("");
    }
    setSearch(searchQuery);
  }, [router.query]);
  return (
    <>
      <section className="container">
        <div className="min-w-full bg-slate-900 pl-16 h-[28rem] overflow-hidden">
          <div className="grid grid-cols-2 h-full">
            <div className="max-w-[80%] flex flex-col gap-y-4 justify-center">
              <h1 className="text-3xl font-semibold text-white">
                Explore the world's best research.
              </h1>
              <p className="text-lg text-white font-medium">
                Access the latest knowledge in applied science, electrical
                engineering, computer science and information technology,
                education, and health.
              </p>
              <form
                onSubmit={submitSearch}
                className="flex justify-start items-center gap-2"
              >
                <input
                  type="text"
                  value={search}
                  onChange={searchHandler}
                  placeholder="Search for articles ... "
                  name="seach"
                  className="w-full px-4 py-3 border-2 border-slate-600 rounded-lg outline-none bg-slate-600/30 text-white"
                />
                <ButtonPrimary type="submit">Search</ButtonPrimary>
              </form>
              <div className="mt-4 w-1/2 flex flex-col justify- items-start gap-4">
                <div className="relative w-full flex justify-center items-center">
                  <div className="text-slate-600">OR</div>
                  <div className="w-[40%] absolute top-[50%] left-0 -translate-y-[50%] h-[1px] bg-slate-600"></div>
                  <div className="w-[40%] absolute top-[50%] right-0 -translate-y-[50%] h-[1px] bg-slate-600"></div>
                </div>
                <Link href="/advanced-search" replace className="text-white">
                  Advanced Search
                </Link>
              </div>
            </div>
            <figure className="w-full h-full relative">
              <img
                src="/images/Hero-Background.webp"
                alt=""
                className="w-full h-full object-cover absolute top-0 -right-20 scale-150"
              />
            </figure>
          </div>
        </div>
      </section>
    </>
  );
};
export default HeroSection;
