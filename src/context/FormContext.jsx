"use client";

import React, { createContext, useState } from "react";
import { DEPARTMENTS } from "../constants/constants";

export const FormContext = createContext();

const departments = DEPARTMENTS;

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
  const [roles, setPositions] = useState([]);

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
