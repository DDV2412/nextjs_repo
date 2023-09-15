import React from "react";
import { NextSeo } from "next-seo";
import { MyPage } from "../components/common/types";
import HeroSection from "@/components/common/Hero";
import CTA from "@/components/common/CTA";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Loading } from "@/components/common/Loading";

const Journals: MyPage = ({
  journals,
  loading,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <NextSeo title="Journals | IPMUGO Digital Library" />
      <HeroSection />

      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <section className="container">
          <div className="py-10">
            <div className="grid grid-cols-3 gap-5">
              {journals.data.map((journal: any) => (
                <div
                  key={journal._id}
                  className="relative min-w-full min-h-full overflow-hidden rounded-lg"
                >
                  <figure>
                    <img src={journal.thumbnail_image} alt={journal.title} />
                  </figure>
                  <div className="absolute flex flex-col gap-3 left-0 bottom-0 right-0 min-h-[40%] bg-white/80 backdrop-blur-sm p-4 rounded-t-lg">
                    <h3 className="text-xl font-medium line-clamp-2">
                      {journal.title}
                    </h3>
                    <p className="line-clamp-3 text-slate-600">
                      {journal.short_summary}
                    </p>
                    <div className="mt-2 font-medium">
                      {journal.editor_in_chief}
                      <p className="text-sm font-light">Editor in Chief</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTA />
    </>
  );
};
export default Journals;
Journals.Layout = "Main";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    let loading = true;

    let apiUrl = `http://127.0.0.1:6543/journals`;

    const res = await fetch(apiUrl);
    const journals = await res.json();

    loading = false;

    const props = {
      journals,
      loading,
    };

    return {
      props,
    };
  } catch (error) {
    return {
      props: {
        articles: [],
        loading: false,
        error: "Failed to fetch journals",
      },
    };
  }
};
