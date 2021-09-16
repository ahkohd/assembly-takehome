import { useCallback, useContext, useEffect, useRef } from "react";
import debounce from "lodash/debounce";

import { OctokitContext } from "@/context/OctokitProvider";
import { StoreContext } from "@/context/StoreProvider";
import Result from "@/types/Result";

const Searchbar = () => {
  const SEARCH_PARAM = "search";
  const octokit = useContext(OctokitContext);
  const {
    setIsError,
    setIsLoading,
    setError,
    setResults,
    setQuery,
    query,
  } = useContext(StoreContext);
  const ref = useRef<HTMLInputElement>(null);

  const onShortcut = (event: any) => {
    if (event.keyCode === 191) {
      ref.current?.focus();
    }
  };

  useEffect(() => {
    const url = new URLSearchParams(window.location.search);

    if (url.has(SEARCH_PARAM)) {
      let q = url.get(SEARCH_PARAM)!;

      setQuery(q);
      ref.current!.value = q;

      search(q);
    }

    document.addEventListener("keyup", onShortcut);
    return () => {
      document.removeEventListener("keyup", onShortcut);
    };
  }, []);

  const handleInputChange = useCallback(
    debounce((e) => {
      const { value } = e.target;

      setQuery(value);
      updateAddressbar(value);
      search(value);
    }, 250),
    []
  );

  const search = async (value: string) => {
    setIsLoading(true);
    setIsError(false);
    setResults([]);

    try {
      const { data } = await octokit.request("GET /orgs/{org}/repos", {
        org: value.trim().toLowerCase(),
      });

      setResults(data as Array<Result>);
    } catch (error) {
      if ((error as any)?.status !== 404) {
        setIsError(true);
        setError(error as Error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setIsError(false);
    setResults([]);
    ref.current!.value = "";
  };

  const updateAddressbar = (searchQuery: string) => {
    window.history.replaceState(
      {},
      "",
      searchQuery.length > 0 ? `?${SEARCH_PARAM}=${searchQuery}` : "/"
    );
  };

  return (
    <form
      role="search"
      aria-label="Site"
      acceptCharset="UTF-8"
      onSubmit={(e) => e.preventDefault()}
      className="sticky top-0"
    >
      <label htmlFor="searchbar" className="hidden">
        Search for an organization to browse their repositories.
      </label>
      <input
        id="searchbar"
        ref={ref}
        type="search"
        name="search"
        onChange={handleInputChange}
        role="search"
        placeholder={`Search an organization (Press "/" to focus)`}
        className="w-full rounded-lg px-5 py-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-md"
        spellCheck={false}
        aria-label={`Search an organization (Press "/" to focus)`}
        autoComplete="off"
        data-hotkey="/"
      />
      {query.length > 0 && (
        <button
          type="button"
          className="absolute top-3 right-2 text-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-md px-3"
          onClick={clearSearch}
        >
          <span role="img" aria-label="clear search">
            ␡
          </span>
        </button>
      )}
    </form>
  );
};

export default Searchbar;
