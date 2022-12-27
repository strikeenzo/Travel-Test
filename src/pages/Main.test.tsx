import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Main from "./Main";
import { BrowserRouter as Router } from "react-router-dom";

describe("Main Component", () => {
  beforeEach(() => {
    render(
      <Router>
        <Main />
      </Router>
    );
  });
  it("Render Main component", () => {
    const fromInput = screen.getByPlaceholderText("From");
    expect(fromInput).toBeInTheDocument();
    const toInput = screen.getByPlaceholderText("To");
    expect(toInput).toBeInTheDocument();
    const date = new Date().getDate();
    const dateShow = screen.getByText(date);
    expect(dateShow).toBeInTheDocument();
    const addButton = screen.getAllByText("+Add intermediate city");
    expect(addButton).not.toBeNull();
    const quoteButton = screen.getAllByText("Get a quote");
    expect(quoteButton).not.toBeNull();
  });

  it("Search cities", () => {
    const fromInput = screen.getByPlaceholderText("From");
    fireEvent.change(fromInput, { target: { value: "pari" } });
    expect(screen.getByDisplayValue("pari")).not.toBeNull();
    waitFor(
      () => {
        expect(screen.getAllByText("Paris")).not.toBeNull();
      },
      { timeout: 1000 }
    );
  });

  it("Validation", () => {
    const quoteButton = screen.getByText("Get a quote");
    fireEvent.click(quoteButton);
    expect(
      screen.getByText("Please enter a valid departure city")
    ).not.toBeNull();
    expect(
      screen.getByText("Please enter a valid arrival city")
    ).not.toBeNull();
  });
});
