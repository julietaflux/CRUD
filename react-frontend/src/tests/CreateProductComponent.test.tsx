import React from "react";
import { render, screen } from "@testing-library/react";
import CreateProductComponent from "../components/CreateProductComponent";

describe("Create Product Component", () => {
  test("Renders the title", () => {
    render(<CreateProductComponent />);
    expect(screen.getByText("Add Product")).toBeInTheDocument();
  });

  test("Renders the save product button", () => {
    render(<CreateProductComponent />);
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  test("Renders the cancel product button", () => {
    render(<CreateProductComponent />);
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });
});
