import { useContext } from "react";
import { StoreContext } from "@/context/StoreProvider";

const SearchResults = () => {
  const { results } = useContext(StoreContext);

  return (
    <div>
      <ul>
        {results.map((result) => (
          <li key={result.id}>
            {result.name} {result.stargazers_count} {result.watchers_count}{" "}
            {result.language}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
