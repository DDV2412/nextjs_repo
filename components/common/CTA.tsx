import React from "react";
import ButtonLinkSecondary from "@/components/link/ButtonLinkSecondary";

const CTA = () => {
  return (
    <>
      <section className="mt-6 bg-indigo-700 h-80">
        <div className="container h-full">
          <div className="grid grid-cols-3 h-full items-center gap-16">
            <div className="col-span-2 h-40 flex flex-col gap-4 justify-center border-r-2 border-dashed">
              <h2 className="text-2xl font-semibold text-white">
                Get Unlimited Access
              </h2>
              <p className="text-white max-w-[70%]">
                Save 15% off assets with membership. Unlock Orca unlimited
                access to all 1000+ templates available and save over $299.
              </p>
            </div>
            <div className="h-full flex flex-col gap-4 justify-center">
              <h2 className="text-2xl font-semibold text-white">
                <span className="text-4xl">$19</span> /month
              </h2>
              <ButtonLinkSecondary href="#">
                Go Unlimited Now
              </ButtonLinkSecondary>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default CTA;
