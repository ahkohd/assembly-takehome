import { useContext } from "react";

import Searchbar from "@/components/Searchbar";
import SearchResults from "@/components/SearchResults";
import { StoreContext } from "@/context/StoreProvider";
import EmptyState from "@/components/EmptyState";
import ErrorView from "@/components/ErrorView";
import BlockLoader from "@/components/BlockLoader";

const Content = () => {
  const { results, query, isLoading } = useContext(StoreContext);
  const showEmptyState = !results.length && !isLoading && query;

  return (
    <section className="m-auto">
      <h1 className="text-6xl font-semibold text-center cursor-default mb-4">
        Octosearch{" "}
        <span role="img" aria-label="octocat">
          🐙
        </span>
      </h1>
      <p className="text-center font-medium mb-8 text-lg cursor-default text-gray-700">
        Search for an organization to browse their repositories.
      </p>

      <Searchbar />
      <SearchResults />

      <BlockLoader isLoading={isLoading} />

      {showEmptyState && (
        <EmptyState
          title="No result found!"
          description={`"${query}" does not exists, please try another keyword`}
        />
      )}
      <ErrorView />
    </section>
  );
};

export default Content;
