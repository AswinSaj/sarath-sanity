"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between">
      <div>Logo</div>
      <div>Name</div>
      <NavbarButton />
    </nav>
  );
};

export default Navbar;

const NavbarButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X /> : <Menu />}</div>
  );
};
