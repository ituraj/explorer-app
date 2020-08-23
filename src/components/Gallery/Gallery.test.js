import React from "react";
import { render, screen } from "@testing-library/react";
import "../../mocks/intersectionObserverMock";

import Gallery from "./Gallery";

const testData = [
  {
    farm: 8,
    has_comment: 0,
    id: "47409584192",
    is_primary: 0,
    isfamily: 0,
    isfriend: 0,
    ispublic: 1,
    owner: "14605001@N08",
    pathalias: "ianbramham",
    secret: "c2283395cd",
    server: "7906",
    tags: "nannerch wales trees snow",
    title: "Trees in the Snow",
  },
  {
    farm: 66,
    has_comment: 0,
    id: "48998950271",
    is_primary: 0,
    isfamily: 0,
    isfriend: 0,
    ispublic: 1,
    owner: "36305833@N00",
    pathalias: "chalkdog",
    secret: "96a419498a",
    server: "65535",
    tags: "gorilla stlouiszoo primate animalportrait",
    title: "",
  },
];

describe("Gallery", () => {
  test("renders gallery with test data", () => {
    render(<Gallery photos={testData} />);
  });
});
