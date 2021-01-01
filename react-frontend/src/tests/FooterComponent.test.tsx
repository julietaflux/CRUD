import React from "react";
import { render, screen } from "@testing-library/react";
import FooterComponent from "../components/FooterComponent";

describe("Footer Component", () => {
  test("Renders the text", () => {
    render(<FooterComponent />);
    expect(screen.getByText("Julieta Micaela Juarez 2021")).toBeInTheDocument();
  });
});
