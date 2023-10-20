import React from 'react';
import ButtonLinkSecondary from '@/components/link/ButtonLinkSecondary';

const CTA = () => {
  return (
    <>
      <section className="mt-6 bg-indigo-700 h-full py-8">
        <div className="container h-full">
          <div className="grid grid-cols-1 h-full items-center gap-16">
            <div className="h-40 flex flex-col gap-4 justify-center">
              <h2 className="text-2xl font-semibold text-white">
                Enjoy Free and Unlimited Access
              </h2>
              <p className="text-white md:max-w-[70%]">
                Get high-quality articles from top researchers for free.
              </p>
              <ButtonLinkSecondary href="#">Subscribe Now</ButtonLinkSecondary>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default CTA;
