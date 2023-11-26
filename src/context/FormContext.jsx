"use client";

import React, { createContext, useState } from "react";

export const FormContext = createContext();

const departments = [
  {
    name: "Торговля",
    duties: [
      { name: "Продавать продукт", checkbox_0_0: false },
      { name: "Виставлять цени", checkbox_0_1: false },
      { name: "Смотреть аналитику", checkbox_0_2: false },
    ],
  },
  {
    name: "Производство",
    duties: [
      { name: "Закупать сирье", checkbox_1_0: false },
      { name: "Назначать рабочих", checkbox_1_1: false },
    ],
  },
  {
    name: "Разборки",
    duties: [
      { name: "Дуель", checkbox_2_0: false },
      { name: "Виставлять претензии", checkbox_2_1: false },
    ],
  },
  {
    name: "Управление",
    duties: [
      { name: "Назначать должности", checkbox_3_0: false },
      { name: "Вигонять из банди", checkbox_3_1: false },
    ],
  },
];

const mockedPositions = [
  {
    id: 1,
    departments,
    name: "Новобранец",
    salary: "$50",
    level: "10 заданий",
  },
  { id: 2, departments, name: "Рядовой", salary: "$80", level: "5 заданий" },
  { id: 3, departments, name: "Сержант", salary: "$100", level: "12 заданий" },
  { id: 4, departments, name: "Рядовой", salary: "$80", level: "20 заданий" },
  {
    id: 5,
    departments,
    name: "Новобранец",
    salary: "$50",
    level: "15 заданий",
  },
  { id: 6, departments, name: "Рядовой", salary: "$80", level: "20 заданий" },
  {
    id: 7,
    departments,
    name: "Новобранец",
    salary: "$50",
    level: "15 заданий",
  },
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
    setPositions(getFromLocalStorage());
  };

  const getPositionById = (positionId) => {
    const position = roles.find((pos) => pos.id === positionId);
    return position || {};
  };

  const updatePositionsState = (data) => {
    const filtredPosition = roles.filter((role) => {
      return role.id !== data.id;
    });

    setPositions([...filtredPosition, data]);
    setToLocalStorage([...filtredPosition, data]);
  };

  const createDraftRole = (data) => {
    const newData = {
      ...data,
      id: Date.now().toString(),
    };

    setPositions([...roles, newData]);
    setToLocalStorage([...roles, newData]);
  };

  const deleteRole = (id) => {
    const filtredPosition = roles.filter((role) => {
      return role.id !== id;
    });

    setPositions([...filtredPosition]);
    setToLocalStorage([...filtredPosition]);
  };

  return (
    <FormContext.Provider
      value={{
        fetchData,
        roles,
        setPositions,
        updatePositionsState,
        createDraftRole,
        getPositionById,
        deleteRole,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
