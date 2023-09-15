import React, { useEffect, useState } from "react";
import { NextSeo } from "next-seo";
import { MyPage } from "../../components/common/types";
import CTA from "@/components/common/CTA";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import Cite from "citation-js";

const Detail: MyPage = ({
  article,
  articles,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [cited, setCited] = useState("");
  const [authors, setAuthors] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const citationBuild = async () => {
    if (
      article &&
      article.data.doi &&
      !article.data.doi.includes("https") &&
      !article.data.doi.includes("http")
    ) {
      let data = new Cite(article.data.doi);

      let output = data.format("bibliography", {
        format: "html",
        template: "ieee",
        lang: "en-US",
      });

      setCited(output);

      const articleData = await Cite.async(article.data.doi);

      if (articleData.data[0]) {
        setAuthors(articleData.data[0].author);
        setSubjects(articleData.data[0].subject);
      }
    }
  };

  const downloadHandler = (type: string, doi: string) => {
    let output = "";
    let data = new Cite(doi);

    if (type === "txt") {
      output = data.format("bibliography", {
        format: "html",
        template: "ieee",
        lang: "en-US",
      });
    }

    if (type === "bib") {
      output = data.format("bibtex");
    }

    if (type === "ris") {
      output = data.format("ris");
    }

    const blob = new Blob([output], { type: "text/plain" });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = `citation.${type}`;

    document.body.appendChild(a);

    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  useEffect(() => {
    citationBuild();
  }, [article]);

  return (
    <>
      <NextSeo
        title={`${article.data.title} | IPMUGO Digital Library`}
        description={article.data.description}
      />
      <section className="container">
        <div className="min-w-full bg-slate-900 h-[28rem] overflow-hidden">
          <div className="flex justify-center items-center h-full">
            <div className="max-w-[70%] flex flex-col gap-y-4 justify-center">
              <h1 className="text-3xl text-center font-semibold text-white">
                {article.data.title}
              </h1>
              <p className="text-lg text-center text-white font-medium">
                {article.data.journal.title}
              </p>
              <div className="text-center text-sm text-white flex justify-center flex-wrap gap-3">
                {authors.length > 0 ? (
                  <>
                    {authors.map((creator: any, index: number) => (
                      <div
                        key={index}
                        className="max-w-max flex justify-center gap-1 items-center"
                      >
                        {creator["ORCID"] && (
                          <Link href={creator["ORCID"]} target="_blank">
                            <figure className="w-5 h-5 rounded-full overflow-hidden">
                              <img
                                src="/images/orcid_logo.png"
                                alt={creator["ORCID"]}
                                className="w-full h-full object-cover"
                              />
                            </figure>
                          </Link>
                        )}
                        <span>
                          {creator.family} {creator.given}
                        </span>
                        {index < authors.length - 1 && ","}
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {article.data.creators.map(
                      (creator: string, index: number) => (
                        <div key={index} className="max-w-max">
                          <span>
                            {creator.split(",")[1]} {creator.split(",")[0]}
                          </span>
                          {index < article.data.creators.length - 1 && ","}
                        </div>
                      )
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container">
        <div className="pt-6 pb-10">
          <div className="grid grid-cols-4 gap-4">
            <div className="h-full max-w-[75%] relative w-full overflow-hidden col-span-3 pt-10 px-6 flex flex-col gap-4">
              <h2 className="text-2xl font-semibold ">Abstract</h2>
              <p className=" text-base text-slate-500">
                {article.data.description}
              </p>
              <div className="w-full h-[1px] bg-slate-200 my-8"></div>
              <div className="flex flex-col justify-start flex-wrap gap-4">
                <h2 className="text-2xl font-semibold ">DOI</h2>
                <p className=" text-base text-slate-500">{article.data.doi}</p>
              </div>
              <div className="w-full h-[1px] bg-slate-200 my-8"></div>
              <div className="flex flex-col justify-start flex-wrap gap-4">
                <h2 className="text-2xl font-semibold ">Publisher</h2>
                <p className=" text-base text-slate-500">
                  {article.data.publisher}
                </p>
              </div>
              {article.data.subjects > 0 ? (
                <>
                  {" "}
                  <div className="w-full h-[1px] bg-slate-200 my-8"></div>
                  <div className="flex flex-col justify-start flex-wrap gap-4">
                    <h2 className="text-2xl font-semibold ">Keywords</h2>
                    <div className="flex flex-wrap gap-4">
                      {article.data.subjects
                        ? article.data.subjects.map(
                            (subject: string, i: number) => (
                              <Link
                                key={i}
                                href={`/articles?search=${subject}`}
                                replace
                                className="py-3 px-5 rounded-lg border-2 border-slate-100 text-slate-400"
                              >
                                {subject}
                              </Link>
                            )
                          )
                        : ""}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full h-[1px] bg-slate-200 my-8"></div>
                  <div className="flex flex-col justify-start flex-wrap gap-4">
                    <h2 className="text-2xl font-semibold ">Keywords</h2>
                    <div className="flex flex-wrap gap-4">
                      {subjects.length > 0 &&
                        subjects.map((subject, i) => (
                          <Link
                            key={i}
                            href={`/articles?search=${subject}`}
                            replace
                            className="py-3 px-5 rounded-lg border-2 border-slate-100 text-slate-400"
                          >
                            {subject}
                          </Link>
                        ))}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="flex pt-6 pb-10 flex-col ">
              <Link
                href={article.data.file_view}
                target="_blank"
                className="mb-8 w-full bg-indigo-700 text-white flex justify-center gap-3 items-center py-4 uppercase font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M19.5 14.25V11.625C19.5 9.76104 17.989 8.25 16.125 8.25H14.625C14.0037 8.25 13.5 7.74632 13.5 7.125V5.625C13.5 3.76104 11.989 2.25 10.125 2.25H8.25M8.25 15H15.75M8.25 18H12M10.5 2.25H5.625C5.00368 2.25 4.5 2.75368 4.5 3.375V20.625C4.5 21.2463 5.00368 21.75 5.625 21.75H18.375C18.9963 21.75 19.5 21.2463 19.5 20.625V11.25C19.5 6.27944 15.4706 2.25 10.5 2.25Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>Full View</span>
              </Link>
              {!article.data.doi.includes("https") &&
              !article.data.doi.includes("http") ? (
                <>
                  <h2 className="text-2xl font-semibold mb-4">Cited</h2>
                  <div className="mb-8 w-full">
                    <div className="relative">
                      <div
                        dangerouslySetInnerHTML={{ __html: cited }}
                        className="relative min-w-full px-4 py-3 outline-none flex justify-center items-cente shadow-inner rounded-md bg-white text-sm font-light"
                      ></div>
                      <div className="p-1 rounded-lg absolute w-8 text-indigo-700 right-0 -top-3 cursor-pointer bg-white shadow-inner h-8 flex justify-center items-center group transition-all duration-150">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M7.5 7.5H6.75C5.50736 7.5 4.5 8.50736 4.5 9.75V17.25C4.5 18.4926 5.50736 19.5 6.75 19.5H14.25C15.4926 19.5 16.5 18.4926 16.5 17.25V9.75C16.5 8.50736 15.4926 7.5 14.25 7.5H13.5M7.5 11.25L10.5 14.25M10.5 14.25L13.5 11.25M10.5 14.25L10.5 1.5M16.5 10.5H17.25C18.4926 10.5 19.5 11.5074 19.5 12.75V20.25C19.5 21.4926 18.4926 22.5 17.25 22.5H9.75C8.50736 22.5 7.5 21.4926 7.5 20.25V19.5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <div className="flex-col justify-end gap-2 p-2 bg-slate-50 w-[6rem] translate-x-[6rem] group-hover:flex group-hover:translate-x-[0rem] right-0 absolute hidden top-8 shadow-inner rounded-lg text-slate-900 transition-all duration-150 ">
                          <p
                            className="text-right text-sm font cursor-pointer hover:pr-2 transition-all duration-150 hover:text-indigo-700"
                            onClick={() =>
                              downloadHandler("txt", article.data.doi)
                            }
                          >
                            Plan Text
                          </p>
                          <p
                            className="text-right text-sm font cursor-pointer hover:pr-2 transition-all duration-150 hover:text-indigo-700"
                            onClick={() =>
                              downloadHandler("bib", article.data.doi)
                            }
                          >
                            Bib
                          </p>
                          <p
                            className="text-right text-sm font cursor-pointer hover:pr-2 transition-all duration-150 hover:text-indigo-700"
                            onClick={() =>
                              downloadHandler("ris", article.data.doi)
                            }
                          >
                            RIS
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
              <h2 className="text-2xl font-semibold mb-8">Related Articles</h2>
              {articles?.data?.articles.map(
                (related: any, index: number) =>
                  index <= 5 &&
                  related.title !== article.data.title && (
                    <>
                      <article>
                        <Link
                          href={related._id}
                          replace
                          className="flex flex-col gap-4"
                        >
                          <div className="flex flex-col gap-2">
                            <h3 className="font-medium line-clamp-2">
                              {related.title}
                            </h3>
                            <p className="text-sm text-slate-500">
                              in{" "}
                              <span className="font-semibold">
                                {related.subjects.length > 0
                                  ? related.subjects[0]
                                  : related.journal.abbreviation}
                              </span>
                            </p>
                          </div>
                        </Link>
                      </article>
                      <div className="w-full h-[1px] bg-slate-200 my-4"></div>
                    </>
                  )
              )}
            </div>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
};
export default Detail;
Detail.Layout = "Main";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string };
  const apiUrl = `http://127.0.0.1:6543/article/${slug}`;

  const res = await fetch(apiUrl);
  const article = await res.json();

  let apiRelated = `http://127.0.0.1:6543/articles`;

  if (article.data.subjects.length > 0) {
    apiRelated += `?subject_filter=${article.data.subjects[0]}`;
  } else {
    apiRelated += `?journal_filter=${article.data.journal.title}`;
  }

  const resRelated = await fetch(apiRelated);
  const articles = await resRelated.json();

  return {
    props: {
      article,
      articles,
    },
  };
};
