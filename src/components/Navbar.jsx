import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex flex-row text-gray-300 justify-around mt-5">
      <Link href="/hierarchy">Иерархия</Link>
      <Link href="/positions">Должности</Link>
      <Link href="/staff-list">Список персонала</Link>
      <Link href="/equipment-sets">Наборы экипировки</Link>
    </div>
  );
};

export default Navbar;
