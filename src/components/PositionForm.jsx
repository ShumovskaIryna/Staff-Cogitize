"use client";
import { useContext, useState } from "react";
import { FormContext } from "@/context/FormContext";
import "../app/globals.css";

const PositionsForm = () => {
  const formContext = useContext(FormContext);

  const [formData, setFormData] = useState({
    name: "",
    departments: [
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
          { name: "Дуель", checkbox_2_0: true },
          { name: "Виставлять претензии", checkbox_2_1: true },
        ],
      },
      {
        name: "Управление",
        duties: [
          { name: "Назначать должности", checkbox_3_0: true },
          { name: "Вигонять из банди", checkbox_3_1: true },
        ],
      },
    ],
    salary: "$10",
    level: "0 заданий",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    formContext.updatePositionsState(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckBoxChange = (departmentIndex, dutyIndex) => {
    const updatedDepartments = [...formData.departments];

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

    const newFormData = {
      ...formData,
      departments: updatedDepartments,
      salary: `$${trueCount}0`,
      level: `${trueCount} заданий`,
    };

    setFormData(newFormData);
  };
  return (
    <form>
      <div className="flex flex-col w-full my-1 mr-2 p-3 bg-dark-grey text-white rounded">
        <label className="block text-gray-600 mb-2">Название</label>
        <input
          type="text"
          name="name"
          value={formContext.roles.name}
          onChange={handleChange}
          required
          className="w-full text-gray-200 px-3 py-2 bg-dark-grey rounded-md focus:outline-none"
        />
      </div>
      <div className="flex flex-col w-full my-2 mr-2 p-3 bg-dark-grey text-white rounded">
        <label className="block text-gray-600 mb-2">Обязаности</label>
        <div className="grid gap-1 grid-cols-2 grid-rows-2">
          {formData.departments.map((department, index) => (
            <label key={index} className="flex items-center mb-2">
              <div className="flex flex-col text-gray-500">
                {/* department name */}
                {department.name}
                {department?.duties?.map((duty, indexDuty) => (
                  <label key={indexDuty} className="flex items-center mb-2">
                    {/* Duty name & checkbox */}
                    <div className="flex flex-col w-full text-white">
                      {duty.name}
                      <input
                        type="checkbox"
                        className="mr-2"
                        name={`checkbox_${index}_${indexDuty}`}
                        checked={duty[`checkbox_${index}_${indexDuty}`]}
                        onChange={() => handleCheckBoxChange(index, indexDuty)}
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
          onClick={handleSubmit}
          className="button w-full text-white py-2 px-4 rounded-md"
        >
          Сохранить
        </button>
      </div>
    </form>
  );
};
export default PositionsForm;
