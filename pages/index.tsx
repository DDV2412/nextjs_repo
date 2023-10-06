import React, { useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import { MyPage } from './../components/common/types';
import Link from 'next/link';
import ButtonLink from '@/components/link/ButtonLink';
import HeroSection from '@/components/common/Hero';
import CTA from '@/components/common/CTA';
import ArticleCard from '@/components/card/ArticleCard';
import { Loading } from '@/components/common/Loading';
import Image from 'next/image';

const Home: MyPage = () => {
  const [articles, setArticles] = useState({
    articles: [],
    aggrs: {
      subjects: [],
    },
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('/api/featured')
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setArticles(data.data);
      });
  }, []);
  return (
    <>
      <NextSeo title="IPMUGO Digital Library" />
      <HeroSection />

      <>
        {loading ? (
          <div className="min-h-screen">
            <Loading />
          </div>
        ) : (
          <>
            <section className="container">
              <div className="pt-16 pb-10">
                <div className="flex flex-wrap justify-between items-center gap-6">
                  <h2 className="text-xl md:text-2xl font-semibold">
                    Browse Trending Topics
                  </h2>
                  <Link
                    href="#"
                    className="flex group justify-start items-center gap-2 text-sm font-medium transition-all duration-150">
                    <span>View All Topics</span>
                    <div className="w-5 h-5 flex justify-center items-center group-hover:translate-x-3 transition-all duration-150">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        viewBox="0 0 24 24"
                        fill="none">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12.9697 3.96967C13.2626 3.67678 13.7374 3.67678 14.0303 3.96967L21.5303 11.4697C21.671 11.6103 21.75 11.8011 21.75 12C21.75 12.1989 21.671 12.3897 21.5303 12.5303L14.0303 20.0303C13.7374 20.3232 13.2626 20.3232 12.9697 20.0303C12.6768 19.7374 12.6768 19.2626 12.9697 18.9697L19.1893 12.75H3C2.58579 12.75 2.25 12.4142 2.25 12C2.25 11.5858 2.58579 11.25 3 11.25H19.1893L12.9697 5.03033C12.6768 4.73744 12.6768 4.26256 12.9697 3.96967Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </Link>
                </div>
                <div className="mt-10 flex justify-between items-center gap-4 overflow-scroll">
                  {articles?.aggrs.subjects.map(
                    (aggr: any, index: number) =>
                      index <= 6 &&
                      aggr._id !== '' && (
                        <Link
                          href={`/articles?search=${aggr._id}`}
                          key={index}
                          className="bg-slate-900 text-white flex-1 hover:shadow-lg cursor-pointer hover:scale-105 transition-all duration-150 h-28 flex justify-center items-center text-lg font-medium text-center">
                          {aggr._id}
                        </Link>
                      ),
                  )}
                </div>
              </div>
            </section>
            <section className="container">
              <div className="pt-6 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  <div className="relative w-full overflow-hidden lg:row-span-2 py-12 px-6 bg-[url('/images/banner.jpg')] flex flex-col gap-4">
                    <h2 className="text-2xl font-semibold text-white">
                      Featured Articles
                    </h2>
                    <p className="text-white text-lg">
                      Explore our selection of top research articles from
                      various fields.
                    </p>
                    <ButtonLink href="/articles">View all featured</ButtonLink>
                  </div>
                  {articles?.articles.map((article: any, index: number) => (
                    <ArticleCard
                      key={index}
                      title={article.title}
                      href={article._id}
                      topic={article.subjects}
                      image={article.thumbnail}
                      journalName={article.journal.abbreviation}
                    />
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </>
      {/* <section className="container">
        <div className="pt-6 pb-10">
          <div className="grid grid-cols-2 gap-4">
            <div className="h-full justify-center max-w-[75%] relative w-full overflow-hidden row-span-2 pt-10 px-6 flex flex-col gap-4">
              <h2 className="text-2xl font-semibold ">
                Get inspired with the latest design trends
              </h2>
              <p className=" text-base text-slate-500">
                Find the best hand-picked design inspiration to get inspired of
                fresh, curated graphic design, tech, news, art, illustration,
                typography, photography, architecture, fashion and so much more.
              </p>
              <ButtonLink href="#">Get Inspired</ButtonLink>
            </div>
            <figure className="relative w-full h-80 scale-125 overflow-hidden">
              <Image
                src="/images/oCrXVgYfdQ0SZwjsdo6PGN2d4cU.webp"
                alt=""
                className="object-cover w-full absolute -right-24 bottom-0"
              />
            </figure>
          </div>
        </div>
      </section>
      <section className="container">
        <div className="pt-6 pb-10">
          <div className="grid grid-cols-2 gap-5">
            <div className="h-full relative w-full overflow-hidden row-span-2 pt-10 px-6 bg-slate-900 flex flex-col gap-4">
              <h2 className="text-2xl font-semibold text-white">
                15% Off Sale
              </h2>
              <p className="text-white max-w-[75%]">
                Use code ORCA15 to download this week’s 15% off sale and unlock
                your creativity.
              </p>
              <ButtonLink href="#">Shop the sale</ButtonLink>
              <figure className="w-full h-80 absolute bottom-0">
                <Image
                  src="/images/BcF4Ulw9qhiiJTIMyymR4kBM58.webp"
                  alt=""
                  className="w-full h-full object-contain scale-125"
                />
              </figure>
            </div>
            <div className="h-full w-full flex gap-4 text-white bg-indigo-700 p-5 overflow-hidden">
              <div className="flex flex-col gap-4 justify-center">
                <h2 className="text-2xl font-semibold">Advance SEO</h2>
                <p className="text-white">
                  Improve search engine results with using our search-friendly
                  templates.
                </p>
              </div>
              <figure className="w-full h-52 relative">
                <Image
                  src="/images/Vqy4IuHWjdCz6T5jNR8XxMDh1Q.webp"
                  alt=""
                  className="w-full h-full object-contain absolute -right-20"
                />
              </figure>
            </div>
            <div className="h-full w-full flex gap-4 bg-indigo-100 p-5 overflow-hidden border-2 border-slate-200">
              <div className="flex flex-col gap-4 justify-center">
                <h2 className="text-2xl font-semibold">Advance SEO</h2>
                <p>
                  Improve search engine results with using our search-friendly
                  templates.
                </p>
              </div>
              <figure className="w-full h-52 relative">
                <Image
                  src="/images/KtTgv89LTSqnF0PEVecRTqnK8.webp"
                  alt=""
                  className="w-full h-full object-contain absolute -right-20"
                />
              </figure>
            </div>
          </div>
        </div>
      </section>
      <section className="container">
        <div className="pt-6 pb-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Read our latest articles</h2>
            <Link
              href="#"
              className="flex group justify-start items-center gap-2 text-sm font-medium transition-all duration-150"
            >
              <span>View All articles</span>
              <div className="w-5 h-5 flex justify-center items-center group-hover:translate-x-3 transition-all duration-150">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.9697 3.96967C13.2626 3.67678 13.7374 3.67678 14.0303 3.96967L21.5303 11.4697C21.671 11.6103 21.75 11.8011 21.75 12C21.75 12.1989 21.671 12.3897 21.5303 12.5303L14.0303 20.0303C13.7374 20.3232 13.2626 20.3232 12.9697 20.0303C12.6768 19.7374 12.6768 19.2626 12.9697 18.9697L19.1893 12.75H3C2.58579 12.75 2.25 12.4142 2.25 12C2.25 11.5858 2.58579 11.25 3 11.25H19.1893L12.9697 5.03033C12.6768 4.73744 12.6768 4.26256 12.9697 3.96967Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-4 gap-5">
            <article className="h-full w-full">
              <Link href="#"  className="flex flex-col gap-4">
                <figure className="min-w-full overflow-hidden h-48">
                  <Image src="/images/jmBCjQcfOSX3R5n8UOZa7XCiPMg.webp" alt="" />
                </figure>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-medium">
                    Sleep Tracking App UI Kit
                  </h3>
                  <p className="text-sm text-slate-500">
                    in <span className="font-semibold">Mobile UI</span>
                  </p>
                </div>
              </Link>
            </article>
            <article className="h-full w-full">
              <Link href="#"  className="flex flex-col gap-4">
                <figure className="min-w-full overflow-hidden h-48">
                  <Image src="/images/jmBCjQcfOSX3R5n8UOZa7XCiPMg.webp" alt="" />
                </figure>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-medium">
                    Sleep Tracking App UI Kit
                  </h3>
                  <p className="text-sm text-slate-500">
                    in <span className="font-semibold">Mobile UI</span>
                  </p>
                </div>
              </Link>
            </article>
            <article className="h-full w-full">
              <Link href="#"  className="flex flex-col gap-4">
                <figure className="min-w-full overflow-hidden h-48">
                  <Image src="/images/jmBCjQcfOSX3R5n8UOZa7XCiPMg.webp" alt="" />
                </figure>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-medium">
                    Sleep Tracking App UI Kit
                  </h3>
                  <p className="text-sm text-slate-500">
                    in <span className="font-semibold">Mobile UI</span>
                  </p>
                </div>
              </Link>
            </article>
            <article className="h-full w-full">
              <Link href="#"  className="flex flex-col gap-4">
                <figure className="min-w-full overflow-hidden h-48">
                  <Image src="/images/jmBCjQcfOSX3R5n8UOZa7XCiPMg.webp" alt="" />
                </figure>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-medium">
                    Sleep Tracking App UI Kit
                  </h3>
                  <p className="text-sm text-slate-500">
                    in <span className="font-semibold">Mobile UI</span>
                  </p>
                </div>
              </Link>
            </article>
            <article className="h-full w-full">
              <Link href="#"  className="flex flex-col gap-4">
                <figure className="min-w-full overflow-hidden h-48">
                  <Image src="/images/jmBCjQcfOSX3R5n8UOZa7XCiPMg.webp" alt="" />
                </figure>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-medium">
                    Sleep Tracking App UI Kit
                  </h3>
                  <p className="text-sm text-slate-500">
                    in <span className="font-semibold">Mobile UI</span>
                  </p>
                </div>
              </Link>
            </article>
            <article className="h-full w-full">
              <Link href="#"  className="flex flex-col gap-4">
                <figure className="min-w-full overflow-hidden h-48">
                  <Image src="/images/jmBCjQcfOSX3R5n8UOZa7XCiPMg.webp" alt="" />
                </figure>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-medium">
                    Sleep Tracking App UI Kit
                  </h3>
                  <p className="text-sm text-slate-500">
                    in <span className="font-semibold">Mobile UI</span>
                  </p>
                </div>
              </Link>
            </article>
            <article className="h-full w-full">
              <Link href="#"  className="flex flex-col gap-4">
                <figure className="min-w-full overflow-hidden h-48">
                  <Image src="/images/jmBCjQcfOSX3R5n8UOZa7XCiPMg.webp" alt="" />
                </figure>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-medium">
                    Sleep Tracking App UI Kit
                  </h3>
                  <p className="text-sm text-slate-500">
                    in <span className="font-semibold">Mobile UI</span>
                  </p>
                </div>
              </Link>
            </article>
            <article className="h-full w-full">
              <Link href="#"  className="flex flex-col gap-4">
                <figure className="min-w-full overflow-hidden h-48">
                  <Image src="/images/jmBCjQcfOSX3R5n8UOZa7XCiPMg.webp" alt="" />
                </figure>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-medium">
                    Sleep Tracking App UI Kit
                  </h3>
                  <p className="text-sm text-slate-500">
                    in <span className="font-semibold">Mobile UI</span>
                  </p>
                </div>
              </Link>
            </article>
            <article className="h-full w-full">
              <Link href="#"  className="flex flex-col gap-4">
                <figure className="min-w-full overflow-hidden h-48">
                  <Image src="/images/jmBCjQcfOSX3R5n8UOZa7XCiPMg.webp" alt="" />
                </figure>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-medium">
                    Sleep Tracking App UI Kit
                  </h3>
                  <p className="text-sm text-slate-500">
                    in <span className="font-semibold">Mobile UI</span>
                  </p>
                </div>
              </Link>
            </article>
            <article className="h-full w-full">
              <Link href="#"  className="flex flex-col gap-4">
                <figure className="min-w-full overflow-hidden h-48">
                  <Image src="/images/jmBCjQcfOSX3R5n8UOZa7XCiPMg.webp" alt="" />
                </figure>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-medium">
                    Sleep Tracking App UI Kit
                  </h3>
                  <p className="text-sm text-slate-500">
                    in <span className="font-semibold">Mobile UI</span>
                  </p>
                </div>
              </Link>
            </article>
            <article className="h-full w-full">
              <Link href="#"  className="flex flex-col gap-4">
                <figure className="min-w-full overflow-hidden h-48">
                  <Image src="/images/jmBCjQcfOSX3R5n8UOZa7XCiPMg.webp" alt="" />
                </figure>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-medium">
                    Sleep Tracking App UI Kit
                  </h3>
                  <p className="text-sm text-slate-500">
                    in <span className="font-semibold">Mobile UI</span>
                  </p>
                </div>
              </Link>
            </article>
            <article className="h-full w-full">
              <Link href="#"  className="flex flex-col gap-4">
                <figure className="min-w-full overflow-hidden h-48">
                  <Image src="/images/jmBCjQcfOSX3R5n8UOZa7XCiPMg.webp" alt="" />
                </figure>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-medium">
                    Sleep Tracking App UI Kit
                  </h3>
                  <p className="text-sm text-slate-500">
                    in <span className="font-semibold">Mobile UI</span>
                  </p>
                </div>
              </Link>
            </article>
          </div>
        </div>
      </section> */}
      <CTA />
    </>
  );
};
export default Home;
Home.Layout = 'Main';
