import { createContext, Dispatch, FC, useState, SetStateAction } from "react";

import Result from "@/types/Result";

interface StoreContextValue {
  results: Array<Result>;
  setResults: Dispatch<SetStateAction<Array<Result>>>;
  isError: boolean;
  setIsError: Dispatch<SetStateAction<boolean>>;
  error: Error;
  setError: Dispatch<SetStateAction<Error>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

export const StoreContext = createContext<StoreContextValue>(
  {} as StoreContextValue
);

const StoreProvider: FC = ({ children }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([] as Array<Result>);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(new Error());

  return (
    <StoreContext.Provider
      value={{
        results,
        setResults,
        isError,
        setIsError,
        error,
        setError,
        isLoading,
        setIsLoading,
        query,
        setQuery,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
