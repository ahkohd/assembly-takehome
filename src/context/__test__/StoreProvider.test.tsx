import { useContext } from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import StoreProvider, { StoreContext } from "../StoreProvider";
import ErrorView from "../../components/ErrorView";

describe("StoreProvider test", () => {
  it("should render Loading..", async () => {
    const Test = () => {
      const { isLoading, setIsLoading } = useContext(StoreContext);

      return (
        <>
          <button type="button" onClick={() => setIsLoading(true)}>
            Click me
          </button>

          {isLoading && <span>Loading...</span>}
        </>
      );
    };

    render(
      <StoreProvider>
        <Test />
      </StoreProvider>
    );

    fireEvent.click(screen.getByText(/Click me/));
    expect(await screen.findByText(/Loading.../)).toBeInTheDocument();
  });

  it("should render error view", async () => {
    const Test = () => {
      const { setIsError, setError } = useContext(StoreContext);

      return (
        <>
          <button
            type="button"
            onClick={() => {
              setIsError(true);
              setError(new Error("A manually trigger error."));
            }}
          >
            Click me
          </button>

          <ErrorView />
        </>
      );
    };

    render(
      <StoreProvider>
        <Test />
      </StoreProvider>
    );

    fireEvent.click(screen.getByText(/Click me/));
    expect(
      await screen.findByText(/A manually trigger error./)
    ).toBeInTheDocument();
  });
});
