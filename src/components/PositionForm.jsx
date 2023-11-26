"use client";
import { useContext, useState, useEffect } from "react";
import { FormContext } from "@/context/FormContext";
import { DEPARTMENTS } from "../constants/constants";
import "../app/globals.css";

const PositionsForm = ({ chosenPosition }) => {
  const formContext = useContext(FormContext);

  const [formData, setFormData] = useState({
    name: chosenPosition ? chosenPosition.name : "",
    departments: chosenPosition ? chosenPosition.departments : DEPARTMENTS,
    salary: "$10",
    level: "0 заданий",
  });

  useEffect(() => {
    if (chosenPosition) {
      setFormData({
        ...chosenPosition,
        name: chosenPosition.name,
      });
    }
  }, [chosenPosition]);

  const handleSubmit = (e) => {
    e.preventDefault();
    formContext?.updatePositionsState(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckBoxChange = (departmentIndex, dutyIndex) => {
    const updatedDepartments = JSON.parse(JSON.stringify(formData.departments));
    updatedDepartments[departmentIndex].duties[dutyIndex][
      `checkbox_${departmentIndex}_${dutyIndex}`
    ] =
      !updatedDepartments[departmentIndex].duties[dutyIndex][
        `checkbox_${departmentIndex}_${dutyIndex}`
      ];
    const trueCount = updatedDepartments[departmentIndex].duties.reduce(
      (count, duty) =>
        count +
        (duty[`checkbox_${departmentIndex}_${dutyIndex}`] === true ? 1 : 0),
      0
    );
    updatedDepartments[departmentIndex].count = trueCount;

    setFormData({
      ...formData,
      departments: updatedDepartments,
      salary: `$${trueCount}0`,
      level: `${trueCount} заданий`,
    });
  };
  return (
    <form>
      {chosenPosition.name ? (
        <div className="relative flex flex-col w-full h-8/12 m-1 justify-between">
          <div className="flex flex-col h-11/12 mr-2 p-2 bg-dark-grey text-white rounded">
            <label className="block text-gray-600 mb-2">Название</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full text-larger text-gray-200 px-2 py-1 mb-1 bg-dark-grey rounded-md focus:outline-none"
            />
          </div>
          <div className="flex flex-col h-6/10 my-1 mr-2 p-2 pb-14 mb-3 bg-dark-grey overflow-scroll text-white rounded">
            <label className="block text-gray-600 mb-2">Обязаности</label>
            <div className="grid grid-cols-2 grid-rows-2">
              {formData.departments?.map((department, index) => (
                <div key={index} className="flex flex-col items-start mb-2">
                  {/* Department name */}
                  <span className="text-gray-500 mb-2">{department.name}</span>

                  {/* Duty checkboxes */}
                  <div className="flex flex-col ml-4 text-white">
                    {department?.duties?.map((duty, indexDuty) => (
                      <label key={indexDuty} className="flex items-center mb-1">
                        {/* Duty name & checkbox */}
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="hidden"
                            name={`checkbox_${index}_${indexDuty}`}
                            checked={duty[`checkbox_${index}_${indexDuty}`]}
                            onChange={() =>
                              handleCheckBoxChange(index, indexDuty)
                            }
                          />
                          <div
                            className={`checkbox mr-2 ${
                              duty[`checkbox_${index}_${indexDuty}`]
                                ? "checked"
                                : ""
                            }`}
                          ></div>
                          <span className="text-gray-200">{duty.name}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col h-2/10 my-1 mr-1 p-1 mb-3">
            <button
              type="button"
              onClick={handleSubmit}
              className="button text-white text-larger py-2 ml-1 mr-2 rounded-md"
            >
              Сохранить
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </form>
  );
};
export default PositionsForm;
