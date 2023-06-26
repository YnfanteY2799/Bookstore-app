import { useState, type FormEvent, type ReactElement, useEffect } from "react";
import { useQuery } from "react-query";

import { PageCard, PageWrapper } from "@/components";
import { getAllBooks } from "@/api";

export default function HomePage(): ReactElement {
  // Hooks
  const { data, refetch } = useQuery(["Books"], getAllBooks);

  // State
  const [_searchWord, setSearchWord] = useState("" as string);
  const [books, setBooks] = useState([1, 2, 3, 4] as any[]);

  function goSearch(_e: FormEvent<HTMLFormElement>) {}

  useEffect(() => {
    if (data !== undefined) setBooks(data);
  }, [data]);

  return (
    <PageWrapper>
      <div className="container px-6 py-16 mx-auto text-center pt-28">
        <div className="max-w-lg mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white md:text-4xl">
            TrustBased Bookstore.
          </h1>

          <div className="w-full max-w-sm mx-auto mt-6 bg-transparent border rounded-md focus-within:border-blue-400 focus-within:ring focus-within:ring-blue-300 focus-within:ring-opacity-40 dark:border-gray-700 dark:focus-within:border-blue-300">
            <form className="flex flex-col md:flex-row" onSubmit={(e) => goSearch(e)}>
              <input
                placeholder="Search your desired Book"
                onChange={({ target: { value } }) => setSearchWord(value)}
                className="flex-1 h-10 px-4 py-2 m-1 text-gray-700 placeholder-gray-400 bg-transparent border-none appearance-none focus:placeholder-transparent focus:outline-none focus:ring-0 dark:text-gray-200"
              />

              <button
                type="submit"
                className="h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:bg-blue-400 focus:outline-none"
              >
                Buscar
              </button>
            </form>
          </div>
          <button onClick={() => refetch()}>Refresh</button>
        </div>
        <div className="max-w-screen-xl mx-auto mt-28">
          <div className="container px-4 mx-auto my-12 md:px-12">
            <div className="flex flex-wrap gap-0 -mx-1 lg:-mx-4">
              {books.map((_x, i) => (
                <div
                  className="w-full px-1 my-1 border border-white md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
                  key={i}
                >
                  <PageCard />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
