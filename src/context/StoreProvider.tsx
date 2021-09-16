import Result from "@/types/Result";
import React, {
  createContext,
  Dispatch,
  FC,
  useState,
  SetStateAction,
} from "react";

interface StoreContextValue {
  results: Array<Result>;
  setResults: Dispatch<SetStateAction<Array<Result>>>;
  isError: boolean;
  setIsError: Dispatch<SetStateAction<boolean>>;
  error: Error;
  setError: Dispatch<SetStateAction<Error>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const StoreContext = createContext<StoreContextValue>(
  {} as StoreContextValue
);

const StoreProvider: FC = ({ children }) => {
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
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
