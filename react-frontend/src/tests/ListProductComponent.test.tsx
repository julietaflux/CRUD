import React from "react";
import { render, screen } from "@testing-library/react";
import ListProductComponent from "../components/ListProductComponent";

describe("List Product Component", () => {
  test("Renders the title", () => {
    render(<ListProductComponent />);
    expect(screen.getByText("Products List")).toBeInTheDocument();
  });

  test("Renders the add product button", () => {
    render(<ListProductComponent />);
    expect(screen.getByText("Add Product")).toBeInTheDocument();
  });

  test("Renders the table headers", () => {
    render(<ListProductComponent />);

    const headers = [
      "Id",
      "Name",
      "Brand Id",
      "Brand Name",
      "Cost",
      "Price",
      "Actions",
    ];

    headers.forEach((h) => {
      expect(screen.getByText(h)).toBeInTheDocument();
    });
  });
});
