import { useContext } from "react";

import { StoreContext } from "@/context/StoreProvider";
import { formatNumber } from "@/utils/fns";

const SearchResults = () => {
  const { results } = useContext(StoreContext);

  return (
    <>
      <div className="mt-10">
        {results.map((result) => (
          <article
            key={result.id}
            className="p-5 bg-white rounded-lg mb-5 cursor-default border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            tabIndex={0}
          >
            <a
              href={result.html_url}
              className="hover:underline hover:text-blue-700"
              title={result.name}
            >
              <h3 className="font-semibold block">{result.name}</h3>
            </a>
            <ul className="flex gap-3 mt-2">
              <li>
                <span role="img" aria-label="stargazers count">
                  ⭐️
                </span>{" "}
                <b>Star</b> {formatNumber(result.stargazers_count)}
              </li>
              <li>
                <span role="img" aria-label="watchers count">
                  👁
                </span>{" "}
                <b>Watch</b> {formatNumber(result.watchers_count)}
              </li>
              <li>
                <span role="img" aria-label="language">
                  🟢
                </span>{" "}
                {result.language}
              </li>
            </ul>
          </article>
        ))}
      </div>
    </>
  );
};

export default SearchResults;
