import React from "react";
import { render } from "@testing-library/react";
import "../../mocks/intersectionObserverMock";

import Home from "./Home";

describe("Home", () => {
  test("renders App component", () => {
    render(<Home />);
  });
});
