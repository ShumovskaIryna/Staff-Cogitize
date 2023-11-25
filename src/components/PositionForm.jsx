"use client";
import React from "react";
import { useFormContext } from "../context/FormContext";
import "../app/globals.css";

const PositionsForm = () => {
  const {
    textInput,
    checkboxValues,
    handleTextChange,
    handleCheckboxChange,
    handleSave,
  } = useFormContext();

  return (
    <form>
      <div className="flex flex-col w-full my-1 mr-2 p-3 bg-dark-grey text-white rounded">
        <label className="block text-gray-600 mb-2">Название</label>
        <input
          type="text"
          value={textInput}
          onChange={handleTextChange}
          className="w-full text-gray-200 px-3 py-2 bg-dark-grey rounded-md focus:outline-none"
        />
      </div>
      <div className="flex flex-col w-full my-2 mr-2 p-3 bg-dark-grey text-white rounded">
        <label className="block text-gray-600 mb-2">Обязаности</label>
        <div className="grid gap-1 grid-cols-2 grid-rows-2">
          {checkboxValues.map((department, index) => (
            <label key={index} className="flex items-center mb-2">
              <div className="flex flex-col text-gray-500">
                {/* department name */}
                {department.name}
                {department?.array?.map((duty, indexar) => (
                  <label key={indexar} className="flex items-center mb-2">
                    {/* Duty name & checkbox */}
                    <div className="flex flex-col w-full text-white">
                      {duty.name}
                      <input
                        type="checkbox"
                        checked={duty.checked}
                        onChange={() => handleCheckboxChange(indexar)}
                        className="mr-2"
                      />
                    </div>
                  </label>
                ))}
              </div>
            </label>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={handleSave}
        className="button w-full text-white py-2 px-4 rounded-md"
      >
        Сохранить
      </button>
    </form>
  );
};
export default PositionsForm;
