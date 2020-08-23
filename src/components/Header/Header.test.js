import React from "react";
import { render, screen } from "@testing-library/react";
import "../../mocks/intersectionObserverMock";

import Header from "./Header";

describe("Header", () => {
  test("renders search input field", () => {
    render(<Header />);
    expect(screen.getByPlaceholderText(/Search/)).toBeInTheDocument();
  });
});
