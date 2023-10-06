import React, { useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import { MyPage } from '../components/common/types';
import HeroSection from '@/components/common/Hero';
import CTA from '@/components/common/CTA';
import { Loading } from '@/components/common/Loading';
import Image from 'next/image';

const Journals: MyPage = () => {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/journals')
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setJournals(data.data);
      });
  }, []);

  return (
    <>
      <NextSeo title="Journals | IPMUGO Digital Library" />
      <HeroSection />

      <section className="container min-h-screen">
        <div className="py-10">
          {loading ? (
            <div className="min-h-screen">
              <Loading />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {journals?.map((journal: any) => (
                <div
                  key={journal._id}
                  className="relative min-w-full min-h-full overflow-hidden rounded-lg">
                  <figure>
                    <Image
                      src={journal.thumbnail_image}
                      alt={journal.title}
                      width={500}
                      height={500}
                    />
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
          )}
        </div>
      </section>

      <CTA />
    </>
  );
};
export default Journals;
Journals.Layout = 'Main';
