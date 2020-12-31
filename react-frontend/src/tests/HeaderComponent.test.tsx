import React from "react";
import { render, screen } from "@testing-library/react";
import HeaderComponent from "../components/HeaderComponent";

describe("Header Component", () => {
  test("Renders the title", () => {
    render(<HeaderComponent />);
    expect(screen.getByText("Product Management App")).toBeInTheDocument();
  });
});
