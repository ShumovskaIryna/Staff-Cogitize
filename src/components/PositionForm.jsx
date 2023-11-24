"use client";
import React from "react";
import { useFormContext } from "../context/FormContext";

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
        <label className="block font-bold mb-2">Название:</label>
        <input
          type="text"
          value={textInput}
          onChange={handleTextChange}
          className="w-full text-black px-3 py-1 bg-dark-grey rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="flex flex-col w-full my-2 mr-2 p-3 bg-dark-grey text-white rounded">
        <p className="font-bold mb-2">Обязаности:</p>
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
        <button
          type="button"
          onClick={handleSave}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Save
        </button>
      </div>
    </form>
  );
};
export default PositionsForm;
