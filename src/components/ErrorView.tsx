import { useContext } from "react";

import { StoreContext } from "@/context/StoreProvider";

interface ErrorViewProps {
  title?: string;
  description?: string;
  retryFn?(): void;
  retryText?: string;
}

const ErrorView = (props: ErrorViewProps) => {
  const { isError, error: someError } = useContext(StoreContext);

  const reportError = (error: any): string => {
    const errors = error?.response?.data?.errors;

    if (errors) {
      return error.response?.statusText;
    }

    return error?.message;
  };

  const errorReport = reportError(someError);

  return isError ? (
    <div className="flex">
      <div className="flex flex-col items-center justify-center m-auto">
        <h1 className="text-lg text-center font-semibold text-gray-600">
          {props.title}
        </h1>
        <p className="text-center text-gray-600 text-sm">
          {errorReport ?? props.description}
        </p>
        {props.retryFn && (
          <button onClick={props.retryFn} className="w-52 mt-5">
            {props.retryText}
          </button>
        )}
      </div>
    </div>
  ) : null;
};

export default ErrorView;

ErrorView.defaultProps = {
  title: "Oops! Something went wrong 🥲",
  description: "Something went wrong, please try again!",
  retryText: "Try again!",
};
