import React from "react";
import { render, screen } from "@testing-library/react";
import "./mocks/intersectionObserverMock";

import App from "./App";

describe("App", () => {
  test("renders App component", () => {
    render(<App />);
    expect(screen.getByText(/The Explorer/)).toBeInTheDocument();
  });
});
