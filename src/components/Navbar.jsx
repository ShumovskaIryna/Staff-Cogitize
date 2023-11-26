"use client";
import React, { useState } from "react";
import Link from "next/link";
import { TAB_LINKS } from "../constants/constants";

const Navbar = () => {
  const [selectedCategory, setSelectedCategory] = useState("Должности");

  return (
    <div className="flex flex-row text-gray-300 text-larger justify-around">
      <Link
        href="/hierarchy"
        onClick={() => setSelectedCategory(TAB_LINKS.HIERARCHY)}
        className={`w-1/4 px-auto justify-center text-center py-2 ${
          selectedCategory === TAB_LINKS.HIERARCHY ? "chosen" : "non-chosen"
        } rounded`}
      >
        Иерархия
      </Link>
      <Link
        href="/"
        onClick={() => setSelectedCategory(TAB_LINKS.ROLES)}
        className={`w-1/4 px-auto justify-center text-center py-2 ${
          selectedCategory === TAB_LINKS.ROLES ? "chosen" : "non-chosen"
        } rounded`}
      >
        Должности
      </Link>
      <Link
        href="/staff-list"
        onClick={() => setSelectedCategory(TAB_LINKS.STAFF_LIST)}
        className={`w-1/4 px-auto justify-center text-center py-2 ${
          selectedCategory === TAB_LINKS.STAFF_LIST ? "chosen" : "non-chosen"
        } rounded`}
      >
        Список персонала
      </Link>
      <Link
        href="/equipment-sets"
        onClick={() => setSelectedCategory(TAB_LINKS.EQUIPMENT_SET)}
        className={`w-1/4 px-auto justify-center text-center py-2 ${
          selectedCategory === TAB_LINKS.EQUIPMENT_SET ? "chosen" : "non-chosen"
        } rounded`}
      >
        Наборы экипировки
      </Link>
    </div>
  );
};

export default Navbar;
