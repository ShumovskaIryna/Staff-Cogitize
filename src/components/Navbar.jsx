"use client";
import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [selectedCategory, setSelectedCategory] = useState("Должности");

  return (
    <div className="flex flex-row text-gray-300 justify-around">
      <Link
        href="/hierarchy"
        onClick={() => setSelectedCategory("Иерархия")}
        className={`w-1/4 px-auto justify-center text-center py-2 ${
          selectedCategory === "Иерархия" ? "chosen" : "non-chosen"
        } rounded`}
      >
        Иерархия
      </Link>
      <Link
        href="/"
        onClick={() => setSelectedCategory("Должности")}
        className={`w-1/4 px-auto justify-center text-center py-2 ${
          selectedCategory === "Должности" ? "chosen" : "non-chosen"
        } rounded`}
      >
        Должности
      </Link>
      <Link
        href="/staff-list"
        onClick={() => setSelectedCategory("Список персонала")}
        className={`w-1/4 px-auto justify-center text-center py-2 ${
          selectedCategory === "Список персонала" ? "chosen" : "non-chosen"
        } rounded`}
      >
        Список персонала
      </Link>
      <Link
        href="/equipment-sets"
        onClick={() => setSelectedCategory("Наборы экипировки")}
        className={`w-1/4 px-auto justify-center text-center py-2 ${
          selectedCategory === "Наборы экипировки" ? "chosen" : "non-chosen"
        } rounded`}
      >
        Наборы экипировки
      </Link>
    </div>
  );
};

export default Navbar;
