import React from "react";
import { render } from "@testing-library/react";
import { FormProvider } from "@/context/FormContext";

export const renderWithMockContext = (component) => {
  return render(
    <FormProvider>
      {component}
    </FormProvider>
  );
};
