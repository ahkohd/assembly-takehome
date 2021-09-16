import { useCallback, useContext, useEffect, useRef } from "react";
import { OctokitContext } from "@/context/OctokitProvider";
import { StoreContext } from "@/context/StoreProvider";
import debounce from "lodash/debounce";
import Result from "@/types/Result";

const Searchbar = () => {
  const SEARCH_PARAM = "search";
  const octokit = useContext(OctokitContext);
  const { setIsError, setIsLoading, setError, setResults } = useContext(
    StoreContext
  );
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const url = new URLSearchParams(window.location.search);
    if (url.has(SEARCH_PARAM)) {
      let q = url.get(SEARCH_PARAM)!;

      search(q);
      ref.current!.value = q;
    }
  }, []);

  const handleInputChange = useCallback(
    debounce((e) => {
      const { value } = e.target;
      search(value);
      updateAdressbar(value);
    }, 250),
    []
  );

  const search = async (value: string) => {
    setIsLoading(true);
    setResults([]);

    try {
      const { data } = await octokit.request("GET /orgs/{org}/repos", {
        org: value.trim().toLowerCase(),
      });
      setResults(data as Array<Result>);
    } catch (error) {
      setIsError(true);
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateAdressbar = (query: string) => {
    window.history.replaceState(
      {},
      "",
      query.length > 0 ? `?${SEARCH_PARAM}=${query}` : "/"
    );
  };

  return (
    <input ref={ref} type="search" name="search" onChange={handleInputChange} />
  );
};

export default Searchbar;
