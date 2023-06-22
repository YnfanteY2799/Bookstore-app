import { type ReactElement } from "react";
import { useQuery } from "react-query";

import { PageWrapper } from "@/components";
import { getAllBooks } from "@/api";

export default function HomePage(): ReactElement {
  
  // Hooks
  const { data: _, isLoading: _2, refetch: _3 } = useQuery(["Books"], getAllBooks);

  return (
    <PageWrapper>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20">
            <div className="w-full mb-6 lg:w-1/2 lg:mb-0">
              <h1 className="mb-2 text-2xl font-medium text-gray-900 sm:text-3xl title-font">
                Pitchfork Kickstarter Taxidermy
              </h1>
              <div className="w-20 h-1 bg-indigo-500 rounded"></div>
            </div>
            <p className="w-full leading-relaxed text-gray-500 lg:w-1/2">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile
              poke farm-to-table. Franzen you probably haven't heard of them man bun deep jianbing
              selfies heirloom prism food truck ugh squid celiac humblebrag.
            </p>
          </div>
          <div className="flex flex-wrap -m-4"></div>
        </div>
      </section>
    </PageWrapper>
  );
}
