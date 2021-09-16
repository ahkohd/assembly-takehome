import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Octosearch h1 header", () => {
  render(<App />);
  const headerElement = screen.getByText(/Octosearch/i);
  expect(headerElement).toBeInTheDocument();
});
