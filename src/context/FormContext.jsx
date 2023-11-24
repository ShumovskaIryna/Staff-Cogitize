"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [textInput, setTextInput] = useState("");
  const [checkboxValues, setCheckboxValues] = useState([
    {
      name: "Торговля",
      array: [
        { name: "Продавать продукт", checked: false },
        { name: "Виставлять цени", checked: false },
        { name: "Смотреть аналитику", checked: false },
      ],
    },
    {
      name: "Производство",
      array: [
        { name: "Закупать сирье", checked: false },
        { name: "Назначать рабочих", checked: false },
      ],
    },
    {
      name: "Разборки",
      array: [
        { name: "Дуель", checked: true },
        { name: "Виставлять претензии", checked: true },
      ],
    },
    {
      name: "Управление",
      array: [
        { name: "Назначать должности", checked: true },
        { name: "Вигонять из банди", checked: true },
      ],
    },
  ]);

  const handleTextChange = useCallback((event) => {
    setTextInput(event.target.value);
  }, []);

  const handleCheckboxChange = useCallback((index) => {
    setCheckboxValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = !newValues[index];
      return newValues;
    });
  }, []);

  const handleSave = useCallback(() => {
    console.log("Text Input:", textInput);
    console.log("Checkbox Values:", checkboxValues);
  }, [textInput, checkboxValues]);

  const contextValue = {
    textInput,
    checkboxValues,
    handleTextChange,
    handleCheckboxChange,
    handleSave,
  };

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
