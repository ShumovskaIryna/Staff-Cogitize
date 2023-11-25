"use client";

import React, { createContext, useState } from "react";

export const FormContext = createContext();

const mockedPositions = [
  { id: 1, name: "Новобранец", salary: "$50", level: "10 заданий" },
  { id: 2, name: "Рядовой", salary: "$80", level: "5 заданий" },
  { id: 3, name: "Сержант", salary: "$100", level: "12 заданий" },
  { id: 4, name: "Рядовой", salary: "$80", level: "20 заданий" },
  { id: 5, name: "Новобранец", salary: "$50", level: "15 заданий" },
  { id: 6, name: "Рядовой", salary: "$80", level: "20 заданий" },
  { id: 7, name: "Новобранец", salary: "$50", level: "15 заданий" },
];

const getFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem("positions");
    return JSON.parse(value) || mockedPositions;
  }
};

const setToLocalStorage = (data) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("positions", JSON.stringify(data));
  }
};

export const FormProvider = ({ children }) => {
  const [roles, setPositions] = useState([
    {
      name: "",
      departments: [
        {
          name: "Торговля",
          duties: [
            { name: "Продавать продукт", checked: false },
            { name: "Виставлять цени", checked: false },
            { name: "Смотреть аналитику", checked: false },
          ],
        },
        {
          name: "Производство",
          duties: [
            { name: "Закупать сирье", checked: false },
            { name: "Назначать рабочих", checked: false },
          ],
        },
        {
          name: "Разборки",
          duties: [
            { name: "Дуель", checked: true },
            { name: "Виставлять претензии", checked: true },
          ],
        },
        {
          name: "Управление",
          duties: [
            { name: "Назначать должности", checked: true },
            { name: "Вигонять из банди", checked: true },
          ],
        },
      ],
    },
  ]);

  const fetchData = async () => {
    // it can be some api call
    setPositions(getFromLocalStorage());
  };

  const updatePositionsState = (data) => {
    const newData = {
      id: Date.now().toString(),
      ...data,
    };

    setPositions([...roles, newData]);
    setToLocalStorage(roles);
  };

  return (
    <FormContext.Provider
      value={{
        fetchData,
        roles,
        setPositions,
        updatePositionsState,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
