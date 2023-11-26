import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PositionsForm from "@/components/PositionForm";
import { FormContext } from "@/context/FormContext";

// Mock the FormContext provider
jest.mock("@/context/FormContext", () => ({
  ...jest.requireActual("@/context/FormContext"),
  FormContext: {
    Consumer: ({ children }) =>
      children({
        roles: [
          {
            id: 1,
            departments: [],
            name: "dummy_name",
            salary: "$50",
            level: "10 заданий",
          },
        ],
        updatePositionsState: jest.fn(),
      }),
  },
}));

test("it renders PositionsForm", () => {
  render(
    <FormContext.Consumer>
      {(contextValue) => (
        <PositionsForm chosenPosition={contextValue.roles[0]} />
      )}
    </FormContext.Consumer>
  );

  const nameLabel = screen.getByText("Название");
  const saveButton = screen.getByText("Сохранить");

  expect(nameLabel).toBeInTheDocument();

  fireEvent.click(saveButton);

});
